$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form;
    var layer = layui.layer;
    //自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.reg-box [name="password"]').val();
            if (pwd !== value) return '两次密码不一致！';
        }
    })

    //发起注册用户的Ajax请求
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (result) {
                if (result.status !== 0) return layer.msg(result.message);
                layer.msg('注册成功，请登录！');
                $('#link_login').click();
            }
        })
    })

    //发起登录的Ajax请求
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (result) {
                if (result.status !== 0) return layer.msg('登录失败!');
                localStorage.setItem('token', result.token);
                location.href = '/index.html';
            }
        })
    })
})