$.ajaxPrefilter(function (option) {
    /* 统一为API接口拼接根路径 */
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
    /* 为有权限的请求添加Headers */
    if (option.url.includes('/my/')) {
        option.headers = {
            Authorization: localStorage.token || ' ',
        }
    }
    /* 统一为 */
    option.complete = function (result) {
        if (result.responseJSON.status === 1 && result.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})