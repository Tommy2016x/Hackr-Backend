const User = require('../../models/Users');
const {calculateDistance} = require('./utils');

const findUsersNearby = async (locationData) => {
    let data = await User.find({});

    let nearbyUserData = [];

    data.map(user => {
        let {location} = user;
        let distance = calculateDistance(locationData,location);

        if(distance < 15)
            nearbyUserData.push(user);
    })

    return nearbyUserData;
}

module.exports = {findUsersNearby};