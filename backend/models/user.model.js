const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { type: String },
    avatar: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
},{
    versionKey: false
})

const userModel = mongoose.model('user', userSchema)

module.exports={userModel}

// {
//     "name": "Ashish",
//     "avatar": "https://i.pravatar.cc/300",
//     "email": "ashish@gmail.com",
//     "password": "ashish@321"
// }
