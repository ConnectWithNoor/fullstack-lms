import mongoose from "mongoose";
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const dbUri = process.env.MONGO_ATLAS_URI || "";

const connectDB = async () => {
	try {
		await mongoose.connect(dbUri);
		console.log("Mongodb database connected successfully");
	} catch (error) {
		console.error(`db connection failed:`, error.message);
		setTimeout(connectDB, 1000);
	}
};

export { connectDB };
