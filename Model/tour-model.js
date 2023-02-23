import mongoose from "mongoose"
const Schema = mongoose.Schema;

const TourSchema = new Schema({
    title: {
     type: String,
     required: true
    },
    description: {
     type: String,
     required: true
    },
    name: {
     type: String,
     required: false
    },
    creator: {
     type: String,
     required: true
    },
    tags: {
     type: [String],
     required: false
    },
    // image: {
    //  type: String,
    //  default: ""
    // },
    image: {
        data: Buffer,
        contentType: String,
       },
    likeCount: {
     type: Number,
     default: 0,
    }
    // createdAt: { type: Date, default: Date.now }
 }, { timestamps: true });
 
 const Tour = mongoose.model("Tour", TourSchema);
 export default Tour;