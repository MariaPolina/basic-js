const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    result.push(new Array(cols).fill(0));
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j]) {
        if (i > 0) {
          result[i - 1][j]++;
          if (j > 0) result[i - 1][j - 1]++;
          if (j < cols - 1) result[i - 1][j + 1]++;
        }
        if (i < rows - 1) {
          result[i + 1][j]++;
          if (j > 0) result[i + 1][j - 1]++;
          if (j < cols - 1) result[i + 1][j + 1]++;
        }
        if (j > 0) result[i][j - 1]++;
        if (j < cols - 1) result[i][j + 1]++;
      }
    }
  }

  return result;
}

module.exports = {
  minesweeper
};
