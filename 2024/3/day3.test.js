const fs = require("fs");
const f = require("./day3.js");

const puzzleInput = fs
  .readFileSync("2024/3/input.txt")
  .toString("utf-8")
  .trim();

const demoInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

test("Parse input", () => {
  expect(f.parseInputData(demoInput)).toEqual([
    ["2", "4"],
    ["5", "5"],
    ["11", "8"],
    ["8", "5"],
  ]);
});

test("Multiply", () => {
  const dataSet = f.parseInputData(demoInput);
  expect(f.getResult(dataSet)).toEqual(161);
});

test("Solution part 1", () => {
  const dataSet = f.parseInputData(puzzleInput);
  expect(f.getResult(dataSet)).toEqual(170807108);
});
