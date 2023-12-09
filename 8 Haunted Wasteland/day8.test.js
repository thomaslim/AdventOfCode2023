const fs = require("fs");
const f = require("./day8");

const puzzleInput = fs
  .readFileSync("8 Haunted Wasteland/input.txt")
  .toString("utf-8")
  .trim();

const demoInput1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const demoInput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const demoInput3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

test("Parse input", () => {
  expect(f.parseInput(demoInput2)).toEqual({
    conversions: [
      { in: "AAA", left: "BBB", right: "BBB" },
      { in: "BBB", left: "AAA", right: "ZZZ" },
      { in: "ZZZ", left: "ZZZ", right: "ZZZ" },
    ],
    directions: "LLR",
  });
  expect(f.parseInput(demoInput1)).toEqual({
    conversions: [
      { in: "AAA", left: "BBB", right: "CCC" },
      { in: "BBB", left: "DDD", right: "EEE" },
      { in: "CCC", left: "ZZZ", right: "GGG" },
      { in: "DDD", left: "DDD", right: "DDD" },
      { in: "EEE", left: "EEE", right: "EEE" },
      { in: "GGG", left: "GGG", right: "GGG" },
      { in: "ZZZ", left: "ZZZ", right: "ZZZ" },
    ],
    directions: "RL",
  });
});

test("Find next step", () => {
  expect(
    f.getNextStep(
      [
        { in: "AAA", left: "BBB", right: "CCC" },
        { in: "BBB", left: "AAA", right: "ZZZ" },
      ],
      "AAA",
      "L",
    ),
  ).toEqual("BBB");
  expect(
    f.getNextStep(
      [
        { in: "AAA", left: "BBB", right: "CCC" },
        { in: "BBB", left: "AAA", right: "ZZZ" },
      ],
      "AAA",
      "R",
    ),
  ).toEqual("CCC");
  expect(
    f.getNextStep(
      [
        { in: "AAA", left: "BBB", right: "CCC" },
        { in: "BBB", left: "AAA", right: "ZZZ" },
      ],
      "BBB",
      "R",
    ),
  ).toEqual("ZZZ");
});

test("Count steps to ZZZ", () => {
  expect(f.countStepsToReachZZZ(demoInput1)).toEqual(2);
  expect(f.countStepsToReachZZZ(demoInput2)).toEqual(6);
});

test("Solution Part 1", () => {
  expect(f.countStepsToReachZZZ(puzzleInput)).toEqual(12599);
});

test("Get Ghost starting points", () => {
  expect(f.getStartingPoints(f.parseInput(demoInput3))).toEqual(["11A", "22A"]);
});

test("Get Ghost steps", () => {
  expect(f.countStepsToReachZZZ(demoInput3, true)).toEqual(6);
});

test("Solution Part 2", () => {
  expect(f.countStepsToReachZZZ(puzzleInput, true)).toEqual(8245452805243);
});
