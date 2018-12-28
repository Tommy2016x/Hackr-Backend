const calculateXCoordinate = (latitude,longitude) => {
    return (6371 * (Math.cos(latitude)) * (Math.cos(longitude)));
}

const calculateYCoordinate = (latitude,longitude) => {
    return (6371 * (Math.cos(latitude)) * (Math.sin(longitude)));
}

const calculateDistance = (coordinatesA,coordinatesB) => {
    const latA = coordinatesA.latitude;
    const longA = coordinatesA.longitude;

    const latB = coordinatesB.latitude;
    const longB = coordinatesB.longitude;

    const x1 = calculateXCoordinate(latA,longA);
    const y1 = calculateYCoordinate(latA,longA);

    const x2 = calculateXCoordinate(latB,longB);
    const y2 = calculateYCoordinate(latB,longB);

    const xDiff = x2-x1;
    const yDiff = y2-y1;

    return (Math.sqrt((xDiff * xDiff)) + (yDiff * yDiff));
}

module.exports = {calculateDistance}