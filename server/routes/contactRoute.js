import express from "express";
import { sendMessage, subscribe } from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/", sendMessage);
contactRouter.post("/subscribe", subscribe);

export default contactRouter;
