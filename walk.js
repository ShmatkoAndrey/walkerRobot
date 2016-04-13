var default_park =
[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0],
    [2,2,2,3,3,2,2,2,2,2,2,2,3,3,2,2,2,2,2],
    [2,2,2,3,3,2,2,2,2,2,2,2,3,3,2,2,2,2,2],
    [0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,2,0,0,0],
    [0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,2,0,0,0],
    [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,2,0,0,0],
    [0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,2,0,0,0],
    [0,1,1,1,1,1,1,1,0,0,1,1,1,0,0,2,0,1,0],
    [0,1,0,0,0,1,0,0,0,0,0,0,1,0,0,2,0,1,0],
    [0,1,0,0,0,1,0,0,0,0,0,0,1,1,1,3,1,1,0],
    [0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,3,1,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0]
];

var park = jQuery.extend(true, [], default_park);
park[1][4] = 9;

function cell(i) {
    var code = '';
    switch (i) {
        case 0:
            code = '<div class = "cell">' + i + '</div>';
            break;
        case 1:
            code = '<div class = "cell cell_footpath">' + i + '</div>';
            break;
        case 2:
            code = '<div class = "cell cell_road">' + i + '</div>';
            break;
        case 3:
            code = '<div class = "cell cell_zebra">' + i + '</div>';
            break;

        case 9:
            code = '<div class = "cell cell_robot">' + i + '</div>';
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
            if (e2 == 9) {
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

function setRobot(start, end) {
    if (end.i > park.length - 1 || end.i < 0) return false;
    if(park[end.i][end.j] == 1 || park[end.i][end.j] == 0 || (park[end.i][end.j] == 3 && $('.green').length > 0)) {
        park[start.i][start.j] = default_park[start.i][start.j];
        park[end.i][end.j] = 9;
        park_show();
    }
}

function walk(direction) {
    var cords = getRobot();
    switch (direction) {
        case 'left':
            setRobot(cords, {i: cords.i, j: cords.j - 1});
            break;
        case 'up':
            setRobot(cords, {i: cords.i - 1, j: cords.j});
            break;
        case 'right':
            setRobot(cords, {i: cords.i, j: cords.j + 1});
            break;
        case 'down':
            setRobot(cords, {i: cords.i + 1, j: cords.j});
            break;
    }
}

window.addEventListener('keypress', handler, false);
function handler(event) {
    var KEY_CODE = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };
    switch (event.keyCode) {
        case KEY_CODE.LEFT:
            walk('left');
            break;
        case KEY_CODE.UP:
            walk('up');
            break;
        case KEY_CODE.RIGHT:
            walk('right');
            break;
        case KEY_CODE.DOWN:
            walk('down');
            break;
        default:
            break;
    }
}

$(document).ready(function(){
    park_show();
    lighterStart($('#my_timer'), '', ['red', 'yellow red', 'green'], [5, 2, 10], [{type: 'green', i: 3, s: 2}, {type: 'red', i: 2, s: 2}]);
});