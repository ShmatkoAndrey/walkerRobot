/*
0 - парковая зона
1 - пешеходная тропинка
2 - дорога
    + t можно ехать на красный(напрмер если между зебрами не успели проехать и что бы не создавать пробку)
    || + r|l|u|d - в какие стороы можно поворачивать
3 - светофор
    +(обязательно) 1 - номер зебры (должен совпадать с номером самого светофора)
    ++(только к одному - возле него будет светофор) l/u/d/r - вертикально расположить или горизонтално + с какой стороны

4 - генератор машин
    + r/u/l/d/ - направление генерации
5 - машина (генерируется)
    5_ + id_ + direction

9 - робот
*/

var default_park = [
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',  '4d',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '0'],
    ['0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '0'],
    ['0',   '1',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '0'],
    ['0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '2',   '2',   '0',   '1',   '0',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '1',   '1',   '1', '33u',  '33',   '1',   '1',   '1',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '1',   '1',   '1',   '1',   '1',   '0',  '2t',  '2t',   '0',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['4r',  '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2', '31l',  '31',  '2t',  '2rd','2ru',  '2t', '32r',  '32',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2'],
    ['2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',  '31',  '31',  '2t',  '2dl','2lu',  '2t',  '32',  '32',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',   '2',  '4l'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '0',  '2t',  '2t',   '0',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '1', '34d',  '34',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '0',   '2',   '2',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0'],
    ['0',   '0',   '1',   '0',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0'],
    ['0',   '0',   '1',   '0',   '0',   '1',   '1',   '0',   '0',   '0',   '1',   '1',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '1',   '0',   '0',   '1',   '1',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '1',   '1',   '0',   '0',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '1',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '2',   '2',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '1',   '0',   '0',   '0',   '0',   '0',   '0'],
    ['0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '2',  '4u',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0',   '0']
];

var park = jQuery.extend(true, [], default_park);
park[1][4] = '9';

function cell(e, p) {
    var code = '';
    switch (e.split('')[0]) {
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
            var type = e.split('')[1];
            code = '<div class = "cell cell_road car_generator type_'+ type +'" data-points = "' + type + ';' + p.i + ';' + p.j + '" ></div>';
            break;
        case '3':
            code = '<div class = "cell cell_zebra ' + e + ' ">' +
                //'<table>' + '<tr><td></td></tr>' + '<tr><td></td></tr>' + '<tr><td></td></tr>' + '<tr><td></td></tr>' + '</table>' +
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
    var state = park_char.split('')[0];
    var mod = park_char.split('')[1];

    if (state == '3') return $('#' + need_color + mod + '.on').length > 0 || default_park[cords.i][cords.j] == park_char;
    return false
}

function setRobot(start, end) {
    if (end.i > park.length - 1 || end.i < 0) return false;
    if ((park[end.i][end.j] == '1' || park[end.i][end.j] == '0' || getZebraStatus(park[end.i][end.j], 'green', start) ||
        (default_park[end.i][end.j].split('')[0] == '3' && default_park[start.i][start.j].split('')[0] == '3')) &&
        park[end.i][end.j].split('')[0] != '5') {

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

var last_сar_id = 0;
function createCar() {
    var generators = $('.car_generator');
    var generator = generators[Math.floor(Math.random()*generators.length)];

    if(generator) {
        generator = $(generator);
        var cords = { i: parseInt(generator.data('points').split(';')[1]), j: parseInt(generator.data('points').split(';')[2]) };
        setCar(++last_сar_id, cords, generator.data('points').split(';')[0]);
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setCar(id, start, direction) {
   var st_c = default_park[start.i][start.j].split('');

    if(st_c[0] == '2' && st_c[1] && st_c[1] != 't' ) {
        var rnd = getRandom(0, 100);
        if(rnd < 30) {
            if (st_c[1] != direction) direction = st_c[1];
            else if (st_c[2] != direction) direction = st_c[2];
        }
    }

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

    if ((park[end.i][end.j].split('')[0] == '2' || default_park[start.i][start.j].split('')[1] == 't'|| getZebraStatus(park[end.i][end.j], 'red', start) ||
        (default_park[end.i][end.j].split('')[0] == '3' && default_park[start.i][start.j].split('')[0] == '3')) &&
        park[end.i][end.j] != '9' && park[end.i][end.j].split('')[0] != '5') {

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

        var el_r = $('.3' + i + 'r').first();
        if (el_r.length > 0) lighter.offset({
            left: el_r.offset().left + 60,
            top: el_r.offset().top - lighter.height() - 20
        });

        var el_l = $('.3' + i + 'l').first();
        if (el_l.length > 0) lighter.offset({
            left: el_l.offset().left - 20,
            top: el_l.offset().top - lighter.height() - 20
        });

        var el_u = $('.3' + i + 'u').first();
        if (el_u.length > 0) lighter.offset({
            left: el_u.offset().left - 30,
            top: el_u.offset().top - lighter.height() - 20
        });

        var el_d = $('.3' + i + 'd').first();
        if (el_d.length > 0) lighter.offset({
            left: el_d.offset().left - 30,
            top: el_d.offset().top + lighter.height() - 20
        });


    }
}

$(document).ready(function() {
    park_show();
    lighterStart($('#my_timer1'), '1', ['red', 'green'], [10, 10], [{ type: 'green', i: 3, s: 2 }]);
    lighterStart($('#my_timer2'), '2', ['red', 'green'], [10, 10], [{ type: 'green', i: 3, s: 2 }]);
    lighterStart($('#my_timer3'), '3', ['green', 'red'], [10, 10], [{type: 'green', i: 3, s: 2}]);
    lighterStart($('#my_timer4'), '4', ['green', 'red'], [10, 10], [{type: 'green', i: 3, s: 2}]);
    initLighters(4);

    setInterval(function() {
        refreshCars();
    }, 100);
    setInterval(function() {
        createCar();
    }, 3000);
});