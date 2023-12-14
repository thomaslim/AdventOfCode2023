const fs = require("fs");

const puzzleInput = fs.readFileSync("11/input.txt").toString("utf-8").trim();

function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function expandTheUniverse(oldUniverseMatrix, factor = 2) {
  const expandedVertically = [];

  oldUniverseMatrix.forEach((line) => {
    if (!line.filter((item) => item === "#").length) {
      for (let i = 1; i < factor; i += 1) {
        expandedVertically.push(line);
      }
    }
    expandedVertically.push(line);
  });

  const expandedHorizontally = transpose(expandedVertically);
  const tempMatrix = [];
  expandedHorizontally.forEach((line) => {
    if (!line.filter((item) => item === "#").length) {
      for (let i = 1; i < factor; i += 1) {
        tempMatrix.push(line);
      }
    }
    tempMatrix.push(line);
  });
  const newUniverse = transpose(tempMatrix);

  return newUniverse;
}

function expandTheUniverseV2(oldUniverseMatrix) {
  const expandedVertically = [];

  oldUniverseMatrix.forEach((line) => {
    if (!line.filter((item) => item === "#").length) {
      return expandedVertically.push(line.map(() => "X"));
    }
    return expandedVertically.push(line);
  });

  const expandedHorizontally = transpose(expandedVertically);
  const tempMatrix = [];
  expandedHorizontally.forEach((line) => {
    if (!line.filter((item) => item === "#").length) {
      return tempMatrix.push(line.map(() => "X"));
    }
    return tempMatrix.push(line);
  });
  const newUniverse = transpose(tempMatrix);

  return newUniverse;
}

function convertInputToMatrix(input) {
  return input.split("\n").map((line) => line.split(""));
}

function shortestPath(a, b, universeMatrix, factor = 2) {
  let distX = 0;
  for (
    let i = a.x <= b.x ? a.x + 1 : b.x + 1;
    i <= Math.max(b.x, a.x);
    i += 1
  ) {
    distX += universeMatrix[0][i] === "X" ? factor : 1;
  }

  let distY = 0;
  for (
    let i = a.y <= b.y ? a.y + 1 : b.y + 1;
    i <= Math.max(b.y, a.y);
    i += 1
  ) {
    distY += universeMatrix[i][0] === "X" ? factor : 1;
  }

  return distY + distX;
}

function getGalaxies(universeMatrix) {
  const galaxies = [];
  universeMatrix.forEach((line, index) => {
    for (let i = 0; i < line.length; i += 1) {
      if (line[i] === "#") galaxies.push({ y: index, x: i });
    }
  });
  return galaxies;
}

function getPairs(universeMatrix, factor = 2) {
  const galaxies = getGalaxies(universeMatrix);
  const pairs = [];
  for (let j = 0; j < galaxies.length; j += 1) {
    for (let k = 0; k < galaxies.length; k += 1) {
      if (j !== k && pairs.indexOf({ a: galaxies[k], b: galaxies[j] }) === -1) {
        pairs.push({
          a: galaxies[j],
          b: galaxies[k],
          dist: shortestPath(galaxies[j], galaxies[k], universeMatrix, factor),
        });
      }
    }
  }

  return pairs;
}

function getSumDistances(universeMatrix, factor = 2) {
  const pairs = getPairs(universeMatrix, factor);
  return pairs.reduce((acc, item) => acc + item.dist, 0) / 2;
}

const demoSet1 = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const demoExpanded1 = `....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`;

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

test("ConvertInput", () => {
  expect(convertInputToMatrix(demoSet1).length).toEqual(10);
  expect(convertInputToMatrix(demoSet1)[0].length).toEqual(10);
});

test("Expand universe ", () => {
  expect(expandTheUniverse(convertInputToMatrix(demoSet1)).length).toEqual(12);
  expect(expandTheUniverse(convertInputToMatrix(demoSet1))[0].length).toEqual(
    13,
  );
  expect(expandTheUniverse(convertInputToMatrix(demoSet1))).toEqual(
    convertInputToMatrix(demoExpanded1),
  );
  expect(expandTheUniverse(convertInputToMatrix(puzzleInput)).length).toEqual(
    148,
  );
  expect(
    expandTheUniverse(convertInputToMatrix(puzzleInput))[0].length,
  ).toEqual(147);

  expect(expandTheUniverse(convertInputToMatrix(demoSet1), 10).length).toEqual(
    28,
  );
  expect(
    expandTheUniverse(convertInputToMatrix(demoSet1), 10)[0].length,
  ).toEqual(37);
});

