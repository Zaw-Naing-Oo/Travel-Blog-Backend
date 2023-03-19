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
     required: true,
    },
    creator: {
     type: String,
     required: true
    },
    tags: {
     type: [String],
     required: true
    },
    image: {
        data: Buffer,
        contentType: String,
        imageName: String,
       },
    // likeCount: {
    //  type: Number,
    //  default: 0,
    // }
    likes: {
        type: Map,
        of: Boolean,
      },
    // createdAt: { type: Date, default: Date.now }
 }, { timestamps: true });
 
 const Tour = mongoose.model("Tour", TourSchema);
 export default Tour;