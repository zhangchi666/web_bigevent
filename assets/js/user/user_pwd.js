$(function () {
    //修改密码验证规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return ('新密码不能是正在使用的密码')
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return ('两次密码输入不一致')
            }
        }
    })

    //监听表单的提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: {
                oldPwd: $('[name=oldPwd]').val(),
                newPwd: $('[name=newPwd]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功')
                //重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})