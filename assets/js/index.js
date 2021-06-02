$(function () {
    getUserInfo();
    $('#btn-log-out').click(function () {
        layer.confirm('是否退出？', { icon: 3, title: '提示' }, function (index) {
            location.href = '/login.html';
            localStorage.removeItem('token');
            layer.close();
        })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (result) {
            if (result.status !== 0) return layer.msg('获取用户信息失败!');
            renderAvatar(result.data);
        }
    })
}
function renderAvatar(data) {
    var name = data.nickname || data.username;
    $('#welcome').html('欢迎&nbsp;&nbsp' + name);
    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic).show().siblings('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide().siblings('.text-avatar').html(name[0].toUpperCase()).show();
    }
}