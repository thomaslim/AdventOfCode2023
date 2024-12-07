// https://adventofcode.com/2024/day/1

function parseInputAsString(input) {
  const result = input.split("\n").map((line) => line.split("   ")).reduce((acc, line, index) => {
    acc.column1.push(parseInt(line[0]))
    acc.column2.push(parseInt(line[1]))

    return acc
  }, {column1 : [], column2 : []});
  return result
}

function sortObject(input) {
  const sortColumn1 = input.column1.sort((a, b) => a-b)
  const sortColumn2 = input.column2.sort((a, b) => a-b)
  return {column1:sortColumn1, column2: sortColumn2 }

}

function calculateDistance(i, j){
  return j<i ?  i-j : j-i
}

function computeTotalDistance(sortedObject) {
  if (sortedObject.column1.length != sortedObject.column2.length) {
    throw new Error("columns are not the same size")
  }
  const totalDistance = sortedObject.column1.reduce((acc, item, index) => acc + calculateDistance(sortedObject.column1[index], sortedObject.column2[index]), 0)
  return totalDistance
}

function findSimilarityForNumber(item, array) {
  const filteredArray = array.filter(i => i === item)
  return filteredArray.length
}

function findTotalSimilarity (sortedObject) {
  return sortedObject.column1.reduce( (acc, item) =>  acc + item * findSimilarityForNumber(item,sortedObject.column2 ), 0)
}

module.exports = {
  parseInputAsString,
  sortObject,
  calculateDistance,
  computeTotalDistance,
  findSimilarityForNumber,
  findTotalSimilarity,
};
