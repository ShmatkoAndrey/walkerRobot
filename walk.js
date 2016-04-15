/*
0 - парковая зона
1 - пешеходная тропинка
2 - дорога
3 - светофор
    +(обязательно) _1 - номер зебры (должен совпадать с номером самого светофора)
    ++(только к одному - возле него будет светофор) _v(h) - вертикально расположить или горизонтално

9 - робот
*/

var default_park =
[
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '0'],
    ['0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '0'],
    ['0',   '1',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '0'],
    ['0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '0',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '1',   '1','3_3_v','3_3',   '1',   '1',   '1',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0',   '2',   '2',   '0',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2','3_1_h','3_1',   '2',   '2',   '2',   '2','3_2_h','3_2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2'],
    ['2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',  '3_1','3_1',   '2',   '2',   '2',   '2', '3_2', '3_2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2'],
    ['2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',  '3_1','3_1',   '2',   '2',   '2',   '2', '3_2', '3_2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '0',   '2',   '2',   '0',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '1','3_4_v','3_4',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '0',   '2',   '2',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0'],
    ['0',   '0',   '1',   '0',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0'],
    ['0',   '0',   '1',   '0',   '0',   '1',   '1',   '0',   '0',   '0',   '1',   '1',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '1',   '0',   '0',   '1',   '1',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '1',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0']
];

var park = jQuery.extend(true, [], default_park);
park[1][4] = '9';

function cell(i) {
    var code = '';
    switch (i.split('_')[0]) {
        case '0':
            code = '<div class = "cell cell_grass"></div>';
            break;
        case '1':
            code = '<div class = "cell cell_footpath"></div>';
            break;
        case '2':
            code = '<div class = "cell cell_road"></div>';
            break;
        case '3':
            code = '<div class = "cell cell_zebra ' + i + ' ">' +
                '<table>' +
                '<tr><td></td></tr>' +
                '<tr><td></td></tr>' +
                '<tr><td></td></tr>' +
                '<tr><td></td></tr>' +
                '</table></div>';
            break;

        case '9':
            var cell_robot = cell(default_park[getRobot().i][getRobot().j]).split('cell_')[1].split('"')[0];
            code = '<div class = "cell cell_'+cell_robot+' cell_robot "></div>';
            break;
        default:
            break;
    }
    return code;
}

function getRobot() {
    var I = 0, J = 0;
    park.forEach(function (e1, i) {
        e1.forEach(function (e2, j) {
            if (e2 == '9') {
                I = i;
                J = j;
            }
        });
    });
    return {i: I, j: J}
}

function park_show() {
    $('#park').html('');
    park.forEach(function (e) {
        var code = '';
        e.forEach(function (i) {
            code += cell(i);
        });
        $('#park').append('<div class = "row">' + code + '</div>');
    })
}

function getZebraStatus(park_char, need_color) {
    var state = park_char.split('_')[0];
    var mod = park_char.split('_')[1];
    var cords = getRobot();

    if (state == '3') return $('#' + need_color + mod + '.on').length > 0 || default_park[cords.i][cords.j] == park_char;
    return false
}

function setRobot(start, end) {
    if (end.i > park.length - 1 || end.i < 0) return false;
    if (park[end.i][end.j] == '1' || park[end.i][end.j] == '0' || getZebraStatus(park[end.i][end.j], 'green') ||
        (default_park[end.i][end.j].split('_')[0] == '3' && default_park[start.i][start.j].split('_')[0] == '3')) {
        park[start.i][start.j] = default_park[start.i][start.j];
        park[end.i][end.j] = '9';
        park_show();
    }
}

window.addEventListener('keydown', handler, false);
function handler(event) {
    var KEY_CODE = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};
    var cords = getRobot();
    switch (event.keyCode) {
        case KEY_CODE.LEFT:
            setRobot(cords, {i: cords.i, j: cords.j - 1});
            break;
        case KEY_CODE.UP:
            setRobot(cords, {i: cords.i - 1, j: cords.j});
            break;
        case KEY_CODE.RIGHT:
            setRobot(cords, {i: cords.i, j: cords.j + 1});
            break;
        case KEY_CODE.DOWN:
            setRobot(cords, {i: cords.i + 1, j: cords.j});
            break;
        default:
            break;
    }
    event.preventDefault();
}

$(document).ready(function() {
    park_show();
    lighterStart($('#my_timer1'), '1', ['red', 'yellow red', 'green'], [8, 2, 10], [{ type: 'green', i: 3, s: 2 }, {type: 'red', i: 2, s: 2}]);
    lighterStart($('#my_timer2'), '2', ['red', 'yellow red', 'green'], [8, 2, 10], [{ type: 'green', i: 3, s: 2 }, {type: 'red', i: 2, s: 2}]);
    lighterStart($('#my_timer3'), '3', ['green', 'red'], [10, 10], [{type: 'green', i: 3, s: 2}]);
    lighterStart($('#my_timer4'), '4', ['green', 'red'], [10, 10], [{type: 'green', i: 3, s: 2}]);

    for (var i = 1; i < 5; i++) {
        var lighter = $('#lighter' + i);
        var el_v = $('.3_' + i + '_v').first();
        if (el_v.length > 0) lighter.offset(
            {
                left: el_v.offset().left,
                top: el_v.offset().top - lighter.height() - 20
            });

        var el_h = $('.3_' + i + '_h').first();
        if (el_h.length > 0) lighter.offset(
            {
                left: el_h.offset().left - 30,
                top: el_h.offset().top
            });
    }
});