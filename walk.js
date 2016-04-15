/*
0 - парковая зона
1 - пешеходная тропинка
2 - дорога
3 - светофор
    +(обязательно) _1 - номер зебры (должен совпадать с номером самого светофора)
    ++(только к одному - возле него будет светофор) _v(h) - вертикально расположить или горизонтално

9 - робот
*/

var default_park = [
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0', '4_d',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '0'],
    ['0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '0'],
    ['0',   '1',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '0'],
    ['0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '0',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '1',   '1','3_3_v','3_3',   '1',   '1',   '1',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0',   '2',   '2',   '0',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['4_r', '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2','3_1_h','3_1',   '2',   '2',   '2',   '2','3_2_h','3_2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2'],
    ['2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',  '3_1','3_1',   '2',   '2',   '2',   '2', '3_2', '3_2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2'],
    ['2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',  '3_1','3_1',   '2',   '2',   '2',   '2', '3_2', '3_2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2', '4_l'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '0',   '2',   '2',   '0',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '1','3_4_v','3_4',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '0',   '2',   '2',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0'],
    ['0',   '0',   '1',   '0',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0'],
    ['0',   '0',   '1',   '0',   '0',   '1',   '1',   '0',   '0',   '0',   '1',   '1',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '1',   '0',   '0',   '1',   '1',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '1',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '2', '4_u',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0']
];

var park = jQuery.extend(true, [], default_park);
park[1][4] = '9';

function cell(e, p) {
    var code = '';
    switch (e.split('_')[0]) {
        case '0':
            code = '<div class = "cell cell_grass"></div>';
            break;
        case '1':
            code = '<div class = "cell cell_footpath"></div>';
            break;
        case '2':
            code = '<div class = "cell cell_road"></div>';
            break;
        case '4':
            var type = e.split('_')[1];
            code = '<div class = "cell cell_road car_generator type_'+ type +'" data-points = "' + type + ';' + p.i + ';' + p.j + '" ></div>';
            break;
        case '3':
            code = '<div class = "cell cell_zebra ' + e + ' ">' +
                //'<table>' +
                //'<tr><td></td></tr>' +
                //'<tr><td></td></tr>' +
                //'<tr><td></td></tr>' +
                //'<tr><td></td></tr>' +
                //'</table>' +
                '</div>';
            break;
        case '5':
            var cell_car = cell(default_park[getCar(p.idcar).i][getCar(p.idcar).j], {i: 0, j: 0}).split('cell_')[1].split('"')[0];
            code = '<div id = car_' + p.idcar + ' class = "cell cell_'+cell_car + ' cell_car car_'+ p.d +' " data-car = "'+ p.idcar + ';' + p.d +'" ></div>';
            break;
        case '9':
            var cell_robot = cell(default_park[getRobot().i][getRobot().j], {i: 0, j: 0}).split('cell_')[1].split('"')[0];
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
    park.forEach(function (e, i) {
        var code = '';
        e.forEach(function (q, j) {
            if(q.split('_')[0] == '5') code += cell(q, {idcar: q.split('_')[1], d:  q.split('_')[2]});
            else code += cell(q, {i: i, j: j});
        });
        $('#park').append('<div class = "row">' + code + '</div>');
    })
}

function getZebraStatus(park_char, need_color, cords) {
    var state = park_char.split('_')[0];
    var mod = park_char.split('_')[1];

    if (state == '3') return $('#' + need_color + mod + '.on').length > 0 || default_park[cords.i][cords.j] == park_char;
    return false
}

function setRobot(start, end) {
    if (end.i > park.length - 1 || end.i < 0) return false;
    if (park[end.i][end.j] == '1' || park[end.i][end.j] == '0' || getZebraStatus(park[end.i][end.j], 'green', start) ||
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

//-------------------------------------------------------------- Cars

var last_ar_id = 0;
function getCarsgenerators() {
    return $('.car_generator')
}

function createCar() {

    var generators = getCarsgenerators();
    var generator = generators[Math.floor(Math.random()*generators.length)];

    if(generator) {
        generator = $(generator);
        var cords = { i: parseInt(generator.data('points').split(';')[1]), j: parseInt(generator.data('points').split(';')[2]) };
        setCar(++last_ar_id, cords, generator.data('points').split(';')[0]);
    }
}

function setCar(id, start, direction) {
    var end;
    switch(direction){
        case 'l':
            end = {i: start.i, j: start.j - 1};
            break;
        case 'u':
            end = {i: start.i - 1, j: start.j};
            break;
        case 'r':
            end = {i: start.i, j: start.j + 1};
            break;
        case 'd':
            end = {i: start.i + 1, j: start.j};
    }

    if (end.i > park.length - 1 || end.i < 0 || end.j > park[0].length - 1|| end.j < 0 ) {
        park[start.i][start.j] = default_park[start.i][start.j];
        park_show();
        return false;
    }
    if (park[end.i][end.j] == '2' || getZebraStatus(park[end.i][end.j], 'red', start) ||
        (default_park[end.i][end.j].split('_')[0] == '3' && default_park[start.i][start.j].split('_')[0] == '3')) {
        park[start.i][start.j] = default_park[start.i][start.j];
        park[end.i][end.j] = '5_'+id+'_'+direction;
        park_show();
    }
}

function getCar(id) {
    var I = 0, J = 0;
    park.forEach(function (e1, i) {
        e1.forEach(function (e2, j) {
            if (e2.split('_')[0] == '5' && e2.split('_')[1] == id) {
                I = i;
                J = j;
            }
        });
    });
    return {i: I, j: J}
}

function refreshCars() {

    [].forEach.call($('.cell_car'), function(e) {
        var data = $(e).data('car').split(';');
        setCar(data[0], getCar(data[0]), data[1])
    });
}


//--------------------------------------------------------------

function initLighters(cnt) {
    for (var i = 1; i < cnt + 1; i++) {
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
}

$(document).ready(function() {
    park_show();
    lighterStart($('#my_timer1'), '1', ['red', 'yellow red', 'green'], [8, 2, 10], [{ type: 'green', i: 3, s: 2 }, {type: 'red', i: 2, s: 2}]);
    lighterStart($('#my_timer2'), '2', ['red', 'yellow red', 'green'], [8, 2, 10], [{ type: 'green', i: 3, s: 2 }, {type: 'red', i: 2, s: 2}]);
    lighterStart($('#my_timer3'), '3', ['green', 'red'], [10, 10], [{type: 'green', i: 3, s: 2}]);
    lighterStart($('#my_timer4'), '4', ['green', 'red'], [10, 10], [{type: 'green', i: 3, s: 2}]);
    initLighters(4);


    setInterval(function() {
        refreshCars();
    }, 100); //100
    setInterval(function() {
        createCar();
    }, 3000); //100

});