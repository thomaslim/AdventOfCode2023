const ENTRY_CHAR = "S";
const NS_CHAR = "|";
const EW_CHAR = "-";
const NE_CHAR = "L";
const NW_CHAR = "J";
const SW_CHAR = "7";
const SE_CHAR = "F";

function parseInputAsString(input) {
  return input.split("\n").map((line) => line.split(""));
}

function findStartPosition(input) {
  return input.reduce((acc, line, index) => {
    const x = line.findIndex((item) => item === ENTRY_CHAR);
    if (x >= 0) return { x, y: index };
    return acc;
  }, {});
}

function getStartNextPosition(inputAsArray, startPosition) {
  if (
    [NS_CHAR, SW_CHAR, SE_CHAR].includes(
      inputAsArray[startPosition.y - 1][startPosition.x],
    )
  )
    return {
      position: { x: startPosition.x, y: startPosition.y - 1 },
      origin: "S",
    };
  if (
    [NS_CHAR, NW_CHAR, NE_CHAR].includes(
      inputAsArray[startPosition.y + 1][startPosition.x],
    )
  )
    return {
      position: { x: startPosition.x, y: startPosition.y + 1 },
      origin: "N",
    };
  if (
    [EW_CHAR, NE_CHAR, SE_CHAR].includes(
      inputAsArray[startPosition.y][startPosition.x - 1],
    )
  )
    return {
      position: { x: startPosition.x - 1, y: startPosition.y },
      origin: "E",
    };
  if (
    [EW_CHAR, NW_CHAR, NE_CHAR].includes(
      inputAsArray[startPosition.y][startPosition.x],
    )
  )
    return {
      position: { x: startPosition.x + 1, y: startPosition.y },
      origin: "W",
    };

  return false;
}

function getNextDirection(char, origin) {
  if (char === NS_CHAR && origin === "N") return "S";
  if (char === NS_CHAR && origin === "S") return "N";
  if (char === EW_CHAR && origin === "E") return "W";
  if (char === EW_CHAR && origin === "W") return "E";
  if (char === NE_CHAR && origin === "N") return "E";
  if (char === NE_CHAR && origin === "E") return "N";
  if (char === NW_CHAR && origin === "N") return "W";
  if (char === NW_CHAR && origin === "W") return "N";
  if (char === SW_CHAR && origin === "S") return "W";
  if (char === SW_CHAR && origin === "W") return "S";
  if (char === SE_CHAR && origin === "S") return "E";
  if (char === SE_CHAR && origin === "E") return "S";
  return false;
}

function travelPipe(inputAsArray) {
  const startPosition = findStartPosition(inputAsArray);
  const path = [];
  const nextPosition = getStartNextPosition(inputAsArray, startPosition);
  path.push(nextPosition.position);
  while (
    inputAsArray[nextPosition.position.y][nextPosition.position.x] !==
    ENTRY_CHAR
  ) {
    const nextDirection = getNextDirection(
      inputAsArray[nextPosition.position.y][nextPosition.position.x],
      nextPosition.origin,
    );
    if (nextDirection === "S") {
      nextPosition.position = {
        x: nextPosition.position.x,
        y: nextPosition.position.y + 1,
      };
      nextPosition.origin = "N";
    }
    if (nextDirection === "N") {
      nextPosition.position = {
        x: nextPosition.position.x,
        y: nextPosition.position.y - 1,
      };
      nextPosition.origin = "S";
    }
    if (nextDirection === "E") {
      nextPosition.position = {
        x: nextPosition.position.x + 1,
        y: nextPosition.position.y,
      };
      nextPosition.origin = "W";
    }
    if (nextDirection === "W") {
      nextPosition.position = {
        x: nextPosition.position.x - 1,
        y: nextPosition.position.y,
      };
      nextPosition.origin = "E";
    }
    path.push(nextPosition.position);
  }
  return path;
}

function furtherDistance(inputAsArray) {
  const path = travelPipe(inputAsArray);
  return path.length / 2;
}

module.exports = {
  parseInputAsString,
  getNextDirection,
  findStartPosition,
  travelPipe,
  getStartNextPosition,
  furtherDistance,
};
