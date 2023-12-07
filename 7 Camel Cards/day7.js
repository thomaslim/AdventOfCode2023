module.exports = {
    splitSet,
    getTypeOfHand,
    parseHandsAndAddType,
    sortHands,
    getTotalWinnings
}

function convertCardToValue (card) {
    if (card == "T") return 10
    if (card == "J") return 11
    if (card == "Q") return 12
    if (card == "K") return 13
    if (card == "A") return 14
    return +card
}

function splitSet (inputString) {
    const lines = inputString.split('\n')

    const setArray = lines.reduce((acc, line) => {
        const lineParts = line.split(" ")
        const hand = [ lineParts[0][0], lineParts[0][1], lineParts[0][2], lineParts[0][3], lineParts[0][4]]//.map(convertCardToValue)
        const bid = +lineParts[1]
        acc.push({hand, bid})
        return acc 
    }, [])

    return setArray
}

function getTypeOfHand (hand) {
    const table = {}
    let value
    for (let i = 0; i<hand.length; i++) {
        value = hand [i]
        if (!table[value]) table[value] = 1
        else table[value]++
    }

    const sizeOfTable = Object.keys(table).length
    if (sizeOfTable == 1 ) return "7_5OAK" // Five of a kind
    if (sizeOfTable == 2 ) {
        if (Object.values(table).includes(4)) return "6_4OAK"
        return "5_FH"
    }
    if (sizeOfTable == 3 ) {
        if (Object.values(table).includes(3)) return "4_3OAK"
        return "3_2P" 
    }
    if (sizeOfTable == 4 ) return "2_1P"
   
    return "1_HC"
}

function parseHandsAndAddType(hands) {
    return hands.map (hand => {
        hand.type = getTypeOfHand(hand.hand)
        return hand
    })
}

function sortHands (hands) {
    const handsWithType = parseHandsAndAddType(hands)
    const sortedHands = handsWithType.sort((a, b) => {
        if (a.type < b.type) return -1
        if (a.type > b.type) return 1

        // both hands are the same type, look at values
        const handAvalues = a.hand.map(convertCardToValue)
        const handBvalues = b.hand.map(convertCardToValue)
        for( let i = 0; i < 5; i++) {
            if (handAvalues[i] < handBvalues[i]) return -1
            if (handAvalues[i] > handBvalues[i]) return 1
        }
        return 0
    })

  return sortedHands
}

function getTotalWinnings(hands){
    let sortedHands = sortHands(hands)
    // for (i=1 ; i<2000; i++) {
    //     sortedHands = sortHands(sortedHands)
    // }
    const result = sortedHands.reduce((acc, item, index) => {
          return acc + item.bid * (index +1)
          },0)
    return result
}