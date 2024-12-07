const fs = require("fs");
const f = require("./day2.js");

const puzzleInput = fs
  .readFileSync("2024/2/input.txt")
  .toString("utf-8")
  .trim();

const demoInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

test("Parse input", () => {
  expect(typeof f.parseInputData(demoInput)).toBe("object");
  expect(f.parseInputData(demoInput).length).toEqual(6);
  expect(f.parseInputData(demoInput)[0].length).toEqual(5);
  expect(f.parseInputData(puzzleInput).length).toEqual(1000);
});

test("is report safe", () => {
  const dataSet = f.parseInputData(demoInput);
  expect(f.isReportSafe(dataSet[0])).toEqual("desc");
  expect(f.isReportSafe(dataSet[1])).toEqual(false);
  expect(f.isReportSafe(dataSet[2])).toEqual(false);
  expect(f.isReportSafe(dataSet[3])).toEqual(false);
  expect(f.isReportSafe(dataSet[4])).toEqual(false);
  expect(f.isReportSafe(dataSet[5])).toEqual("asc");
});

test("total safe reports", () => {
  const dataSet = f.parseInputData(demoInput);
  expect(f.getTotalSafeReports(dataSet)).toEqual(2);
});

test("Solution 1", () => {
  const dataSet = f.parseInputData(puzzleInput);
  expect(f.getTotalSafeReports(dataSet)).toEqual(526);
});
