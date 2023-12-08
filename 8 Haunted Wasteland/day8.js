function parseInput(input) {
  const rawLines = input.split("\n");
  const directions = rawLines[0];
  const conversions = rawLines
    .filter((line) => line.match(/=/))
    .map((line) => {
      const regex = /([A-Z]*) = \(([A-Z]*), ([A-Z]*)/;
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

function countStepsToReachZZZ(input) {
  const instructions = parseInput(input);
  const directions = instructions.directions.split("");
  let step = "AAA";
  let counter = 0;
  while (step !== "ZZZ") {
    const direction = directions[counter % directions.length];
    step = getNextStep(instructions.conversions, step, direction);
    counter += 1;
  }

  return counter;
}

module.exports = {
  countStepsToReachZZZ,
  parseInput,
  getNextStep,
};
