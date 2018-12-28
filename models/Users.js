const mongoose = require('mongoose');

const {Schema} = mongoose;

//User schema
const UsersSchema = new Schema({
    email: String,
    password: String,
    username: String,
    profile: {photos: [],bio: String,skills: []},
    matches: [],
    location: {latitude: Number,longitude: Number}
});

module.exports = mongoose.model('Users', UsersSchema);