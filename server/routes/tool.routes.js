import express from 'express';
import { createTool, deleteTool, getAllTools, getToolDetails, updateTool } from '../controllers/toolController.js';

const router = express.Router();

router.route("/").get(getAllTools);
router.route("/:id").get(getToolDetails);
router.route("/").post(createTool);
router.route("/:id").patch(updateTool);
router.route("/:id").delete(deleteTool);

export default router