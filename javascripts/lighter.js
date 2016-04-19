function Lighter(timer_show, mod, colors, times, blinks) {

    var iNext = 0;

    function getNext() {
        iNext += 1;
        if (iNext > colors.length - 1) iNext = 0;
        return colors[iNext];
    }

    function getTime() {
        return times[iNext];
    }

    function whatHappening(type) {
        $('#lighter' + mod + ' div').removeClass(colors.join(' ') + ' on').addClass('grey');
        type.split(' ').forEach(function (e) {
            $('#' + e + mod).removeClass('grey').addClass(e).addClass('on');
        });
    }

    function blink_me(type) {
        var blink = true;
        var dont_blink = setInterval(function () {
            $('#' + type + mod).removeClass(type).addClass('grey');
            blink = !blink;
            clearInterval(dont_blink);
        }, 500)
    }

    function setTimer(type, s) {
        var timer = setInterval(function () {
            blinks.forEach(function (e) {
                if ((e.i - 1) == iNext && s <= e.s) {
                    blink_me(e.type);
                }
            });
            if (s <= 1) {
                clearInterval(timer);
                var next = getNext();
                setTimer(next, getTime(iNext));
            }
            if (s >= 1) {
                whatHappening(type);
                timer_show.html(s);
                s--;
            }
        }, 1000);
    }

    this.initLighter = function() {
        var lighter = $('#lighter' + mod);

        var el_r = $('.3' + mod + 'r').first();
        if (el_r.length > 0) lighter.offset({
            left: el_r.offset().left + 60,
            top: el_r.offset().top - lighter.height() - 20
        });

        var el_l = $('.3' + mod + 'l').first();
        if (el_l.length > 0) lighter.offset({
            left: el_l.offset().left - 20,
            top: el_l.offset().top - lighter.height() - 20
        });

        var el_u = $('.3' + mod + 'u').first();
        if (el_u.length > 0) lighter.offset({
            left: el_u.offset().left - 30,
            top: el_u.offset().top - lighter.height() - 20
        });

        var el_d = $('.3' + mod + 'd').first();
        if (el_d.length > 0) lighter.offset({
            left: el_d.offset().left - 30,
            top: el_d.offset().top + lighter.height() - 20
        });
    };

    timer_show.html(times[0]);
    whatHappening(colors[0]);
    setTimer(colors[0], times[0]);
}