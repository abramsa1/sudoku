module.exports = function solveSudoku(matrix) {
  const gridLength = 9;

  solve(matrix);
  return matrix;

  function nextCell(grid) {
    for (let x = 0; x < gridLength; x++) {
      for (let y = 0; y < gridLength; y++)
        if (grid[x][y] == 0) return [x, y];
    }
    return [-1, -1];
  }

  function check(grid, i, j, e) {
    let rowOk = true;
    for (let x = 0; x < gridLength; x++) {
      if (e == grid[i][x]) rowOk = false;
    }

    if (rowOk) {
      let columnOk = true;
      for (let x = 0; x < gridLength; x++) {
        if (e == grid[x][j]) columnOk = false;
      }

      if (columnOk) {
        let sectionX = 3 * Math.floor(i / 3);
        let sectionY = 3 * Math.floor(j / 3);

        for (let x = sectionX; x < sectionX + 3; x++) {
          for (let y = sectionY; y < sectionY + 3; y++) {
            if (grid[x][y] == e) return false;
          }
        }
        return true;
      }
    }
    return false
  }

  function solve(grid) {
    let temp = nextCell(grid);
    let i = temp[0]; 
    let j = temp[1];

    if (i == -1) return true;
    for (let e = 1; e <= 9; e++) {
      if (check(grid, i, j, e)) {
        grid[i][j] = e;
        if (solve(grid)) return true;
        grid[i][j] = 0;
      }
    }
    return false;
  }
}