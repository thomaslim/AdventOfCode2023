// https://adventofcode.com/2023/day/4

const demoSet = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const partialDemoSet = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19`;

const fs = require("fs");

const puzzleInput = fs
  .readFileSync("4 Scratchcards/input.txt")
  .toString("utf-8")
  .trim();

function createCardRecords(input) {
  const lines = input.split("\n");
  const result = lines.map((line) => {
    const lineSplit1 = line.replace("Card ", "").split(":");
    const lineSplit2 = lineSplit1[1]
      .split("|")
      .map((string) => string.split(" ").filter(Boolean));
    return {
      id: lineSplit1[0],
      winningNumbers: lineSplit2[0],
      myNumbers: lineSplit2[1],
    };
  });

  return result;
}

function getCardPoints(cardRecord) {
  const myWinningNumbers = cardRecord.myNumbers.filter((number) =>
    cardRecord.winningNumbers.includes(number),
  );
  let score = 0;
  if (myWinningNumbers.length > 0) {
    score += 1;
  }
  if (myWinningNumbers.length > 1) {
    score *= 2 ** (myWinningNumbers.length - 1);
  }

  return score;
}

function getInputScoreChallenge1(input) {
  const cardRecords = createCardRecords(input);
  const score = cardRecords.reduce(
    (acc, record) => acc + getCardPoints(record),
    0,
  );
  return score;
}

function getInputScoreChallenge2(input) {
  const cardRecords = createCardRecords(input);
  const cardScores = cardRecords.map((card) => {
    const myWinningNumbers = card.myNumbers.filter((number) =>
      card.winningNumbers.includes(number),
    );
    return {
      id: card.id,
      nbWinningNumbers: myWinningNumbers.length,
      copies: 1,
    };
  });

  cardScores.forEach((element) => {
    if (element.nbWinningNumbers > 0) {
      for (
        let i = +element.id + 1;
        i < +element.id + element.nbWinningNumbers + 1;
        i += 1
      ) {
        const index = cardScores.findIndex((obj) => +obj.id === i);
        cardScores[index].copies = cardScores[index]
          ? cardScores[index].copies + element.copies
          : null;
      }
    }
  });

  const result = cardScores.reduce((acc, value) => acc + value.copies, 0);

  return result;
}

test("Card records creation", () => {
  expect(createCardRecords(partialDemoSet)).toEqual([
    {
      id: "1",
      myNumbers: ["83", "86", "6", "31", "17", "9", "48", "53"],
      winningNumbers: ["41", "48", "83", "86", "17"],
    },
    {
      id: "2",
      myNumbers: ["61", "30", "68", "82", "17", "32", "24", "19"],
      winningNumbers: ["13", "32", "20", "16", "61"],
    },
  ]);
});

test("Card point calcultation", () => {
  const demoCardRecords = createCardRecords(demoSet);
  expect(getCardPoints(demoCardRecords[0])).toEqual(8);
  expect(getCardPoints(demoCardRecords[1])).toEqual(2);
  expect(getCardPoints(demoCardRecords[2])).toEqual(2);
  expect(getCardPoints(demoCardRecords[3])).toEqual(1);
  expect(getCardPoints(demoCardRecords[4])).toEqual(0);
  expect(getCardPoints(demoCardRecords[5])).toEqual(0);
});

test("Get input score for challenge 1", () => {
  expect(getInputScoreChallenge1(demoSet)).toEqual(13);
  expect(getInputScoreChallenge1(puzzleInput)).toEqual(27454);
});

test("Get input score for challenge 2", () => {
  expect(getInputScoreChallenge2(demoSet)).toEqual(30);
  expect(getInputScoreChallenge2(puzzleInput)).toEqual(6857330);
});
