
const demoSet = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

const demoSet2 = `12.......*..
+.........34
.......-12..
..78........
..*....60...
78.........9
.5.....23..$
8...90*12...
............
2.2......12.
.*.........*
1.1..503+.56`

const fs = require('fs');
const inputSet = fs.readFileSync('3 Gear Ratios/input.txt').toString('utf-8').trim();

test('Separate lines', () => {
    expect(separateLines(demoSet).length).toStrictEqual(10)
})

test('isASymbol', () => {
    expect(checkIfIsSymbol('.')).toBe(false)
    expect(checkIfIsSymbol('4')).toBe(false)
    expect(checkIfIsSymbol('a')).toBe(false)
    expect(checkIfIsSymbol('*')).toBe(true)
    expect(checkIfIsSymbol('#')).toBe(true)
    expect(checkIfIsSymbol('+')).toBe(true)
    expect(checkIfIsSymbol('$')).toBe(true)
})

test ('parseFile', () => {
    expect(parseInputFile(demoSet)).toEqual(4361)
    // expect(parseInputFile(demoSet2)).toEqual(925)
    expect(parseInputFile(inputSet)).toEqual(535078)
})


test('isNumberNextToASymbol', () => {
    expect(isNumberNextToASymbol(demoSet, '467', 0)).toEqual(true)
    expect(isNumberNextToASymbol(demoSet, '617', 4)).toEqual(true)
    expect(isNumberNextToASymbol(demoSet, '35', 2)).toEqual(true)
    expect(isNumberNextToASymbol(demoSet, '633', 2)).toEqual(true)
    expect(isNumberNextToASymbol(demoSet, '592', 6)).toEqual(true)
    expect(isNumberNextToASymbol(demoSet, '755', 7)).toEqual(true)
    expect(isNumberNextToASymbol(demoSet, '664', 9)).toEqual(true)
    expect(isNumberNextToASymbol(demoSet, '598', 9)).toEqual(true)
    expect(isNumberNextToASymbol(demoSet, '114', 0)).toEqual(false)
    expect(isNumberNextToASymbol(demoSet, '58', 5)).toEqual(false)
})

test('Find position in line', () => {
    expect(getPositionInString('467', '467..114..')).toEqual(0)
    expect(getPositionInString('114', '467..114..')).toEqual(5)
})


function separateLines(input){
    return input.split('\n')//.filter((item) => item != '')
}

function getPositionInString(input, line) {
    return line.indexOf(input)
}

function checkIfIsSymbol(value) {
    return /[-!$%@#^&*()_+|~=`{}\[\]:";'<>?,\/]/.test(value)
}

function isNumberNextToASymbol(dataSet, input, lineId, position = undefined) {
    const lines = separateLines(dataSet)
    const inputPosition = position ? position : getPositionInString(input, lines[lineId])
    let isCloseToASymbol = false

    // check if symbol before or after on the same line
    if (checkIfIsSymbol(lines[lineId][inputPosition - 1])) {
    isCloseToASymbol = true
    return isCloseToASymbol
    }
    if (checkIfIsSymbol(lines[lineId][inputPosition + input.length])) {
        isCloseToASymbol = true
        return isCloseToASymbol
    }

    for (cursor = inputPosition-1; cursor <= inputPosition + input.length; cursor++ ) {
        // Check previous line
        if (lineId > 0) {
            if( checkIfIsSymbol(lines[lineId-1][cursor]) ) {
                isCloseToASymbol = true
                return isCloseToASymbol 
            }
        }

        // Check following line
        if (lineId < lines.length-1) {
            if( checkIfIsSymbol(lines[lineId+1][cursor]) ) {
                isCloseToASymbol = true
                return isCloseToASymbol 
            }
        }
        
       
    }

    return isCloseToASymbol
}

function parseInputFile(dataSet) {
    const lines = separateLines(dataSet)
    const selectedNumbers = []
    lines.forEach((element, index) => {
        const numbers = [...element.matchAll(/\d+/g)]
        if (!numbers || !numbers.length) return
        const selectedNumbersForLine = numbers.filter(number => isNumberNextToASymbol(dataSet, number[0], index, number.index ))
        selectedNumbers.push(selectedNumbersForLine)
    });
    const selectedNumbersFlat = selectedNumbers.flat()

    const result = selectedNumbersFlat.reduce((acc, value) => {
        return acc + Number(value)
    }, 0)
    
    return result
}