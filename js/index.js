(function () {
    // 实现rem适配
    var setFont = function () {
        var html = document.documentElement;
        var width = html.clientWidth;
        if (width < 1024) {
            width = 1024;
        }
        if (width > 1920) {
            width = 1920;
        }
        var fontSize = width / 80 + 'px';
        html.style.fontSize = fontSize;
    }
    setFont();
    window.onresize = function () {
        setFont();
    }
})();

// 监控区域-效果
(function () {
    $('.monitor').on('click', '.tabs a', function () {
        $(this).addClass('active').siblings().removeClass('active')
        $('.monitor .content').eq(this.dataset.index).show().siblings('.content').hide()
    })
    // 动画
    $('.marquee').each(function () {
        var $cloneList = $(this).children().clone();
        $(this).append($cloneList)
    })
})();