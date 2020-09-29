$(function () {
    getUserInfo();
    var layer = layui.layer;
    //点击退出
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 1.清空本地存储中的token
            localStorage.removeItem('token')
            //2.重新跳转到登录页面
            location.href = 'login.html'
            // 关闭询问框
            layer.close(index);
        });
    })
})
//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用renderAvatar 渲染用户头像
            renderAvatar(res.data);
        },
        //在complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // console.log(res);
        //         // 1.强制清空token
        //         localStorage.removeItem('token')
        //         // 2.强制跳转到登录界面
        //         location.href = 'login.html'
        //     }
        // }

    })
}

function renderAvatar(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username;
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.按需渲染用户头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        //3.2渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}