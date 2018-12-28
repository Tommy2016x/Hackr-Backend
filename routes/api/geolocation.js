const router = require('express').Router();

const {findUsersNearby} = require('../../services/geolocation');

router.post('/findUsers',async (req,res) => {
    const {locationData} = req.body

    const data = await findUsersNearby(locationData);

    res.send(data);
})

module.exports = router;