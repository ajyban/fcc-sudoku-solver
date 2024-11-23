'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if (!req.body.coordinate) {
        return res.json({ "error": "Required field(s) missing" });
      } else {
        if (!(/^[A-Ia-i][1-9]$/).test(req.body.coordinate) || req.body.coordinate.length !== 2) {
          return res.json({ "error": "Invalid coordinate" });
        }
      }
      if (!req.body.value) {
        return res.json({ "error": "Required field(s) missing" });
      } else {
        if (!(/[1-9]{1}/).test(req.body.value) || req.body.value.length !== 1) {
          return res.json({ "error": "Invalid value" });
        }
      }
      if (!req.body.puzzle) {
        return res.json({ "error": "Required field(s) missing" });
      } else {
        if (req.body.puzzle.length !== 81) {
          return res.json({ "error": "Expected puzzle to be 81 characters long" });
        }
        const isValid = solver.validate(req.body.puzzle);
        if (!isValid) {
          return res.json({ error: 'Invalid characters in puzzle' });
        }
      }

      const finalResponse = {
        valid: true,
        conflict: []
      };

      const isValidRow = solver.checkRowPlacement(
        req.body.puzzle,
        req.body.coordinate[0],
        req.body.coordinate[1],
        req.body.value
      );
      const isValidCol = solver.checkColPlacement(
        req.body.puzzle,
        req.body.coordinate[0],
        req.body.coordinate[1],
        req.body.value
      );
      const isValidRegion = solver.checkRegionPlacement(
        req.body.puzzle,
        req.body.coordinate[0],
        req.body.coordinate[1],
        req.body.value
      );
      if (!isValidRow) {
        finalResponse.valid = false;
        finalResponse.conflict.push('row');
      }
      if (!isValidCol) {
        finalResponse.valid = false;
        finalResponse.conflict.push('column');
      }
      if (!isValidRegion) {
        finalResponse.valid = false;
        finalResponse.conflict.push('region');
      }
      if (!finalResponse.valid) {
        return res.json(finalResponse);
      } else {
        return res.json({ valid: true });
      }
    });

  app.route('/api/solve')
    .post((req, res) => {
      if (!req.body.puzzle) {
        return res.json({ "error": "Required field missing" });
      } else {
        if (req.body.puzzle.length !== 81) {
          return res.json({ "error": "Expected puzzle to be 81 characters long" });
        }
        const isValid = solver.validate(req.body.puzzle);
        if (!isValid) {
          return res.json({ error: 'Invalid characters in puzzle' });
        }
        const isSolved = solver.solve(req.body.puzzle);
        if (!isSolved) {
          return res.json({ "error": "Puzzle cannot be solved" });
        } else {
          return res.json({ solution: req.body.puzzle });
        }
      }

    });
};
