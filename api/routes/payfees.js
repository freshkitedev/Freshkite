import express from "express";
import { payFees, updatepayFees } from "../controllers/payfees.js";

const router = express.Router();

router.post("/payfees/:id", payFees)
router.put("/payfees/:id", updatepayFees )

export default router