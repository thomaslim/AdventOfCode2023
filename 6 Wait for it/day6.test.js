const functions = require('./day6')

const rawDemoSet = `Time:      7  15   30
Distance:  9  40  200`

const demoSet = [{
    time: 7, distance: 9, winSolutions: 4
},{
    time: 15, distance: 40, winSolutions: 8
},{
    time: 30, distance: 200, winSolutions: 9
},
]

const puzzleSet = [{
    time: 59, distance: 597
},{
    time: 79, distance: 1234
},{
    time: 65, distance: 1032
},{
    time: 75, distance: 1328
},
]

test('Test distance scenario', ()=>{
    expect(functions.getDistanceForDuration(7, 0)).toEqual(0)
    expect(functions.getDistanceForDuration(7, 1)).toEqual(6)
    expect(functions.getDistanceForDuration(7, 2)).toEqual(10)
    expect(functions.getDistanceForDuration(7, 3)).toEqual(12)
    expect(functions.getDistanceForDuration(7, 4)).toEqual(12)
    expect(functions.getDistanceForDuration(7, 5)).toEqual(10)
    expect(functions.getDistanceForDuration(7, 6)).toEqual(6)
    expect(functions.getDistanceForDuration(7, 7)).toEqual(0)
})

test('Find nb of winning solutions', ()=>{
    expect(functions.findWinningSolutions(demoSet[0].time, demoSet[0].distance)).toEqual(demoSet[0].winSolutions)
    expect(functions.findWinningSolutions(demoSet[1].time, demoSet[1].distance)).toEqual(demoSet[1].winSolutions)
    expect(functions.findWinningSolutions(demoSet[2].time, demoSet[2].distance)).toEqual(demoSet[2].winSolutions)
})

test('Test getScore', () => {
    expect(functions.getScore(demoSet)).toEqual(288)
})

test('Test getScore for puzzle', () => {
    expect(functions.getScore(puzzleSet)).toEqual(220320)
})