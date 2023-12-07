import { ObjectId, Document } from "mongoose";

type UserRole = "user";

interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	avatar: {
		publicId: string;
		url: string;
	};
	role: UserRole;
	isVerified: boolean;
	courses: [{ courseId: ObjectId }];
	comparePassword: (password: string) => Promise<boolean>;
}
