const fs = require("fs");

const puzzleInput = fs.readFileSync("14/input.txt").toString("utf-8").trim();

function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function rotateMatrix(matrix) {
  return matrix[0].map((val, index) =>
    matrix.map((row) => row[row.length - 1 - index]),
  );
}

function convertInputToMatrix(input) {
  return transpose(input.split("\n").map((line) => line.split("")));
}

function tiltLine(line) {
  line.forEach((element, index) => {
    if (index === 0) return;
    if (element !== "O") return;

    if (["O", "#"].includes(line[index - 1])) return;
    let cursor = index;
    while (cursor && !["O", "#"].includes(line[cursor - 1])) {
      // swap lines
      const temp = line[cursor - 1];
      // eslint-disable-next-line no-param-reassign
      line[cursor - 1] = line[cursor];
      // eslint-disable-next-line no-param-reassign
      line[cursor] = temp;
      cursor -= 1;
    }
  });

  return line;
}

function tiltMatrix(matrix) {
  return matrix.map((line) => tiltLine(line));
}

function tiltMatrixXCycle(matrix, nbOfCycle = 1) {
  let tiltedMatrix = matrix;
  for (let i = 0; i < nbOfCycle * 4; i += 1) {
    tiltedMatrix = tiltMatrix(tiltedMatrix);
    tiltedMatrix = rotateMatrix(tiltedMatrix);
  }

  return tiltedMatrix;
}

function calculateLoad(matrix) {
  const matrixSize = matrix.length;
  return matrix.reduce((acc, line) => {
    const lineLoad = line.reduce((acc2, item, index) => {
      let itemLoad = 0;
      if (item === "O") itemLoad = matrixSize - index;
      return acc2 + itemLoad;
    }, 0);

    return acc + lineLoad;
  }, 0);
}

/*------------------------*/

const demoSet = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

const tiltedDemoSet = `OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`;

const cycle1DemoSet = `.....#....
....#...O#
...OO##...
.OO#......
.....OOO#.
.O#...O#.#
....O#....
......OOOO
#...O###..
#..OO#....`;

const cycle2DemoSet = `....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#..OO###..
#.OOO#...O`;

test("Transpose", () => {
  expect(
    transpose([
      [1, 0],
      [1, 2],
    ]),
  ).toEqual([
    [1, 1],
    [0, 2],
  ]);
});

test("rotate", () => {
  expect(
    rotateMatrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]),
  ).toEqual([
    [3, 6, 9],
    [2, 5, 8],
    [1, 4, 7],
  ]);
});

test("tilt line ", () => {
  expect(tiltLine(["O", "O", ".", "O", ".", "O", ".", ".", "#", "#"])).toEqual([
    "O",
    "O",
    "O",
    "O",
    ".",
    ".",
    ".",
    ".",
    "#",
    "#",
  ]);
  expect(tiltLine([".", ".", ".", "O", "O", ".", ".", ".", ".", "O"])).toEqual([
    "O",
    "O",
    "O",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
    ".",
  ]);
  expect(tiltLine(["O", ".", ".", ".", ".", "#", "O", ".", ".", "O"])).toEqual([
    "O",
    ".",
    ".",
    ".",
    ".",
    "#",
    "O",
    "O",
    ".",
    ".",
  ]);
});

test("tiltMatrix ", () => {
  expect(tiltMatrix(convertInputToMatrix(demoSet))).toStrictEqual(
    convertInputToMatrix(tiltedDemoSet),
  );
});

test("calculate Load Part 1", () => {
  expect(calculateLoad(tiltMatrix(convertInputToMatrix(demoSet)))).toEqual(136);
  expect(calculateLoad(tiltMatrix(convertInputToMatrix(puzzleInput)))).toEqual(
    111979,
  );
});

test("tiltMatrix part 2 1 cycle", () => {
  expect(tiltMatrixXCycle(convertInputToMatrix(demoSet), 1)).toStrictEqual(
    convertInputToMatrix(cycle1DemoSet),
  );
});

/* test("tiltMatrix part 2 2 cycles", () => {
 // NOTE: oddly, the transpose fuction returns a matrix missing one line
  expect(tiltMatrixXCycle(convertInputToMatrix(cycle1DemoSet), 1)).toEqual(
    [[".", ".", ".", ".", ".", ".", ".", ".", "#", "#"], [".", ".", ".", ".", ".", "O", ".", ".", ".", "."], [".", ".", ".", "O", ".", "#", ".", ".", ".", "O"], [".", ".", ".", "#", ".", ".", ".", ".", "O", "O"], [".", "#", ".", ".", ".", ".", "O", ".", "O", "O"], ["#", ".", "#", ".", "O", ".", "#", ".", "#", "#"], [".", ".", "#", ".", "O", "O", ".", ".", "#", "."], [".", ".", ".", ".", "O", "#", ".", "O", "#", "."], [".", "O", ".", ".", "#", ".", ".", "O", ".", "."], [".", "#", ".", ".", ".", "#", "O", "O", ".", "O"]]
  );

  expect(convertInputToMatrix(cycle2DemoSet)).toEqual(
    false
  );

  expect(tiltMatrixXCycle(convertInputToMatrix(cycle1DemoSet), 1)).toEqual(
    convertInputToMatrix(cycle2DemoSet),
  );

  expect(tiltMatrixXCycle(convertInputToMatrix(demoSet), 2)).toEqual(
    convertInputToMatrix(cycle2DemoSet),
  );


  expect(tiltMatrixXCycle(convertInputToMatrix(cycle1DemoSet), 1)).toEqual(
    convertInputToMatrix(cycle1DemoSet),
  );



}); */

/* test("tiltMatrix part 2 3 cycles", () => {
  const cycle3DemoSet = `.....#....
  ....#...O#
  .....##...
  ..O#......
  .....OOO#.
  .O#...O#.#
  ....O#...O
  .......OOO
  #...O###.O
  #.OOO#...O`



  expect(tiltMatrixXCycle(convertInputToMatrix(demoSet), 3)).toEqual(
    convertInputToMatrix(cycle3DemoSet),
  );


//   expect(tiltMatrixXCycle(convertInputToMatrix(cycle1DemoSet), 1)).toEqual(
//     convertInputToMatrix(cycle1DemoSet),
//   );

}); */

/* test("calculate Load Part 2", () => {
  expect(calculateLoad (tiltMatrixXCycle(convertInputToMatrix(demoSet), 1000000000))).toEqual(
    136
  );
  expect(calculateLoad (tiltMatrixXCycle(convertInputToMatrix(puzzleInput)))).toEqual(
    111979
  );
}); */
