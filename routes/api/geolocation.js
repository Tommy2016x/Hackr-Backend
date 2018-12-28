const router = require('express').Router();

const {findUsersNearby} = require('../../services/geolocation');

router.post('/findUsers',async (req,res) => {
    const {latitude,longitude} = req.body;

    const data = await findUsersNearby(latitude,longitude);

    res.send(data);
})

module.exports = router;