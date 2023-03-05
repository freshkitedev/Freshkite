import express from "express";
import { payFees} from "../controllers/payfees.js";

const router = express.Router();

router.post("/payfees/", payFees)


export default router