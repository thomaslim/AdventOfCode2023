// https://adventofcode.com/2024/day/3

function parseInputData(input) {
  const lines = input.split("\n");
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const matches = lines.map((line) => line.match(regex));
  const regex2 = /\d{1,3}/g;
  const cleanedMatches = matches.flat(1).map((item) => item.match(regex2));
  return cleanedMatches;
}

function getResult(dataSet) {
  const result = dataSet.reduce(
    (acc, couple) => acc + parseInt(couple[0], 10) * parseInt(couple[1], 10),
    0,
  );
  return result;
}

module.exports = {
  parseInputData,
  getResult,
};
