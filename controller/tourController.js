import Tour from "../Model/tour-model.js";
import { Buffer } from "buffer"

export const createTour = async (req,res) => {
    const tour = req.body;
    const { title, description, tags, image } = req.body;
    console.log(req.userId);

    if (!image) {
        return res.status(400).json({ message: "Image file is required" });
      }

      // convert image data to buffer
      const imageData = Buffer.from(image.split(",")[1], "base64");
    try {
        const newTour = await Tour.create({
            title,
            description,
            tags,
            image: imageData,
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
        res.status(200).json({allTours});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}