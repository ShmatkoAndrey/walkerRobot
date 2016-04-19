function Park(default_park) {
    var park_array = jQuery.extend(true, [], default_park);
    park_array[1][4] = '9';
    var this_ = this;

    this.getPark = function() {
        return park_array;
    };

    this.getParkObject = function(i, j) {
        return park_array[i][j];
    };

    this.setParkObject = function(i, j, value) {
        park_array[i][j] = value;
    };

    this.getDefaultParkObject = function(i, j) {
        return default_park[i][j];
    };

    this.findParkObject = function(ch) {
        var I = 0, J = 0;
        park_array.forEach(function (e1, i) {
            e1.forEach(function (e2, j) {
                if (e2 == ch) {
                    I = i;
                    J = j;
                }
            });
        });
        return {i: I, j: J}
    };

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
                code = '<div class = "cell cell_road car_generator type_' + type + '" data-points = "' + type + ';' + p.i + ';' + p.j + '" ></div>';
                break;
            case '3':
                code = '<div class = "cell cell_zebra ' + e + ' "></div>';
                break;
            case '5':
                var cell_car = cell(this_.getDefaultParkObject(p.i, p.j), {i: p.i, j: p.j}).split('cell_')[1].split('"')[0];
                code = '<div id = car_' + p.idcar + ' class = "cell cell_' + cell_car + ' cell_car car_' + p.d + ' " data-car = "' + p.idcar + ';' + p.d + '" ></div>';
                break;
            case '9':
                var cell_robot = cell(this_.getDefaultParkObject(p.i, p.j), {i: p.i, j: p.j}).split('cell_')[1].split('"')[0];
                code = '<div class = "cell cell_' + cell_robot + ' cell_robot "></div>';
                break;
            default:
                break;
        }
        return code;
    }

    this.park_show = function() {
        $('#park').html('');
        park_array.forEach(function (e, i) {
            var code = '';
            e.forEach(function (q, j) {
                if (q.split('_')[0] == '5') code += cell(q, {i: i, j: j, idcar: q.split('_')[1], d: q.split('_')[2]});
                else code += cell(q, {i: i, j: j});
            });
            $('#park').append('<div class = "row">' + code + '</div>');
        })
    };

    this.getZebraStatus = function(park_char, need_color, cords) {
        var state = park_char.split('')[0];
        var mod = park_char.split('')[1];
        if (state == '3') return $('#' + need_color + mod + '.on').length > 0 || default_park[cords.i][cords.j] == park_char;
        return false
    };
}

