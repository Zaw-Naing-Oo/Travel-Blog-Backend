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
    likes: {
        type: Map,
        of: Boolean,
      },
    comments: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          required: true,
        },
        userName:{
          type:String,
          required:true
        },
        comment:{
          type:String,
          required:true
        },
        date: {
          type: Date,
          default: Date.now,
          required: true
        }
      }
    ],
 }, { timestamps: true });
 
 const Tour = mongoose.model("Tour", TourSchema);
 export default Tour;