test("shortest path", () => {
  expect(
    shortestPath(
      { x: 6, y: 1 },
      { x: 11, y: 5 },
      expandTheUniverse(convertInputToMatrix(demoSet1)),
    ),
  ).toBe(9);
  expect(
    shortestPath(
      { x: 4, y: 0 },
      { x: 9, y: 10 },
      expandTheUniverse(convertInputToMatrix(demoSet1)),
    ),
  ).toBe(15);
  expect(
    shortestPath(
      { x: 0, y: 2 },
      { x: 12, y: 7 },
      expandTheUniverse(convertInputToMatrix(demoSet1)),
    ),
  ).toBe(17);
  expect(
    shortestPath(
      { x: 0, y: 11 },
      { x: 5, y: 11 },
      expandTheUniverse(convertInputToMatrix(demoSet1)),
    ),
  ).toBe(5);
});

test("getGalaxies", () => {
  expect(
    getGalaxies(expandTheUniverse(convertInputToMatrix(demoSet1))).length,
  ).toEqual(9);
  expect(
    getGalaxies(expandTheUniverse(convertInputToMatrix(demoSet1))),
  ).toEqual([
    { x: 4, y: 0 },
    { x: 9, y: 1 },
    { x: 0, y: 2 },
    { x: 8, y: 5 },
    { x: 1, y: 6 },
    { x: 12, y: 7 },
    { x: 9, y: 10 },
    { x: 0, y: 11 },
    { x: 5, y: 11 },
  ]);
  expect(
    getGalaxies(expandTheUniverse(convertInputToMatrix(puzzleInput))).length,
  ).toEqual(439);
});

test("getPairs", () => {
  expect(
    getPairs(expandTheUniverse(convertInputToMatrix(demoSet1))).length,
  ).toEqual(36 * 2);
});

test("getSumOfLengths part 1", () => {
  expect(
    getSumDistances(expandTheUniverse(convertInputToMatrix(demoSet1))),
  ).toEqual(374);
  // expect(getSumDistances(expandTheUniverse(convertInputToMatrix(puzzleInput)))).toEqual(9686930)
});

test("Expand universe v2", () => {
  expect(expandTheUniverseV2(convertInputToMatrix(demoSet1))).toEqual([
    [".", ".", "X", "#", ".", "X", ".", ".", "X", "."],
    [".", ".", "X", ".", ".", "X", ".", "#", "X", "."],
    ["#", ".", "X", ".", ".", "X", ".", ".", "X", "."],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    [".", ".", "X", ".", ".", "X", "#", ".", "X", "."],
    [".", "#", "X", ".", ".", "X", ".", ".", "X", "."],
    [".", ".", "X", ".", ".", "X", ".", ".", "X", "#"],
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    [".", ".", "X", ".", ".", "X", ".", "#", "X", "."],
    ["#", ".", "X", ".", "#", "X", ".", ".", "X", "."],
  ]);

  expect(
    getGalaxies(expandTheUniverseV2(convertInputToMatrix(demoSet1))),
  ).toEqual([
    { x: 3, y: 0 },
    { x: 7, y: 1 },
    { x: 0, y: 2 },
    { x: 6, y: 4 },
    { x: 1, y: 5 },
    { x: 9, y: 6 },
    { x: 7, y: 8 },
    { x: 0, y: 9 },
    { x: 4, y: 9 },
  ]);
});

test("getSumOfLengths part 2", () => {
  expect(
    getSumDistances(expandTheUniverseV2(convertInputToMatrix(demoSet1))),
  ).toEqual(374);
  expect(
    getSumDistances(expandTheUniverseV2(convertInputToMatrix(demoSet1)), 10),
  ).toEqual(1030);
  expect(
    getSumDistances(expandTheUniverseV2(convertInputToMatrix(demoSet1)), 100),
  ).toEqual(8410);
  expect(
    getSumDistances(expandTheUniverseV2(convertInputToMatrix(puzzleInput))),
  ).toEqual(9686930);
  expect(
    getSumDistances(
      expandTheUniverseV2(convertInputToMatrix(puzzleInput)),
      1000000,
    ),
  ).toEqual(630728425490);
});
