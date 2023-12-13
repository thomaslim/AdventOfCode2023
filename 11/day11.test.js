const fs = require("fs");
const puzzleInput = fs.readFileSync("11/input.txt").toString("utf-8").trim();

function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));

}

function expandTheUniverse(oldUniverseMatrix) {
  const expandedVertically = []

  oldUniverseMatrix.forEach(line => {
    if (!line.filter(item => item === '#').length) {
      expandedVertically.push (line)
    }
    expandedVertically.push (line)
  });

  const expandedHorizontally = transpose(expandedVertically)
  const tempMatrix = []
  expandedHorizontally.forEach(line => {
    if (!line.filter(item => item === '#').length) {
      tempMatrix.push (line)
    }
    tempMatrix.push (line)
  });
  const newUniverse = transpose(tempMatrix)

  return newUniverse
}

function convertInputToMatrix(input){
  return input.split('\n').map(line => line.split(''))
}

function shortestPath(a, b){
  return Math.abs( b.y - a.y ) + Math.abs (b.x - a.x)
}

function getGalaxies(universeMatrix) {
  const galaxies = []
  universeMatrix.forEach((line, index) => {
    for(let i = 0; i < line.length; i++) {
      if (line[i] === '#') 
        galaxies.push({y: index, x:i});
    }
  })
  return galaxies
}

function getPairs(universeMatrix) {
  const galaxies = getGalaxies(universeMatrix)
  const pairs = []
  for (let j = 0; j < galaxies.length; j++) {
    for (let k = 0; k < galaxies.length; k++) {
      if (j !==k && pairs.indexOf({a: galaxies[k], b:galaxies[j]}) === -1) {

        pairs.push({a : galaxies[j], b: galaxies[k], dist : shortestPath(galaxies[j],galaxies[k] )})
      }
    }
  }

  return pairs
}

function getSumDistances(universeMatrix) {
  const pairs = getPairs(universeMatrix)
  return pairs.reduce( (acc, item) => {
    
    return acc + item.dist; 
  }, 0)/2
}




const demoSet1 = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

const demoExpanded1 = `....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`

test('Transpose', () => {
  expect(transpose( [[1, 0],[1, 2]] )).toEqual([[1,1],[0,2]])
});

test('ConvertInput', () => {
  expect(convertInputToMatrix(demoSet1).length).toEqual(10)
  expect(convertInputToMatrix(demoSet1)[0].length).toEqual(10)
});

test('Expand universe ', () => {
  expect(expandTheUniverse(convertInputToMatrix(demoSet1)).length).toEqual(12)
  expect(expandTheUniverse(convertInputToMatrix(demoSet1))[0].length).toEqual(13)
  expect(expandTheUniverse(convertInputToMatrix(demoSet1))).toEqual(convertInputToMatrix(demoExpanded1))
});

test('shortest path', () => {
  expect(shortestPath({x: 6, y:1}, {x:11, y:5})).toBe(9)
  expect(shortestPath({x: 4, y:0}, {x:9, y:10})).toBe(15)
});

test('getGalaxies', () => {
  expect(getGalaxies(expandTheUniverse(convertInputToMatrix(demoSet1))).length).toEqual(9)
  expect(getGalaxies(expandTheUniverse(convertInputToMatrix(demoSet1)))).toEqual([{"x": 4, "y": 0}, {"x": 9, "y": 1}, {"x": 0, "y": 2}, {"x": 8, "y": 5}, {"x": 1, "y": 6}, {"x": 12, "y": 7}, {"x": 9, "y": 10}, {"x": 0, "y": 11}, {"x": 5, "y": 11}])
  
});

test('getPairs', () => {
  expect(getPairs(expandTheUniverse(convertInputToMatrix(demoSet1))).length).toEqual(36*2)
});

test ('getSumOfLengths', () => {
  expect(getSumDistances(expandTheUniverse(convertInputToMatrix(demoSet1)))).toEqual(374)
  expect(getSumDistances(expandTheUniverse(convertInputToMatrix(puzzleInput)))).toEqual(9686930)
})