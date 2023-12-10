const fs = require("fs");
const f = require("./day10.js");

const puzzleInput = fs.readFileSync("10/input.txt").toString("utf-8").trim();

const demoInput1 = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const demoInput2 = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

test("Parse input string", () => {
  expect(typeof f.parseInputAsString(demoInput1)).toBe("object");
  expect(f.parseInputAsString(demoInput1).length).toEqual(5);
  expect(f.parseInputAsString(demoInput1)[0].length).toEqual(5);
  expect(f.parseInputAsString(puzzleInput).length).toEqual(140);
  expect(f.parseInputAsString(puzzleInput)[0].length).toEqual(140);
});

test("getNextDirection", () => {
  expect(f.getNextDirection("|", "N")).toEqual("S");
  expect(f.getNextDirection("|", "S")).toEqual("N");
  expect(f.getNextDirection("-", "E")).toEqual("W");
  expect(f.getNextDirection("-", "W")).toEqual("E");
  expect(f.getNextDirection("L", "N")).toEqual("E");
  expect(f.getNextDirection("L", "E")).toEqual("N");
  expect(f.getNextDirection("F", "E")).toEqual("S");
  expect(f.getNextDirection("F", "S")).toEqual("E");
  expect(f.getNextDirection("7", "S")).toEqual("W");
  expect(f.getNextDirection("7", "W")).toEqual("S");
  expect(f.getNextDirection("J", "W")).toEqual("N");
  expect(f.getNextDirection("J", "N")).toEqual("W");
});

test("Get Start position ", () => {
  expect(f.findStartPosition(f.parseInputAsString(demoInput1))).toStrictEqual({
    x: 1,
    y: 1,
  });
  expect(f.findStartPosition(f.parseInputAsString(demoInput2))).toStrictEqual({
    x: 0,
    y: 2,
  });
  expect(f.findStartPosition(f.parseInputAsString(puzzleInput))).toStrictEqual({
    x: 90,
    y: 98,
  });
});

test("Get next position from S", () => {
  expect(
    f.getStartNextPosition(
      f.parseInputAsString(demoInput1),
      f.findStartPosition(f.parseInputAsString(demoInput1)),
    ),
  ).toStrictEqual({
    position: { x: 1, y: 2 },
    origin: "N",
  });
  expect(
    f.getStartNextPosition(
      f.parseInputAsString(demoInput2),
      f.findStartPosition(f.parseInputAsString(demoInput2)),
    ),
  ).toStrictEqual({
    position: { x: 0, y: 3 },
    origin: "N",
  });
});

test("Get pipe path", () => {
  expect(f.travelPipe(f.parseInputAsString(demoInput1))).toEqual([
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 2, y: 3 },
    { x: 3, y: 3 },
    { x: 3, y: 2 },
    { x: 3, y: 1 },
    { x: 2, y: 1 },
    { x: 1, y: 1 },
  ]);
});

test("Further distance", () => {
  expect(f.furtherDistance(f.parseInputAsString(demoInput1))).toEqual(4);
  expect(f.furtherDistance(f.parseInputAsString(demoInput2))).toEqual(8);
  expect(f.furtherDistance(f.parseInputAsString(puzzleInput))).toEqual(6903);
});
