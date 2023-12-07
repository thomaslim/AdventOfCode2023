const functions = require('./day7')

const demoSet = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

const fs = require('fs');
const puzzleInput = fs.readFileSync('7 Camel Cards/input.txt' ).toString('utf-8').trim();

test('Read input', ()=>{
    expect(functions.splitSet(demoSet).length).toEqual(5)
    expect(functions.splitSet(demoSet)[0]).toEqual({"bid": 765, "hand": ["3", "2", "T", "3", "K"]})
})

test('get type of hand', () => {
    expect(functions.getTypeOfHand([5,5,5,5,5])).toEqual('7_5OAK')
    expect(functions.getTypeOfHand([5,5,5,2,5])).toEqual('6_4OAK')
    expect(functions.getTypeOfHand([5,2,5,2,5])).toEqual('5_FH')
    expect(functions.getTypeOfHand(["T","2","T","A","T"])).toEqual('4_3OAK')
    expect(functions.getTypeOfHand(["T","2","T","A","A"])).toEqual('3_2P')
    expect(functions.getTypeOfHand(["3", "2", "2", "A", "T"])).toEqual('2_1P')

    expect(functions.getTypeOfHand(["4", "2", "T", "3", "K"])).toEqual('1_HC')
})

test('add type of hand to hands array', () => {
    expect(functions.parseHandsAndAddType(
        functions.splitSet(demoSet)
    )[0]).toEqual({"bid": 765, "hand": ["3", "2", "T", "3", "K"], type: "2_1P"})
})

test('sort hands ', () => {
    // expect(functions.sortHands(functions.splitSet(demoSet))).toEqual([
    //     { hand: [ '3', '2', 'T', '3', 'K' ], bid: 765, type: '2_1P' },
    //     { hand: [ 'K', 'T', 'J', 'J', 'T' ], bid: 220, type: '3_2P' },
    //     { hand: [ 'K', 'K', '6', '7', '7' ], bid: 28, type: '3_2P' },
    //     { hand: [ 'T', '5', '5', 'J', '5' ], bid: 684, type: '4_3OAK' },
    //     { hand: [ 'Q', 'Q', 'Q', 'J', 'A' ], bid: 483, type: '4_3OAK' }
    //   ])

      expect(functions.sortHands([
        { hand: ['K', '2', '7', '5', '8'], type: '1_HC' },
        { hand: [ 'Q', 'Q', 'Q', 'J', 'A' ], type: '4_3OAK' },
        { hand: ['K', '2', '7', '5', '6'], type: '1_HC' },
        { hand: [ 'K', 'K', '6', '7', '7' ], type: '3_2P' },
        { hand: ['T', 'K', '4', '8', '6'], type: '1_HC' },
        { hand: [ 'T', '5', '5', 'J', '5' ], type: '4_3OAK' },
      ])).toStrictEqual([
        { hand: ['T', 'K', '4', '8', '6'], type: '1_HC' },
        { hand: ['K', '2', '7', '5', '6'], type: '1_HC' },
        { hand: ['K', '2', '7', '5', '8'], type: '1_HC' },
        { hand: [ 'K', 'K', '6', '7', '7' ], type: '3_2P' },
        { hand: [ 'T', '5', '5', 'J', '5' ], type: '4_3OAK' },
        { hand: [ 'Q', 'Q', 'Q', 'J', 'A' ], type: '4_3OAK' },
       
      ])
})

test('get score', () => {
    expect(functions.getTotalWinnings(functions.splitSet(demoSet))).toEqual(6440)
    expect(functions.getTotalWinnings(functions.splitSet(puzzleInput))).toEqual(249726565)
})