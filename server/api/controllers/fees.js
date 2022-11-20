import Fees from "../models/Fees.js";
export const createFees = async (req,res,next)=>{
    const newFees = new Fees(req.body);
    try {
      const savedFees = await newFees.save()
      res.status(200).json(savedFees);
        } catch (err) {
          next(err);
        }
 };

export const updateFees = async (req,res,next)=>{
    try {
      const updatedFees = await Fees.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: "true"}
        
      )
      res.status(200).json(updatedFees);
    } catch (err) {
      next(err);
    }
  };

export const deleteFees = async (req,res,next)=>{
    try {
      await Fees.findByIdAndDelete(req.params.id);
      res.status(200).json("Fees structure has been deleted.");
    } catch (err) {
      next(err);
    }
};
    export const getFees = async (req,res,next)=>{
      try {
        const fees = await Fees.findById(req.params.id);
        res.status(200).json(Fees);
      } catch (err) {
        next(err);
      }
    };
    export const getAllFees = async (req,res,next)=>{
      try {
        const Fee = await Fees.find();
        res.status(200).json(Fee);
      } catch (err) {
        next(err);
      }
    };