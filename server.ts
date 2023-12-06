import { app } from "./app";
import { connectDB } from "./utils/db";
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// create server

app.listen(process.env.SERVER_PORT, () => {
	console.log(`Server is listening on port ${process.env.SERVER_PORT}`);
	connectDB();
});
