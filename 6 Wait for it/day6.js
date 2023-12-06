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

    const halfTime = Math.ceil(raceDuration/2)
    let cursor = 0
    while (true) {
        const distance = getDistanceForDuration(raceDuration, halfTime+cursor)
        if ( distance <= raceRecord) break
        if (raceDuration % 2 == 0 && cursor == 0) {
            winningSolutionsCounter =  winningSolutionsCounter+1
        } else {
            winningSolutionsCounter =  winningSolutionsCounter+2  
        }
        cursor = cursor+1  
    }

    return winningSolutionsCounter
}

function getScore(races){
    return races.reduce((acc, race) => {
        const raceResult = findWinningSolutions(race.time, race.distance)
        return acc * raceResult
    }, 1)
} 