const fs = require("fs");
const f = require("./day1.js");

const puzzleInput = fs.readFileSync("2024/1/input.txt").toString("utf-8").trim();

const demoInput1 = `3   4
4   3
2   5
1   3
3   9
3   3`;


test("Parse input string", () => {
  expect(typeof f.parseInputAsString(demoInput1)).toBe("object");
  expect(f.parseInputAsString(demoInput1).column1.length).toEqual(6);
  expect(f.parseInputAsString(demoInput1).column2.length).toEqual(6);
  expect(f.parseInputAsString(puzzleInput).column1.length).toEqual(1000);
  expect(f.parseInputAsString(puzzleInput).column2.length).toEqual(1000);
});

test("Sort object", () => {
  const parsedInput = f.parseInputAsString(demoInput1)
  const result = f.sortObject(parsedInput)
  expect(result.column1).toEqual([1,2,3,3,3, 4])
  expect(result.column2).toEqual([3,3,3,4,5,9])
})

test("Calculate Distance", () => {
  expect (f.calculateDistance(3,3)).toEqual(0)
  expect (f.calculateDistance(1,3)).toEqual(2)
})

test("Compute Total Distance", () => {
  const parsedInput = f.parseInputAsString(demoInput1)
  const result = f.sortObject(parsedInput)
  expect(f.computeTotalDistance(result)).toEqual(11)
})

test("Solution", () => {
  const parsedInput = f.parseInputAsString(puzzleInput)
  const result = f.sortObject(parsedInput) 
  expect(f.computeTotalDistance(result)).toEqual(1970720)
})

test("find similarity", () => {
  const parsedInput = f.parseInputAsString(demoInput1)
  expect(f.findSimilarityForNumber(3, parsedInput.column2)).toEqual(3)
  expect(f.findSimilarityForNumber(4, parsedInput.column2)).toEqual(1)
  expect(f.findSimilarityForNumber(2, parsedInput.column2)).toEqual(0)
})

test("find total similarity ", () => {
  const parsedInput = f.parseInputAsString(demoInput1)
  expect(f.findTotalSimilarity(parsedInput)).toEqual(31)
})

test("Solution part 2 ", () => {
  const parsedInput = f.parseInputAsString(puzzleInput)
  expect(f.findTotalSimilarity(parsedInput)).toEqual(17191599)
})