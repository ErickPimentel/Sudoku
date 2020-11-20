let cells = [[], [], [], [], [], [], [], [], []];

function setup() {
  createCanvas(450, 450);

  //cria um grid com numeros aleatorios
  grid = new makeSudoku();

  let a = 0;
  let b = 0;

  //instancia uma cell, com cada um dos valores do grid e insere a cell na matriz cells
  for (let i = 0; i < 9; i++) {
    if (i != 0) b += 50;
    a = 0;
    for (let j = 0; j < 9; j++) {
      cells[i][j] = new cell(a, b, i, j, grid[i][j], false);
      a = a + 50;
    }
  }


  let solution = JSON.parse(JSON.stringify(grid));

  new solver(solution);

  console.log(grid);
  console.log(solution);

  /*
  a = 0;
  b = 0;
  for (let i = 0; i < 9; i++) {
    if (i != 0) b += 50;
    a = 0;
    for (let j = 0; j < 9; j++) {
      cells[i][j] = new cell(a, b, i, j, solution[i][j]);
      a = a + 50;
    }
  }
  */

  a = 0;
  b = 0;
  for (let i = 0; i < 9; i++) {
    if (i != 0) b += 50;
    a = 0;
    for (let j = 0; j < 9; j++) {
      console.log(a, b);
      cells[i][j] = new cell(a, b, i, j, solution[i][j], true);
      a = a + 50;
    }
  }


}

function draw() {
  background(51);

  //desenha as listras separam as 9 matrizes
  new createNineBoxes().show();

  //desenha as celulas (que contem os valores aleatorios do grid)
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      cells[i][j].show();
    }
  }

}

function cell(a, b, i, j, num, isSolution) {
  this.a = a;
  this.b = b;
  this.i = i;
  this.j = j;
  this.num = num;
  this.isSolution = isSolution;


  this.show = function () {
    //se for a solucao imprime desta forma

    if (isSolution) {
      noFill();
      stroke(255);
      rect(this.a, this.b, 50, 50);

      fill(100);
      textSize(32);
      text(this.num, a + 17, b + 40);

    }
    //se for a matriz gerada pelo make Sudoku, imprime desta forma
    else {
      noFill();
      stroke(255);
      rect(this.a, this.b, 50, 50);

      fill(255);
      textSize(32);
      text(this.num, a + 17, b + 40);
    }
  }
}

function createNineBoxes() {
  this.show = function () {
    push();
    strokeWeight(6);
    stroke(255);
    line(150, 0, 150, height);
    line(300, 0, 300, height);
    line(0, 150, width, 150);
    line(0, 300, width, 300);
    pop();
  }
}

function makeSudoku() {
  grid = [[], [], [], [], [], [], [], [], []];

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      grid[i][j] = 0;
    }
  }

  let row = 0;
  let col = 0;
  let num = 0;

  for (i = 0; i < 5; i++) {
    row = Math.floor(random(9));
    col = Math.floor(random(9));
    num = Math.floor(random(1, 10));

    while (!checkValid(grid, num, [row, col]) | grid[row][col] != 0) {
      row = Math.floor(random(9));
      col = Math.floor(random(9));
      num = Math.floor(random(1, 10));
    }

    grid[row][col] = num;
  }

  return grid;
}

function solver(matriz) {
  let find = []
  find = findEmpty(matriz);

  console.log(find);
  console.log(find[0]);
  console.log(find[1]);

  if (find === false) {
    console.log("entrou no if");
    return true;
  }
  else {
    console.log("entrou no else");
    var [row, col] = find;
  }

  for (let i = 1; i < 10; i++) {
    if (checkValid(matriz, i, [row, col])) {
      matriz[row][col] = i;

      if (solver(matriz)) return true;

      matriz[row][col] = 0
    }
  }
}

function checkValid(matriz, num, pos) {

  //check row
  for (let i = 0; i < 9; i++) {
    if (matriz[pos[0]][i] == num & pos[1] != i) return false;
  }

  //check column
  for (let i = 0; i < 9; i++) {
    if (matriz[i][pos[1]] == num & pos[0] != i) return false;
  }

  let row = pos[0];
  let col = pos[1];
  //check box
  let box_x = Math.floor(row / 3);
  let box_y = Math.floor(col / 3);

  for (let i = box_x * 3; i < box_x * 3 + 3; i++) {
    for (let j = box_y * 3; j < box_y * 3 + 3; j++) {
      if (matriz[i][j] == num & (i, j) != pos) return false;
    }
  }

  return true;
}

function findEmpty(matriz) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (matriz[i][j] == 0) {
        return [i, j];
      }
    }
  }
  return false;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}