import { Document, model, Schema, CallbackError } from "mongoose";

export enum UserRole {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: UserRole;
    contactNumber: string;
    profilePic: string;
    bio: string;
    university: string;
    skills: string[];
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },

        contactNumber: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.STUDENT,
        },

        profilePic: {
            type: String,
            default: "",
        },

        bio: {
            type: String,
            default: "",
        },

        university: {
            type: String,
            default: "",
        },

        skills: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
        // let BE to connect DB before Mongoose starts buffering commands, otherwise we get "MongooseError: Operation users.insertOne() buffering timed out after 10000ms" when DB connection is slow
        bufferCommands: true,

    }
);

export const UserModel = model<IUser>("users", userSchema);