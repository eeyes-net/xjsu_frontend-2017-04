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

    var slideAnimate = function ($body, html, direction) {
        $body.css('overflow', 'hidden');
        var $old = $body.children().first();
        var $new = $old.clone();
        $new.html(html);
        $new.css('margin-top', -$old.outerHeight());
        $body.append($new);
        switch (direction) {
            case 'left':
                $old.addClass('slideLeftOutX');
                $new.addClass('slideRightInX');
                break;
            case 'right':
                $old.addClass('slideRightOutX');
                $new.addClass('slideLeftInX');
                break;
        }
        setTimeout(function () {
            $old.remove();
            $new.removeClass('slideRightInX slideLeftInX');
            $new.css('margin-top', '');
        }, 500);
    };
    window.slideAnimate = slideAnimate;

    var flipAnimate = function ($body, html, direction) {
        var $old = $body.children().first();
        var $new = $old.clone();
        $new.html(html);
        $new.css('margin-top', -$old.outerHeight());
        $new.children().css('opacity', '0');
        $body.append($new);
        $old.children().each(function (i) {
            var $this = $(this);
            setTimeout(function () {
                $this.addClass('flipOutX');
                setTimeout(function () {
                    $this.css('opacity', '0');
                    $this.removeClass('flipOutX');
                }, 200);
            }, i * 50);
        });
        $new.children().each(function (i) {
            var $this = $(this);
            setTimeout(function () {
                $this.addClass('flipInX');
                setTimeout(function () {
                    $this.css('opacity', '');
                    $this.removeClass('flipInX');
                }, 200);
            }, 200 + i * 50);
        });
        setTimeout(function () {
            $old.remove();
            $new.css('margin-top', '');
        }, $new.children().length * 50 + 400);
    };
    window.flipAnimate = flipAnimate;

    $('#push .main-section-shift-button.pre').on('click', function () {
        var a = $('#push .main-section-photo-card-container').html();
        slideAnimate($('#push .main-section-body-photo-card'), a, 'right');
    });

    $('#push .main-section-shift-button.next').on('click', function () {
        var a = $('#push .main-section-photo-card-container').html();
        slideAnimate($('#push .main-section-body-photo-card'), a, 'left');
    });

    $('#news .main-section-shift-button.pre').on('click', function () {
        var a = $('#news .news-container main-section-list').html();
        flipAnimate($('#news .news-section-body'), a);
    });

    $('#news .main-section-shift-button.next').on('click', function () {
        var a = $('#news .news-container main-section-list').html();
        flipAnimate($('#news .news-section-body'), a);
    });

    // Pjax翻页
    var pjax = function (div, url, animate, callback) {
        $.get(url, function (html) {
            $(div).html(html);
        });
    }
});
