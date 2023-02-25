import Tour from "../Model/tour-model.js";
import { Buffer } from "buffer"

export const createTour = async (req,res) => {
    const tour = req.body;
    const { title, description, tags, image, imageType, name } = req.body;

    if (!image) {
        return res.status(400).json({ message: "Image file is required" });
    }

      // convert image data to buffer
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const bufferImage = Buffer.from(base64Data, 'base64');
        const contentType = imageType;
        const imageData = {
            data: bufferImage,
            contentType: contentType
        };
        // console.log(name);
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
        res.status(400).json({ message: error.message });
    }
};

export const getTours = async (req,res) => {
    try {
        const allTours = await Tour.find();
        return res.status(200).json({allTours});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
    }
}