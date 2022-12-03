const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const publishedListSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        ownerName: { type: String, required: true },
        songs: {
            type: [{
                title: String,
                artist: String,
                youTubeId: String
            }], required: true
        },
        likes: { type: [{ user: String }], required: true },
        dislikes: { type: [{ user: String }], required: true },
        comments: {
            type: [{
                text: String,
                author: String,
                date: Date
            }], required: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Published', publishedListSchema)
