import Tour from "../Model/tour-model.js";
import { Buffer } from "buffer"
import mongoose from "mongoose";

export const createTour = async (req,res) => {
    const tour = req.body;
    const { title, description, tags, image, imageType, name, imageName } = req.body;
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
            creator: req?.userId,
        });
        return res.status(201).json({newTour});
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Server Error" });
    }
};

export const getTours = async (req,res) => {
    try {
        const allTours = await Tour.find();
        return res.status(200).json({allTours});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error "});
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
            imageData,
        }

        const updatedTour = await Tour.findByIdAndUpdate(id, updateTourData, { new: true });
        return res.status(200).json({ message: "Updated Successfully", tour: updatedTour });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}