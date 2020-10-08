$(function () {
    //点击显示注册div
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击显示登录div
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });
    //从layui中获取form对象
    var form = layui.form;
    //从layui中获取layer对象
    var layer = layui.layer;
    form.verify({
        //自定义pwd校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //检验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })
    //监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录')
                $('#link_login').click();
            }
        })
    })
    //监听登录表单提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('账号或密码错误')
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = 'index.html'
            }
        })
    })
})