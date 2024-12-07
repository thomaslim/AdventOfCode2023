// https://adventofcode.com/2024/day/2

function parseInputData(input) {
  const result = input.split("\n").map((line) => line.split(" "));
  return result;
}

function isReportSafe(line) {
  const result = line.reduce((acc, item, index) => {
    if (index === 0) return true;
    if (acc === false) return false;
    if (item === line[index - 1]) return false;

    if (
      (acc === true || acc === "asc") &&
      item - line[index - 1] > 0 &&
      item - line[index - 1] <= 3
    )
      return "asc";
    if (
      (acc === true || acc === "desc") &&
      line[index - 1] - item > 0 &&
      line[index - 1] - item <= 3
    )
      return "desc";

    return false;
  }, true);
  return result;
}

function getTotalSafeReports(dataSet) {
  const temp = dataSet.filter(isReportSafe);
  return temp.length;
}

module.exports = {
  parseInputData,
  isReportSafe,
  getTotalSafeReports,
};
