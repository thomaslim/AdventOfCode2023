const fs = require("fs");
const f = require("./day9.js");

const puzzleInput = fs.readFileSync("9/input.txt").toString("utf-8").trim();

const demoInput1 = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

test("areAllElements0", () => {
  expect(f.areAllElements0([0, 1, 3])).toBe(false);
  expect(f.areAllElements0([0, 0, 0])).toBe(true);
  expect(f.areAllElements0([0, 1, 0])).toBe(false);
  expect(f.areAllElements0([7, 10, 10, 8, 5, 2, 0, 0, NaN])).toBe(false);
});

test("getFirstNaN", () => {
  expect(f.getFirstNaNIndex([0, 0, NaN])).toEqual(2);
  expect(f.getFirstNaNIndex([NaN, 0, 0])).toEqual(0);
});

test("Parse a line", () => {
  expect(f.parseLine("10 13 16 21 30 45")).toEqual({
    nextValueUp: 68,
    previousValueDown: 5,
  });
  expect(f.parseLine("0 3 6 9 12 15")).toEqual({
    nextValueUp: 18,
    previousValueDown: -3,
  });
  expect(f.parseLine("1 3 6 10 15 21")).toEqual({
    nextValueUp: 28,
    previousValueDown: 0,
  });

  expect(
    f.parseLine(
      "7 15 32 57 98 176 332 653 1352 2972 6842 16010 37046 83402 181521 381725 777249 1536841 2959392 5563435 10230470",
    ),
  ).toEqual({ nextValueUp: 18429424, previousValueDown: 9 });
  expect(
    f.parseLine(
      "12 19 34 77 185 413 837 1572 2824 5006 8977 16537 31481 61873 124907 257041 534437 1112730 2301649 4700194 9433462",
    ),
  ).toEqual({ nextValueUp: 18554750, previousValueDown: 8 });
});

test("Sum of extrapolated values, up for part1 and down for part2", () => {
  expect(f.sumOfExtrapotaledValues(demoInput1)).toEqual(114);
  expect(f.sumOfExtrapotaledValues(puzzleInput)).toEqual(2043677056);
  expect(f.sumOfExtrapotaledValuesDown(demoInput1)).toEqual(2);
  expect(f.sumOfExtrapotaledValuesDown(puzzleInput)).toEqual(1062);
});
