import Tour from "../Model/tour-model.js";

export const createTour = async (req,res) => {
    const tour = req.body;
    try {
        const newTour = await Tour.create({
           ...tour,
        });
        return res.status(201).json(newTour);
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