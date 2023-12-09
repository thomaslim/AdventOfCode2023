function parseInput(input) {
  const rawLines = input.split("\n");
  const directions = rawLines[0];
  const conversions = rawLines
    .filter((line) => line.match(/=/))
    .map((line) => {
      const regex = /([0-9A-Z]*) = \(([0-9A-Z]*), ([0-9A-Z]*)/;
      const lineSegments = line.match(regex);
      return {
        in: lineSegments[1],
        left: lineSegments[2],
        right: lineSegments[3],
      };
    });

  return { directions, conversions };
}

function getNextStep(conversions, entry, direction) {
  const index = conversions.findIndex((obj) => obj.in === entry);
  const nextStep =
    direction === "L" ? conversions[index].left : conversions[index].right;
  return nextStep;
}

function getStartingPoints(parsedInput) {
  return parsedInput.conversions
    .filter((item) => item.in.match(/[0-9A-Z]{2}A/))
    .map((item) => item.in);
}

function lcm(arr) {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const tlcm = (x, y) => (x * y) / gcd(x, y);
  return arr.reduce((a, b) => tlcm(a, b));
}

function countStepsToReachZZZ(input, challenge2 = false) {
  const instructions = parseInput(input);
  const directions = instructions.directions.split("");

  const steps = challenge2 ? getStartingPoints(instructions) : ["AAA"];
  const validationRegex = challenge2 ? /[0-9A-Z]{2}Z/ : /ZZZ/;

  const counterPerStartingSteps = steps.map((step) => {
    let counter = 0;
    let iterator = step;
    while (!iterator.match(validationRegex)) {
      const direction = directions[counter % directions.length];
      iterator = getNextStep(instructions.conversions, iterator, direction);

      counter += 1;
    }
    return { step, counter };
  });

  return lcm(counterPerStartingSteps.map((item) => item.counter));
}

module.exports = {
  countStepsToReachZZZ,
  parseInput,
  getNextStep,
  getStartingPoints,
};
