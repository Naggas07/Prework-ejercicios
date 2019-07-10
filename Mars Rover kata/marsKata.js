// Rover Object Goes Here
// ======================
const rover1 = {
    direction: "N",
    x: 0,
    y: 0,
    movements: [[0, 0]],
    mark: '*'
}

let rover2 = {
    direction: "N",
    x: parseInt(genera()),
    y: parseInt(genera()),
    movements: [],
    mark: '#'
}

// guardamos la posicion inicial aleatoria del nuevo robot

rover2.movements.push([rover2.x, rover2.y]);

// creamos numero aleatorios

function genera() {
    let numero = Math.random() * 10;
    numero = parseInt(numero.toFixed(0));
    if (numero === 10) {
        numero = 9;
    }
    return numero;
}

// grid
let grid = [
    [genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera()],
    [genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera()],
    [genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera()],
    [genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera()],
    [genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera()],
    [genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera()],
    [genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera()],
    [genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera()],
    [genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera()],
    [genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera(), genera()]
];

for (i = 0; i < 10; i++) {
    for (j = 0; j < 10; j++) {
        if (grid[i][j] >= 9) {
            grid[i][j] = 'O';
        } else {
            grid[i][j] = ' ';
        }
    }
}

//inicio de los robots
grid[rover1.x][rover1.y] = '*';
grid[rover2.x][rover2.y] = '#';

function impresion(grid, paso) {
    console.log(`Tablero posicion ${paso}`);
    console.log(grid.join('\n') + ('\n\n'))
    /*for (i=0;i<grid.length;i++){
      console.log(grid[i])
    }*/
}

// pintamos el tablero en inicio
impresion(grid, 'inicio');
// ======================
function turnLeft(rover) {
    //console.log("turnLeft was called!");
    switch (rover.direction) {
        case "N":
            rover.direction = "W";
            break;
        case "W":
            rover.direction = "S";
            break;
        case "S":
            rover.direction = "E";
            break;
        case "E":
            rover.direction = "N";
            break;
        default:
            break;
    }

}

function turnRight(rover) {
    //console.log("turnRight was called!");
    switch (rover.direction) {
        case "N":
            rover.direction = "E";
            break;
        case "E":
            rover.direction = "S";
            break;
        case "S":
            rover.direction = "W";
            break;
        case "W":
            rover.direction = "N";
            break;
        default:
            break;
    }
}

function moveForward(rover, paso) {
    //console.log("moveForward was called");
    let xStart = rover.x;
    let yStart = rover.y;
    switch (rover.direction) {
        case "N":
            if (rover.x > 0) {
                rover.x -= 1;
            } else {
                console.log(`El robot ${rover.mark} no puede avanzar más hacia el Norte en el paso: ${paso}`)
            }
            break;
        case "E":
            if (rover.y < 9) {
                rover.y += 1;
            } else {
                console.log(`El robot ${rover.mark} no puede avanzar más hacia el Este en el paso: ${paso}`)
            }
            break;
        case "S":
            if (rover.x < 9) {
                rover.x += 1;
            } else {
                console.log(`El robot ${rover.mark} no puede avanzar más hacia el Sur en el paso: ${paso}`)
            }
            break;
        case "W":
            if (rover.y > 0) {
                rover.y -= 1;
            } else {
                console.log(`El robot ${rover.mark} no puede avanzar más hacia el Oeste en el paso: ${paso}`)
            }
            break;
        default:
            break;
    }
    let actualPosition = [rover.x, rover.y];
    if (grid[rover.x][rover.y] === 'O') {
        console.log(`Hay un obstaculo, el robot ${rover.mark} no puede mover en el movimiento actual en el paso: ${paso}`);
        rover.x = xStart;
        rover.y = yStart;
    } else {
        rover.movements.push(actualPosition);
        grid[rover.x][rover.y] = rover.mark;
    }

}

function moveBackward(rover, paso) {
    //console.log("moveBackward was called");
    let xStart = rover.x;
    let yStart = rover.y;
    switch (rover.direction) {
        case "N":
            if (rover.x < 9) {
                rover.x += 1;
            } else {
                console.log(`El robot ${rover.mark} no puede avanzar más hacia el Sur en el paso: ${paso}`)
            }
            break;
        case "E":
            if (rover.y > 0) {
                rover.y -= 1;
            } else {
                console.log(`El robot ${rover.mark} no puede avanzar más hacia el Oeste en el paso: ${paso}`)
            }
            break;
        case "S":
            if (rover.x > 0) {
                rover.x -= 1;
            } else {
                console.log(`El robot ${rover.mark} no puede avanzar más hacia el Norte en el paso: ${paso}`)
            }
            break;
        case "W":
            if (rover.y < 9) {
                rover.y += 1;
            } else {
                console.log(`El robot ${rover.mark} no puede avanzar más hacia el Este en el paso: ${paso}`)
            }
            break;
        default:
            break;
    }
    let actualPosition = [rover.x, rover.y];
    if (grid[rover.x][rover.y] === 'O') {
        console.log(`Hay un obstaculo, el robot ${rover.mark} no puede mover en el movimiento actual en el paso: ${paso}`);
        rover.x = xStart;
        rover.y = yStart;
    } else if (rover.mark === '*') {
        if (actualPosition === [rover2.x, rover2.y]) {
            console.log(`El robot ${rover.mark} no puede avanzar dado que se chocaria con el otro robot`);
            rover.x = xStart;
            rover.y = yStart;
        }
    } else if (rover.mark === '#') {
        if (actualPosition === [rover1.x, rover1.y]) {
            console.log(`El robot ${rover.mark} no puede avanzar dado que se chocaria con el otro robot`);
            rover.x = xStart;
            rover.y = yStart;
        }
    } else {
        rover.movements.push(actualPosition);
        grid[rover.x][rover.y] = rover.mark;
    }
}

function directions(guide1, guide2) {
    let moves1 = guide1.length;
    let moves2 = guide2.length;

    let maximo = Math.max(moves1, moves2);

    for (i = 0; i < maximo; i++) {
        if (guide1[i] != undefined) {
            switch (guide1[i]) {
                case "f":
                    moveForward(rover1, i + 1);
                    break;
                case "r":
                    turnRight(rover1);
                    break;
                case "l":
                    turnLeft(rover1);
                    break;
                case "b":
                    moveBackward(rover1, i + 1);
                    break;
                default:
                    moveForward(rover1, i + 1);
                    moveForward(rover1, i + 1);
                    break;
            }
        }
        if (guide2[i] != undefined) {
            switch (guide2[i]) {
                case "f":
                    moveForward(rover2, i + 1);
                    break;
                case "r":
                    turnRight(rover2);
                    break;
                case "l":
                    turnLeft(rover2);
                    break;
                case "b":
                    moveBackward(rover2, i + 1);
                    break;
                default:
                    moveForward(rover2, i + 1);
                    moveForward(rover2, i + 1);
                    break;
            }
        }
    }
}


directions('rffrfflfrff', 'fffrrbbllfff');

impresion(grid, 'fin');

console.log('Robot 1');
console.log(rover1);

console.log('Robot 2');
console.log(rover2);