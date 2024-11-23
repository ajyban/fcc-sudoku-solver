class SudokuSolver {

  validate(puzzleString) {
    return (/^[.0-9]+$/g).test(puzzleString);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let isValid = false;
    const rowStart = row.charCodeAt(0) - ('A').charCodeAt(0);
    const colStart = column - 1;
    const rowString = puzzleString.substring(
      rowStart * 9,
      (rowStart + 1) * 9
    );
    const currentVal = rowString[colStart];
    console.log(currentVal, value)
    if (currentVal === value) {
      isValid = true;
      return isValid;
    }
    isValid = rowString.indexOf(value) === -1;
    console.log(rowString, isValid);
    return isValid;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let isValid = false;
    const rowStart = row.charCodeAt(0) - ('A').charCodeAt(0);
    const colStart = column - 1;
    let colString = '';
    for (let i = colStart; i < 81; i = i + 9) {
      colString += puzzleString[i]
    }
    const currentVal = colString[rowStart];
    console.log(currentVal, value)
    if (currentVal === value) {
      isValid = true;
      return isValid;
    }
    isValid = colString.indexOf(value) === -1;
    console.log(colString, isValid);
    return isValid;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let isValid = false;
    const rowStart = row.charCodeAt(0) - ('A').charCodeAt(0);
    const colStart = column - 1;
    const subCellRowStart = Math.floor(rowStart / 3);
    const subCellColStart = Math.floor(colStart / 3);
    let regionString = '';
    for (let j = 9 * (3 * subCellRowStart); j < (9 * 3 * (subCellRowStart + 1)); j = j + 9) {
      regionString = regionString
        + puzzleString[(subCellColStart * 3) + (j)]
        + puzzleString[(subCellColStart * 3) + ((j)) + 1]
        + puzzleString[(subCellColStart * 3) + ((j)) + 2];
    }
    const currentVal = puzzleString[rowStart * 9 + colStart];
    console.log(currentVal, value)
    if (currentVal === value) {
      isValid = true;
      return isValid;
    }
    isValid = regionString.indexOf(value) === -1;
    console.log(regionString, isValid);
    return isValid;
  }

  solve(puzzleString) {
    const puzzleArr = puzzleString.split('');
    console.log('puzzle solve started')
    for (let i = 0; i < 81; i++) {
      if (puzzleArr[i] === '.') {
        for (let j = 1; j < 10; j++) {
          const row = String.fromCharCode((Math.floor(i / 9) + ('A').charCodeAt(0)));
          const col = i % 9 + 1;
          const currentPuzzleString = puzzleArr.join('');
          const isValidRow = this.checkRowPlacement(currentPuzzleString, row, col, j);
          const isValidCol = this.checkColPlacement(currentPuzzleString, row, col, j);
          const isValidRegion = this.checkRegionPlacement(currentPuzzleString, row, col, j);
          console.log(row, col, j, isValidRow, isValidCol, isValidRegion, 'AA')
          if (isValidRow && isValidCol && isValidRegion) {
            puzzleArr[i] = j;
          }
        }

      }
    }
    const result = puzzleArr.join('');
    console.log(result)
  }
}

module.exports = SudokuSolver;

