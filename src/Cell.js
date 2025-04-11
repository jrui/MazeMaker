
class Cell {
    constructor (i, j, size, rows, cols) {
        this.i = i;
        this.j = j;
        this.cellSize = size;
        this.walls = [true, true, true, true];
        this.visited = false;

        this.rows = rows;
        this.cols = cols;
    }

    
    checkNeighbors() {
        let neighbors = [];
        let top = grid[this._index(this.i, this.j-1)];
        let right = grid[this._index(this.i+1, this.j)];
        let bottom = grid[this._index(this.i, this.j+1)];
        let left = grid[this._index(this.i-1, this.j)];

        if(top && !top.visited) neighbors.push(top);
        if(right && !right.visited) neighbors.push(right);
        if(bottom && !bottom.visited) neighbors.push(bottom);
        if(left && !left.visited) neighbors.push(left);

        if(neighbors.length > 0) {
            let r = floor(random(0, neighbors.length));
            return neighbors[r];
        }
        
        return undefined;
    }

  
    highlight() {
        let x = this.i * this.cellSize;
        let y = this.j * this.cellSize;
        noStroke();
        fill(0, 200, 255, 100);
        rect(x, y, this.cellSize, this.cellSize);
    }
  

    show() {
        let x = this.i * this.cellSize;
        let y = this.j * this.cellSize;
        stroke(255);
        
        if (this.walls[0]) line(x                , y                , x + this.cellSize, y                );
        if (this.walls[1]) line(x + this.cellSize, y                , x + this.cellSize, y + this.cellSize);
        if (this.walls[2]) line(x + this.cellSize, y + this.cellSize, x                , y + this.cellSize);
        if (this.walls[3]) line(x                , y + this.cellSize, x                , y                );

        if (this.visited) {
            noStroke();
            fill(0, 255, 255, 100);
            rect(x, y, this.cellSize, this.cellSize);
        }
    }


    _index(i, j) {
        if (i < 0 || j < 0 || i > this.cols - 1 || j > this.rows - 1) {
            return -1
        }

        return i + j * this.cols;
    }
}