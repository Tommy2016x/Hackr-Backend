const mongoose = require('mongoose');

const {Schema} = mongoose;

//User schema
const UsersSchema = new Schema({
    email: String,
    password: String,
    username: String,
    profile: {photos: [],bio: String,skills: []},
    matches: [],
    hackathon: String,
    team: String
});

module.exports = mongoose.model('Users', UsersSchema);