let cols, rows;
let grid = [];
let current;
let stack = [];
const cellSize = 30;


function setup() {
  // 11 is for padding on left (2px) and right (2px), 7 aditional pixels for the sidebar (prevents it)
  cols = floor((innerWidth - 11) / cellSize);
  rows = floor((innerHeight - 11) / cellSize);
  
  createCanvas(cellSize * cols + 1, cellSize * rows + 1);

  for(let j = 0; j < rows; j++) {
    for(let i = 0; i < cols; i++) {
      let cell = new Cell(i, j, cellSize, rows, cols);
      grid.push(cell);
    }
  }

  current = grid[0];
}


function draw() {
  background(51);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  current.visited = true;
  current.highlight();
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
  }
  else if(stack.length > 0) current = stack.pop();
}


function removeWalls(a, b) {
  let x = a.i - b.i;
  if(x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if(x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  let y = a.j - b.j;
  if(y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if(y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
