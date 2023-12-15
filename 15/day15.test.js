const fs = require("fs");

const puzzleInput = fs.readFileSync("15/input.txt").toString("utf-8").trim();

function getASCII(char) {
  return char.charCodeAt();
}

function calculateHash(string) {
  const stringLength = string.length;
  let total = 0;
  for (let i = 0; i < stringLength; i += 1) {
    total += getASCII(string[i]);
    total *= 17;
    total %= 256;
  }
  return total;
}

function calculateHashForSequence(sequence) {
  const items = sequence.split(",");
  return items.reduce((acc, item) => acc + calculateHash(item), 0);
}

const demoSet = "HASH";
const demoSet2 = "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7";

test("get ASCII code", () => {
  expect(getASCII("H")).toEqual(72);
  expect(getASCII("A")).toEqual(65);
  expect(getASCII("S")).toEqual(83);
});

test("calculate hash", () => {
  expect(calculateHash(demoSet)).toEqual(52);
  expect(calculateHash("rn=1")).toEqual(30);
  expect(calculateHash("cm-")).toEqual(253);
  expect(calculateHash("qp=3")).toEqual(97);
  expect(calculateHash("cm=2")).toEqual(47);
  expect(calculateHash("qp-")).toEqual(14);
  expect(calculateHash("pc=4")).toEqual(180);
  expect(calculateHash("ot=9")).toEqual(9);
  expect(calculateHash("ab=5")).toEqual(197);
  expect(calculateHash("pc-")).toEqual(48);
  expect(calculateHash("pc=6")).toEqual(214);
  expect(calculateHash("ot=7")).toEqual(231);
});

test("calculate hash for sequence", () => {
  expect(calculateHashForSequence(demoSet)).toEqual(52);
  expect(calculateHashForSequence(demoSet2)).toEqual(1320);
});

test("solution part 1", () => {
  expect(calculateHashForSequence(puzzleInput)).toEqual(511416);
});
