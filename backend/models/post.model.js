const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    userID: { type: String },
    title: { type: String, required: true, maxlength: 100 },
    category: { type: String, required: true, enum: ['Development', 'Design', 'Innovation', 'Tutorial', 'Bussiness'] },
    content: { type: String, required: true },
    media: [{ type: String, required: true}],
    likes: [{ type: mongoose.Schema.Types.ObjectId,ref: 'User'}],
    
    comments: [{
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        created_at: { type: Date, default: Date.now },
    }],
    created_at: { type: Date, default: Date.now },
},{
    versionKey: false
})

const postModel = mongoose.model('post', postSchema)

module.exports={postModel}

// {
//     "title": "My title",
//     "category": "Design",
//     "content": "My content",
//     "media": "my media",
// }
