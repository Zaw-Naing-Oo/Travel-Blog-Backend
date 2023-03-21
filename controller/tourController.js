import Tour from "../Model/tour-model.js";
import { Buffer } from "buffer"
import mongoose from "mongoose";

export const createTour = async (req,res) => {
    const tour = req.body;
    const { title, description, tags, image, imageType, name, imageName, userId } = req.body;
    if (!image) {
        return res.status(400).json({ message: "Image file is required" });
    }

      // convert image data to buffer
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const bufferImage = Buffer.from(base64Data, 'base64');
        const contentType = imageType;
        const imageData = {
            data: bufferImage,
            contentType: contentType,
            imageName : imageName || "" 
        };
        // console.log(imageData);
        // return;

    try {
        const newTour = await Tour.create({
            title,
            description,
            tags,
            image: imageData,
            name: name,
            creator: userId,
            likes: {},
        });
        return res.status(201).json({newTour});
    } catch (error) {
        // console.log(error);
        res.status(400).json({ message: "Server Error" });
    }
};

export const getTours = async (req,res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 4;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
    
        const allTours = await Tour.find().skip(startIndex).limit(limit);
    
        return res.status(200).json({
          page,
          totalPages: Math.ceil((await Tour.countDocuments()) / limit),
          allTours: allTours,
        });
      } catch (error) {
        // console.log(error);
        res.status(500).json({ message: "Server Error " });
      }
}

export const getTour = async (req,res) => {
    const { id } = req.params;
    try {
        const tour = await Tour.findById(id);
        // console.log(tour);
        return res.status(200).json({tour});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const getTourToEdit = async (req,res) => {
    const { id } = req.params;
    try {
        const tour = await Tour.findById(id);
        // console.log(tour);
        return res.status(200).json({tour});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}


export const getToursByUser = async (req,res) => {
    const { id } = req.params;
    // console.log(req.params);
    try {
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "User does not exist"})
        }

        const userTours = await Tour.find({ creator: id });
        // console.log(userTours);
        return res.status(200).json({userTours});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deleteTour = async (req,res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid ID" });
        }

        const deletedTour = await Tour.findByIdAndDelete(id);

        if (!deletedTour) {
            return res.status(404).json({ message: "Tour not found" });
        }
        return  res.status(200).json({ message: "Tour deleted successfully", tour: deletedTour });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const updateTour = async (req,res) => {
    const { id } = req.params;
    const { title, description, tags, image, imageType, imageName, } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid ID" });
        }
        if (!image) {
            return res.status(400).json({ message: "Image file is required" });
        }

         // convert image data to buffer
         const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
         const bufferImage = Buffer.from(base64Data, 'base64');
         const contentType = imageType;
         const imageData = {
            data: bufferImage,
            contentType: contentType,
            imageName : imageName || "" 
        };

        const updateTourData = {
            title,
            description,
            tags,
            _id: id,
            image: imageData
        }

        const updatedTour = await Tour.findByIdAndUpdate(id, updateTourData, { new: true });
        return res.status(200).json({ message: "Updated Successfully", tour: updatedTour });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getToursBySearch = async (req,res) => {
    const { searchQuery } = req.query;
    console.log(searchQuery);
    try {
        const title = new RegExp(searchQuery, "i");
        const searchedTour = await Tour.find({ title });
        console.log(searchedTour);
        return res.status(200).json(searchedTour);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Something Went Wrong" });
    }
}

export const likeTour = async (req,res) => {
    const { id: tourId } = req.params;
    const { userId } = req.body;
    try {

        if(!mongoose.Types.ObjectId.isValid(tourId)) {
            return res.status(404).json({ message: "User does not exist"})
        }

        const tourPost = await Tour.findById(tourId);
        if (!tourPost) {
            return res.status(404).json({ message: "Post does not exist" });
        }
        const isLiked = tourPost.likes.get(userId);

        if(isLiked) {
           tourPost.likes.delete(userId)
        } else {
           tourPost.likes.set(userId, true)
        }

        const updatedTour = await Tour.findByIdAndUpdate(
            tourId,
            { likes: tourPost.likes },
            { new: true }
        )

        return res.status(200).json(updatedTour);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const createComment = async (req,res) => {
    const { id: tourId } = req.params;
    const { user, comment } = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(tourId)) {
            return res.status(404).json({ message: "There is no post for that ID"})
        }
        const newComment = {
            user: user._id,
            userName: user.name,
            comment : comment,
            date: new Date(),
        };
        const tourPost = await Tour.findByIdAndUpdate(
            tourId,
            { $push: { comments: newComment }},
            { new: true }
        );
       
        return res.status(201).json(tourPost);
    } catch (error) {
        return res.status(500).json("Internal server error")
    }
}