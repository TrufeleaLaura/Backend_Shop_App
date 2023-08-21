import {User} from "./interfaces";
import mongoose, {Schema} from "mongoose";

const userSchema = new Schema<User>({
    id: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    address: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    gender: {type: String, required: true},
    birthDate: {type: String, required: true},
});

const UserModel = mongoose.model<User>('user', userSchema);
export default UserModel;



// [{
//     "firstName": "user1",
//     "lastName": "user1",
//     "email": "user1@gm.com",
//     "password": "user1",
//     "address": "address1",
//     "phoneNumber": "0756",
//     "gender": "Female",
//     "birthDate": "2023-08-08"
// }]