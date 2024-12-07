/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
module.exports = {
  splitLines,
  removeEmptyItems,
};

const fs = require("fs");

const inputSet = fs
  .readFileSync("2 Cube Conundrum/input.txt")
  .toString("utf-8")
  .trim();

const demoSet = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

const bagContent = {
  red: 12,
  green: 13,
  blue: 14,
};

function splitLines(inputString) {
  return inputString.split(/\r?\n/);
}

function removeEmptyItems(inputArray) {
  return inputArray.filter((item) => item !== "");
}

function transformGameIntoRounds(inputString) {
  const stringSplit1 = inputString.split(":");
  const result = {
    gameName: stringSplit1[0],
    gameId: Number(stringSplit1[0].split(" ")[1]),
    rounds: stringSplit1[1].split(";").map((item) => createRoundsObject(item)),
  };

  return result;
}

function createRoundsObject(input) {
  const colorCounts = {};

  // Split the input by commas and iterate over each part
  input.split(",").forEach((part) => {
    // Extract the count and color from each part
    const [count, color] = part.trim().split(/\s+/);

    // Update the color count in the object
    colorCounts[color] = (colorCounts[color] || 0) + parseInt(count, 10);
  });

  return colorCounts;
}

function compareGameToContent(game, content) {
  const result = game.rounds.reduce((acc, item) => {
    const greenCheck = item.green === undefined || item.green <= content.green;
    const redCheck = item.red === undefined || item.red <= content.red;
    const blueCheck = item.blue === undefined || item.blue <= content.blue;
    const fullCheck = greenCheck && redCheck && blueCheck;

    return acc && fullCheck;
  }, true);
  return { name: game.gameName, result };
}

function minimumBagContent(game) {
  const result = game.rounds.reduce(
    (acc, item) => {
      acc.minRed = item.red && acc.minRed < item.red ? item.red : acc.minRed;
      acc.minGreen =
        item.green && acc.minGreen < item.green ? item.green : acc.minGreen;
      acc.minBlue =
        item.blue && acc.minBlue < item.blue ? item.blue : acc.minBlue;
      return acc;
    },
    { minRed: 0, minBlue: 0, minGreen: 0 },
  );

  return result;
}

function powerOfAGame(game) {
  const BagContent = minimumBagContent(game);
  const power = BagContent.minBlue * BagContent.minGreen * BagContent.minRed;
  return power;
}

function processPart1(dataSet) {
  const resultArray = removeEmptyItems(splitLines(dataSet));

  const gameArray = resultArray.map((item) => transformGameIntoRounds(item));

  const solution = gameArray.reduce(
    (acc, item) =>
      compareGameToContent(item, bagContent).result ? acc + item.gameId : acc,
    0,
  );

  return solution;
}

function processPart2(dataSet) {
  const resultArray = removeEmptyItems(splitLines(dataSet));

  const gameArray = resultArray.map((item) => transformGameIntoRounds(item));

  gameArray.map((item) => powerOfAGame(item));

  const solution = gameArray.reduce((acc, item) => acc + powerOfAGame(item), 0);

  return solution;
}

// const solution = processPart1(inputSet)
// console.log('Part 1 solution', solution)

// const solution2 = processPart2(inputSet)
// console.log('Part 2 solution ', solution2)
