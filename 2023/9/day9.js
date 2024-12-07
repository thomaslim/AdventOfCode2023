const e = module.exports;

e.areAllElements0 = (array) =>
  array.reduce((acc, item) => (item === 0 || Number.isNaN(item)) && acc, true);
e.getFirstNaNIndex = (array) => array.findIndex(Number.isNaN);

e.parseLine = (inputString) => {
  const numbers = [];
  numbers[0] = inputString.split(" ").map(parseFloat);

  let i = 0;
  while (!e.areAllElements0(numbers[i])) {
    numbers[i + 1] = numbers[i].reduce((acc, item, index, numberLine) => {
      if (index === numberLine.length) return acc;
      const sum = numberLine[index + 1] - numberLine[index];
      return [...acc, sum];
    }, []);
    i += 1;
  }

  // complete numbers matrix
  let j = numbers.length - 1;
  while (j >= 0) {
    const firstNaN = e.getFirstNaNIndex(numbers[j]);
    const extrapolatedValueIndex = firstNaN >= 0 ? firstNaN : numbers[j].length;
    numbers[j][extrapolatedValueIndex] =
      j === numbers.length - 1
        ? 0
        : numbers[j + 1][extrapolatedValueIndex - 1] +
          numbers[j][extrapolatedValueIndex - 1];
    j -= 1;
  }
  const nextValueUp = numbers[0][numbers[0].length - 1];

  let k = numbers.length - 1;
  let previousValueDown;
  while (k >= 0) {
    if (k === numbers.length - 1) {
      previousValueDown = 0;
    } else {
      previousValueDown = numbers[k][0] - previousValueDown;
    }
    k -= 1;
  }

  return { nextValueUp, previousValueDown };
};

e.sumOfExtrapotaledValues = (input) => {
  const inputLines = input.split("\n");
  const extrapolatedValues = inputLines.map(e.parseLine);

  return extrapolatedValues.reduce((acc, item) => acc + item.nextValueUp, 0);
};

e.sumOfExtrapotaledValuesDown = (input) => {
  const inputLines = input.split("\n");
  const extrapolatedValues = inputLines.map(e.parseLine);

  return extrapolatedValues.reduce(
    (acc, item) => acc + item.previousValueDown,
    0,
  );
};

