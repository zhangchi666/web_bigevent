$(function () {
    var form = layui.form;
    var layer = layui.layer;
    //表单验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
    initUserInfo();

    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化用户信息失败')
                }
                form.val('inituserinfo', res.data)
            }
        })
    }

    //重置按钮点击事件
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改用户信息失败')
                }

                //调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })


    })







})