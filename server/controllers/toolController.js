import mongoose from "mongoose";
import Tool from '../DB/models/tool.js';
import User from '../DB/models/user.js';

import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllTools = async (req, res) => {
    const {
        _end,
        _order,
        _start,
        _sort,
        title_like = "",
        description_like = "",
        toolType = ""
    } = req.query;

    const query = {};
    
    if (toolType !== "") {
        query.toolType = toolType;
    }

    if (title_like) {
        query.title = { $regex: title_like, $options: 'i' };
    }

    if (description_like) {
        query.description = { $regex: description_like, $options: 'i' };
    }

    try {
        const count = await Tool.countDocuments({ query });

        const tools = await Tool.find(query)
            .limit(50)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(tools);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getToolDetails = async (req, res) => {
    const { id } = req.params;
    const toolExists = await Tool.findOne({ _id: id }).populate(
        "creator",
    );

    if (toolExists) {
        res.status(200).json(toolExists);
    } else {
        res.status(404).json({ message: "Tool not found" });
    }
};

const createTool = async (req, res) => {
    try {
        const {
            title,
            description,
            offers,
            link,
            trending,
            toolType,
            price,
            photo,
            email,
        } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();
        
        const user = await User.findOne({ email }).session(session);
        
        if (!user) throw new Error("User not found");

        if (user.roles !== 'editor') return res.status(400).json({ message: "Sorry, you need official permissions" });
        
        const photoUrl = await cloudinary.uploader.upload(photo);
        
        const newTool = await Tool.create({
            title,
            description,
            toolType,
            offers,
            link,
            trending,
            price,
            photo: photoUrl.url,
            creator: user._id,
        });

        user.allTools.push(newTool._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Tool created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTool = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, toolType, offers, link, trending, price, photo } = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Tool.findByIdAndUpdate({ _id: id}, {
            title,
            description,
            toolType,
            offers,
            link,
            trending,
            price,
            photo: photoUrl.url || photo
        });

        res.status(200).json({ message: "Tool updated successfully"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteTool = async (req, res) => {
    try {
        const { id } = req.params;

        const toolToDelete = await Tool.findById({ _id: id }).populate('creator');

        if (!toolToDelete) throw new Error("Tool not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        toolToDelete.deleteOne({session});
        toolToDelete.creator.allTools.pull(toolToDelete);

        await toolToDelete.creator.save({session});
        await session.commitTransaction();

        res.status(200).json({ message: 'Tool Deleted Successfully'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export {
    getAllTools,
    getToolDetails,
    createTool,
    updateTool,
    deleteTool
};