function Robot(park) {
    var robo = this;

    this.getRobot = function () {
        return park.findParkObject('9');
    };

    this.setRobot = function (start, end) {
        if (end.i > park.getPark().length - 1 || end.i < 0 || end.j > park.getPark()[0].length - 1|| end.j < 0 ) return false;
        else {
            var park_end_ch = park.getParkObject(end.i, end.j);

            if ((park_end_ch == '1' || park_end_ch == '0' || park.getZebraStatus(park_end_ch, 'green', start) ||
                (park.getDefaultParkObject(end.i, end.j).split('')[0] == '3' && park.getDefaultParkObject(start.i, start.j).split('')[0] == '3')) &&
                park_end_ch.split('')[0] != '5') {

                park.setParkObject(start.i, start.j, park.getDefaultParkObject(start.i, start.j));
                park.setParkObject(end.i, end.j, '9');
                park.park_show();
            }
        }
    };

    this.left = function() {
        var cords = robo.getRobot();
        robo.setRobot(cords, {i: cords.i, j: cords.j - 1});
    };
    this.up = function() {
        var cords = robo.getRobot();
        robo.setRobot(cords, {i: cords.i - 1, j: cords.j});
    };
    this.right = function() {
        var cords = robo.getRobot();
        robo.setRobot(cords, {i: cords.i, j: cords.j + 1});
    };
    this.down = function() {
        var cords = robo.getRobot();
        robo.setRobot(cords, {i: cords.i + 1, j: cords.j});
    };

    this.handler = function(event) {
        var KEY_CODE = {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};
        switch (event.keyCode) {
            case KEY_CODE.LEFT:
                robo.left();
                break;
            case KEY_CODE.UP:
                robo.up();
                break;
            case KEY_CODE.RIGHT:
                robo.right();
                break;
            case KEY_CODE.DOWN:
                robo.down();
                break;
            default:
                break;
        }
        event.preventDefault();
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function CarsGenerator(park) {
    var last_сar_id = 0;
    var cg = this;

    this.createCar = function () {
        var generators = $('.car_generator');
        var generator = generators[Math.floor(Math.random() * generators.length)];
        if (generator) {
            generator = $(generator);
            var cords = {
                i: parseInt(generator.data('points').split(';')[1]),
                j: parseInt(generator.data('points').split(';')[2])
            };
            setCar(++last_сar_id, cords, generator.data('points').split(';')[0]);
        }
    };

    function setCar(id, start, direction) {
        var st_c = park.getDefaultParkObject(start.i, start.j).split('');

        if (st_c[0] == '2' && st_c[1] && st_c[1] != 't') {
            var rnd = getRandom(0, 100);
            if (rnd < 30) {
                if (st_c[1] != direction) direction = st_c[1];
                else if (st_c[2] != direction) direction = st_c[2];
            }
        }

        var end;
        switch (direction) {
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

        if (end.i > park.getPark().length - 1 || end.i < 0 || end.j > park.getPark()[0].length - 1 || end.j < 0) {
            park.setParkObject(start.i, start.j, park.getDefaultParkObject(start.i, start.j));
            park.park_show();
            return false;
        }

        var park_end_ch = park.getParkObject(end.i, end.j);
        var park_def_start_ch = park.getDefaultParkObject(start.i, start.j).split('');

        if ((park_end_ch.split('')[0] == '2' || park_def_start_ch[1] == 't' || park.getZebraStatus(park_end_ch, 'red', start) ||
            (park.getDefaultParkObject(end.i, end.j).split('')[0] == '3' && park_def_start_ch[0] == '3')) &&
            park_end_ch != '9' && park_end_ch.split('_')[0] != '5') {

            park.setParkObject(start.i, start.j, park.getDefaultParkObject(start.i, start.j));
            park.setParkObject(end.i, end.j, '5_' + id + '_' + direction)
            park.park_show();
        }
    }

    function getCar(id, direction) {
        return park.findParkObject('5_' + id + '_' + direction);
    }

    this.refreshCars = function() {
        [].forEach.call($('.cell_car'), function (e) {
            var data = $(e).data('car').split(';');
            setCar(data[0], getCar(data[0], data[1]), data[1])
        });
    };

    var refresh_i, car_i;
    this.startGenerate = function(fps, fps_car) {
        refresh_i = setInterval(function() {
            cg.refreshCars();
        }, fps);
        car_i = setInterval(function() {
            cg.createCar();
        }, fps_car);
    };

    this.stopGenerate = function() {
        clearInterval(car_i);
        clearInterval(refresh_i);
    }
}

$(document).ready(function() {
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

    var park = new Park(default_park);
    var robot = new Robot(park);
    var cg = new CarsGenerator(park);

    park.park_show();
    cg.startGenerate(100, 3000);

    new Lighter($('#my_timer1'), '1', ['red', 'green'], [10, 10], [{ type: 'green', i: 3, s: 2 }]).initLighter();
    new Lighter($('#my_timer2'), '2', ['red', 'green'], [10, 10], [{ type: 'green', i: 3, s: 2 }]).initLighter();
    new Lighter($('#my_timer3'), '3', ['green', 'red'], [10, 10], [{type: 'green', i: 3, s: 2}]).initLighter();
    new Lighter($('#my_timer4'), '4', ['green', 'red'], [10, 10], [{type: 'green', i: 3, s: 2}]).initLighter();

    window.addEventListener('keydown', robot.handler, false);
});