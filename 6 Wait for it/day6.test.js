const functions = require("./day6.js");

const demoSet = [
  {
    time: 7,
    distance: 9,
    winSolutions: 4,
  },
  {
    time: 15,
    distance: 40,
    winSolutions: 8,
  },
  {
    time: 30,
    distance: 200,
    winSolutions: 9,
  },
];

const puzzleSet = [
  {
    time: 59,
    distance: 597,
  },
  {
    time: 79,
    distance: 1234,
  },
  {
    time: 65,
    distance: 1032,
  },
  {
    time: 75,
    distance: 1328,
  },
];

const puzzleSet2 = [{ time: 59796575, distance: 597123410321328 }];

const demoSet2 = [{ time: 71530, distance: 940200, winSolutions: 71503 }];

test("Test distance scenario", () => {
  expect(functions.getDistanceForDuration(7, 0)).toEqual(0);
  expect(functions.getDistanceForDuration(7, 1)).toEqual(6);
  expect(functions.getDistanceForDuration(7, 2)).toEqual(10);
  expect(functions.getDistanceForDuration(7, 3)).toEqual(12);
  expect(functions.getDistanceForDuration(7, 4)).toEqual(12);
  expect(functions.getDistanceForDuration(7, 5)).toEqual(10);
  expect(functions.getDistanceForDuration(7, 6)).toEqual(6);
  expect(functions.getDistanceForDuration(7, 7)).toEqual(0);
});

test("Find nb of winning solutions", () => {
  expect(
    functions.findWinningSolutions(demoSet[0].time, demoSet[0].distance),
  ).toEqual(demoSet[0].winSolutions);
  expect(
    functions.findWinningSolutions(demoSet[1].time, demoSet[1].distance),
  ).toEqual(demoSet[1].winSolutions);
  expect(
    functions.findWinningSolutions(demoSet[2].time, demoSet[2].distance),
  ).toEqual(demoSet[2].winSolutions);
});

test("Test getScore", () => {
  expect(functions.getScore(demoSet)).toEqual(288);
  expect(functions.getScore(demoSet2)).toEqual(demoSet2[0].winSolutions);
});

test("Test getScore for puzzle", () => {
  expect(functions.getScore(puzzleSet)).toEqual(220320);
});

test("Test getScore for puzzle part 2", () => {
  expect(functions.getScore(puzzleSet2)).toEqual(34454850);
});
