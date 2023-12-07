/* eslint-disable no-use-before-define */
const demoSet = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const demoSet2 = `12.......*..
+.........34
.......-12..
..78........
..*....60...
78.........9
.5.....23..$
8...90*12...
............
2.2......12.
.*.........*
1.1..503+.56`;

const fs = require("fs");

const inputSet = fs
  .readFileSync("3 Gear Ratios/input.txt")
  .toString("utf-8")
  .trim();

test("Separate lines", () => {
  expect(separateLines(demoSet).length).toStrictEqual(10);
});

test("isASymbol", () => {
  expect(checkIfIsSymbol(".")).toBe(false);
  expect(checkIfIsSymbol("4")).toBe(false);
  expect(checkIfIsSymbol("a")).toBe(false);
  expect(checkIfIsSymbol("*")).toBe(true);
  expect(checkIfIsSymbol("#")).toBe(true);
  expect(checkIfIsSymbol("+")).toBe(true);
  expect(checkIfIsSymbol("$")).toBe(true);
});

test("parseFile", () => {
  expect(parseInputFile(demoSet).resultPart1).toEqual(4361);
  expect(parseInputFile(demoSet2).resultPart1).toEqual(925);
  expect(parseInputFile(inputSet).resultPart1).toEqual(535078);
  expect(parseInputFile(demoSet).gearRatioSum).toEqual(467835);
  expect(parseInputFile(inputSet).gearRatioSum).toEqual(75312571);
});

test("isNumberNextToASymbol", () => {
  expect(isNumberNextToASymbol(demoSet, "467", 0)).toEqual({
    line: 1,
    position: 3,
    symbol: "*",
  });
  expect(isNumberNextToASymbol(demoSet, "617", 4)).toEqual({
    line: 4,
    position: 3,
    symbol: "*",
  });
  expect(isNumberNextToASymbol(demoSet, "35", 2)).toEqual({
    line: 1,
    position: 3,
    symbol: "*",
  });
  expect(isNumberNextToASymbol(demoSet, "633", 2)).toEqual({
    line: 3,
    position: 6,
    symbol: "#",
  });
  expect(isNumberNextToASymbol(demoSet, "592", 6)).toEqual({
    line: 5,
    position: 5,
    symbol: "+",
  });
  expect(isNumberNextToASymbol(demoSet, "755", 7)).toEqual({
    line: 8,
    position: 5,
    symbol: "*",
  });
  expect(isNumberNextToASymbol(demoSet, "664", 9)).toEqual({
    line: 8,
    position: 3,
    symbol: "$",
  });
  expect(isNumberNextToASymbol(demoSet, "598", 9)).toEqual({
    line: 8,
    position: 5,
    symbol: "*",
  });
  expect(isNumberNextToASymbol(demoSet, "114", 0)).toBeFalsy();
  expect(isNumberNextToASymbol(demoSet, "58", 5)).toBeFalsy();
  expect(isNumberNextToASymbol(demoSet2, "12", 2, 8)).toEqual({
    line: 2,
    position: 7,
    symbol: "-",
  });
});

test("Find position in line", () => {
  expect(getPositionInString("467", "467..114..")).toEqual(0);
  expect(getPositionInString("114", "467..114..")).toEqual(5);
});

function separateLines(input) {
  return input.split("\n"); // .filter((item) => item != '')
}

function getPositionInString(input, line) {
  return line.indexOf(input);
}

function checkIfIsSymbol(value) {
  return /[-!$%@#^&*()_+|~=`{}[\]:";'<>?,/]/.test(value);
}

function isNumberNextToASymbol(dataSet, input, lineId, position = undefined) {
  const lines = separateLines(dataSet);
  const inputPosition = position || getPositionInString(input, lines[lineId]);

  // check if symbol before or after on the same line
  if (checkIfIsSymbol(lines[lineId][inputPosition - 1])) {
    return {
      symbol: lines[lineId][inputPosition - 1],
      line: lineId,
      position: inputPosition - 1,
    };
  }
  if (checkIfIsSymbol(lines[lineId][inputPosition + input.length])) {
    return {
      symbol: lines[lineId][inputPosition + input.length],
      line: lineId,
      position: inputPosition + input.length,
    };
  }

  for (
    let cursor = inputPosition - 1;
    cursor <= inputPosition + input.length;
    cursor += 1
  ) {
    // Check previous line
    if (lineId > 0) {
      if (checkIfIsSymbol(lines[lineId - 1][cursor])) {
        return {
          symbol: lines[lineId - 1][cursor],
          line: lineId - 1,
          position: cursor,
        };
      }
    }

    // Check following line
    if (lineId < lines.length - 1) {
      if (checkIfIsSymbol(lines[lineId + 1][cursor])) {
        return {
          symbol: lines[lineId + 1][cursor],
          line: lineId + 1,
          position: cursor,
        };
      }
    }
  }

  return undefined;
}

function parseInputFile(dataSet) {
  const lines = separateLines(dataSet);
  const selectedNumbers = [];
  const symbolsAndClosedNumbers = [];
  lines.forEach((element, index) => {
    const numbers = [...element.matchAll(/\d+/g)];
    if (!numbers || !numbers.length) return;

    const filterNumber = (number) => {
      const symbol = isNumberNextToASymbol(
        dataSet,
        number[0],
        index,
        number.index,
      );
      if (symbol && symbol.symbol === "*") {
        const existingSymbolIndex = symbolsAndClosedNumbers.findIndex(
          (obj) => obj.line === symbol.line && obj.position === symbol.position,
        );
        if (existingSymbolIndex !== -1) {
          symbolsAndClosedNumbers[existingSymbolIndex].closedNumbers.push(
            number[0],
          );
        } else {
          symbol.closedNumbers = [];
          symbol.closedNumbers.push(number[0]);
          symbolsAndClosedNumbers.push(symbol);
        }
      }
      return symbol;
    };

    const selectedNumbersForLine = numbers.filter(filterNumber);
    selectedNumbers.push(selectedNumbersForLine);
  });
  const selectedNumbersFlat = selectedNumbers.flat();
  const resultPart1 = selectedNumbersFlat.reduce(
    (acc, value) => acc + Number(value),
    0,
  );

  const gears = symbolsAndClosedNumbers.filter(
    (element) => element.closedNumbers.length === 2,
  );
  const gearRatioSum = gears.reduce((acc, value) => {
    const gearRatio = value.closedNumbers.reduce(
      (acc2, value2) => acc2 * +value2,
      1,
    );
    return acc + gearRatio;
  }, 0);

  return { resultPart1, gearRatioSum };
}
