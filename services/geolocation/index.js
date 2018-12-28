const User = require('../../models/Users');
const {calculateDistance} = require('./utils');

//finds nearest users according to latitude/longitude given
const findUsersNearby = async (locationData) => {
    let data = await User.find({});

    let nearbyUserData = [];

    data.map(user => {
        let {location} = user;
        let distance = calculateDistance(locationData,location);

        //need to check this
        if(distance < 15)
            nearbyUserData.push(user);
    })

    return nearbyUserData;
}

module.exports = {findUsersNearby};