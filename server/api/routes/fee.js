import express from "express";
import {
  createFees,
  updateFees,
  //cloneFeesStructure,
  deleteFees,
  getFees,
  getAllFees,
} from "../controllers/fees.js";

const router = express.Router();
//CREATE
router.post("/", createFees);
//UPDATE
router.put("/:id",  updateFees);
//CLONE
//router.put("/:id" , cloneFees);
//DELETE
router.delete("/:id" ,  deleteFees);

//GET
router.get("/:id", getFees);

//GET ALL
router.get("/", getAllFees);

export default router;