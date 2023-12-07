function convertCardToValue(card, withJokerRule = false) {
  if (card === 'T') return 10;
  if (card === 'J' && withJokerRule) return 1;
  if (card === 'J' && !withJokerRule) return 11;
  // if (card === 'J') return 11;
  if (card === 'Q') return 12;
  if (card === 'K') return 13;
  if (card === 'A') return 14;
  return +card;
}

function splitSet(inputString) {
  const lines = inputString.split('\n');

  const setArray = lines.reduce((acc, line) => {
    const lineParts = line.split(' ');
    const hand = [
      lineParts[0][0],
      lineParts[0][1],
      lineParts[0][2],
      lineParts[0][3],
      lineParts[0][4]];
    const bid = +lineParts[1];
    acc.push({ hand, bid });
    return acc;
  }, []);

  return setArray;
}

function getTypeOfHand(hand, withJokerRule = false) {
  const table = {};
  let value;
  // compute nb of occurence per value
  for (let i = 0; i < hand.length; i += 1) {
    value = hand[i];
    if (!table[value]) table[value] = 1;
    else table[value] += 1;
  }

  if (withJokerRule && table.J && table.J !== 5) {
    const numberOfJ = table.J;
    delete table.J;
    const maxKey = Object.keys(table).reduce((a, b) => (table[a] > table[b] ? a : b));
    table[maxKey] += numberOfJ;
  }

  const sizeOfTable = Object.keys(table).length;
  if (sizeOfTable === 1) return '7_5OAK'; // Five of a kind
  if (sizeOfTable === 2) {
    if (Object.values(table).includes(4)) return '6_4OAK';
    return '5_FH';
  }
  if (sizeOfTable === 3) {
    if (Object.values(table).includes(3)) return '4_3OAK';
    return '3_2P';
  }
  if (sizeOfTable === 4) return '2_1P';

  return '1_HC';
}

function parseHandsAndAddType(hands, withJokerRule = false) {
  return hands.map((hand) => ({ ...hand, type: getTypeOfHand(hand.hand, withJokerRule) }));
}

function sortHands(hands, withJokerRule = false) {
  const handsWithType = parseHandsAndAddType(hands, withJokerRule);
  const sortedHands = handsWithType.sort((a, b) => {
    if (a.type < b.type) return -1;
    if (a.type > b.type) return 1;

    // both hands are the same type, look at values
    const handAvalues = a.hand.map((item) => convertCardToValue(item, withJokerRule));
    const handBvalues = b.hand.map((item) => convertCardToValue(item, withJokerRule));
    for (let i = 0; i < 5; i += 1) {
      if (handAvalues[i] < handBvalues[i]) return -1;
      if (handAvalues[i] > handBvalues[i]) return 1;
    }
    return 0;
  });

  return sortedHands;
}

function getTotalWinnings(hands, withJokerRule = false) {
  const sortedHands = sortHands(hands, withJokerRule);
  const result = sortedHands.reduce((acc, item, index) => acc + item.bid * (index + 1), 0);
  return result;
}

function testHandWithJokerRule(hand) {
  if (!hand.includes('J')) return getTypeOfHand(hand);

  return getTypeOfHand(hand, true);
}

module.exports = {
  splitSet,
  getTypeOfHand,
  parseHandsAndAddType,
  sortHands,
  getTotalWinnings,
  testHandWithJokerRule,
  convertCardToValue,
};
