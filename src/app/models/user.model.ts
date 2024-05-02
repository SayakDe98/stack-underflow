import mongoose from "mongoose";
import { UserType } from "../../../types/user";
import { userValidator } from "../utils/validators/user.validator";

const userSchema = new mongoose.Schema({
     firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxLength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxLength: 255
    },
    contactNumber: {
        type: String,
        required: true,
        length: 10,
    }, 
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

const validateUser = (user: UserType) => userValidator.parse(user);


export default { User, validateUser } ;