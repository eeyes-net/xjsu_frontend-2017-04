$(function () {
    // 导航栏跳转滚动屏幕

    /**
     * 平滑滚动到页面某处
     *
     * @param {number} y
     * @param {number} [time]
     */
    var scrollTo = function (y, time) {
        if (void 0 === time) {
            time = (y > 1500) ? 750 : (y / 2);
        }
        $('body').animate({scrollTop: y}, time);
    };
    $('.nav-link-li a').on('click', function (e) {
        e.preventDefault();
        scrollTo($($(this).attr('href')).offset().top);
        return false;
    });

    // 轮播图切换

    Number.prototype.mod = function (n) {
        return ((this % n) + n) % n;
    };
    /**
     * 跳转到第i张图片
     * @param {number} i 第一个是0，第二个是1
     */
    var setCarousel = function (i) {
        i = parseInt(i).mod($('.carousel-image-li').length);
        $('.carousel-image-ul')
        .attr('data-index', i)
        .animate({marginLeft: (-i * 1366 + 'px')}, 500);
        $('.carousel-ordered-button').removeClass('active');
        $('.carousel-ordered-button[data-index="' + i + '"]').addClass('active');
    };
    $('.carousel-shift-button.pre').on('click', function () {
        setCarousel(($('.carousel-image-ul').attr('data-index') || 0) - 1);
    });
    $('.carousel-shift-button.next').on('click', function () {
        setCarousel(($('.carousel-image-ul').attr('data-index') || 0) + 1);
    });
    $('.carousel-ordered-button').on('click', function () {
        setCarousel($(this).attr('data-index'));
    });
    setInterval(function () {
        $('.carousel-shift-button.next').trigger('click');
    }, 3000);

    // 校园服务切换标签页

    $('.service-tab-title-li').on('click', function () {
        $('.service-tab-title-li').removeClass('active');
        $(this).addClass('active');
        var href = $(this).find('.service-tab-title-text').attr('data-href');
        $('.service-tab').removeClass('active');
        $(href).addClass('active');
    });


    // Pjax翻页
    var pjax = function ($body, url, animate, callback) {
        $.get(url, function (html) {
            animate($body, html, callback);
        });
    };

    $('#push .main-section-shift-button.pre').on('click', function () {
        var a = $('#push .main-section-photo-card-container').html();
        Animate.slideRight($('#push .main-section-body-photo-card'), a);
    });

    $('#push .main-section-shift-button.next').on('click', function () {
        var a = $('#push .main-section-photo-card-container').html();
        Animate.slideLeft($('#push .main-section-body-photo-card'), a);
    });

    $('#news .main-section-shift-button.pre').on('click', function () {
        var a = $('#news .main-section-list:first-child').html();
        Animate.flipUp($('#news .news-section-body'), a);
    });

    $('#news .main-section-shift-button.next').on('click', function () {
        // pjax($('#news .news-section-body'), './', Animate.flipDown);
        var a = $('#news .main-section-list:first-child').html();
        Animate.flipDown($('#news .news-section-body'), a);
    });
});
