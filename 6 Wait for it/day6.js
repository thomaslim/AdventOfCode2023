module.exports = {
    getDistanceForDuration,
    findWinningSolutions,
    getScore,
}

function getDistanceForDuration(raceDuration, buttonDuration) {
    const speed = buttonDuration
    const travelDuration = raceDuration-buttonDuration
    const distance = speed * travelDuration
    return distance
}

function findWinningSolutions(raceDuration, raceRecord) {
    let winningSolutionsCounter = 0
    for (button = 0; button<raceDuration; button++) {
        const distance = getDistanceForDuration(raceDuration, button)
        const test = distance > raceRecord
        winningSolutionsCounter = distance > raceRecord ? winningSolutionsCounter+1 : winningSolutionsCounter
    }
    return winningSolutionsCounter
}

function getScore(races){
    return races.reduce((acc, race) => {
        const raceResult = findWinningSolutions(race.time, race.distance)
        return acc * raceResult
    }, 1)
} 