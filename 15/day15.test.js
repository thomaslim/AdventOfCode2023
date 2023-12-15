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

function calculateFocusPowerForSequence(sequence) {
  const items = sequence.split(",");
  const sequenceDetails = items.map(item => {
    const regex = /(\w+)([=-])(\d*)/gm;

    const label = regex.exec(item)
    return {
      label: label[1],
      focal: label[3],
      operation: label[2],
      box: calculateHash(label[1])
    }
  });

  const lensBox = []
  // parse sequence
  for (let index = 0; index < sequenceDetails.length; index +=1){
    const item = sequenceDetails[index]
    if (item.operation === "=") {
      if (!lensBox[item.box] || !lensBox[item.box].length) {
        lensBox[item.box] = [item]
      } else {
        const i = lensBox[item.box].findIndex( a => a.label === item.label)
        if (i !== -1) { 
          lensBox[item.box][i].focal = item.focal
        } else {
          lensBox[item.box].push(item)
        }
      }
    }
    if (item.operation === "-") {

      if ( lensBox[item.box] ) {
        const i = lensBox[item.box].findIndex( a => a.label === item.label)
        if (i !== -1) lensBox[item.box].splice(i, 1)
      }
    }
  }

  const focalPower = lensBox.reduce( (acc, box, boxIndex) => {
    const boxPower = box.reduce( (acc2, lense, lenseIndex) => {
      const boxValue = 1+boxIndex
      const slotValue = 1+lenseIndex
      const focalValue = lense.focal
      const lenseValue = boxValue * slotValue * focalValue
      return acc2 + lenseValue; 
    }, 0)
    return acc + boxPower; 
  }, 0)

  return focalPower
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

test("solutioo part 1", () => {
  expect(calculateHashForSequence(puzzleInput)).toEqual(511416);
});

test("calculate hash part 2", () => {
  expect(calculateHash("rn")).toEqual(0);
  expect(calculateHash("cm")).toEqual(0);
  expect(calculateHash("qp")).toEqual(1);
  expect(calculateHash("cm")).toEqual(0);
  expect(calculateHash("qp")).toEqual(1);
  expect(calculateHash("pc")).toEqual(3);
  expect(calculateHash("ot")).toEqual(3);
  expect(calculateHash("ab")).toEqual(3);
  expect(calculateHash("pc")).toEqual(3);
  expect(calculateHash("pc")).toEqual(3);
  expect(calculateHash("ot")).toEqual(3);
});

test("calculate power for sequence", () => {
  expect(calculateFocusPowerForSequence(demoSet2)).toEqual(145);
});

test("solution part 2", () => {
  expect(calculateFocusPowerForSequence(puzzleInput)).toEqual(290779);
});