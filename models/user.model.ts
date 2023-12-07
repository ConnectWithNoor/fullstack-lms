import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema: Schema<IUser> = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please enter a name"]
		},
		email: {
			type: String,
			required: [true, "Please enter an email"],
			validate: {
				validator: (value: string) => emailRegexPattern.test(value),
				message: "Please enter a valid email"
			},
			unique: true
		},
		password: {
			type: String,
			required: [true, "Please enter a password"],
			minlength: [6, "Password must be at least 6 characters"],
			select: false
		},
		avatar: {
			publicId: String,
			url: String
		},
		isVerified: {
			type: Boolean,
			default: false
		},
		role: {
			type: String,
			default: "user"
		},
		courses: [
			{
				courseId: String
			}
		]
	},
	{ timestamps: true }
);

// Hash Password

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) next();

	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// Compare Password
userSchema.methods.comparePassword = async function (
	password: string
): Promise<Boolean> {
	return await bcrypt.compare(password, this.password);
};
