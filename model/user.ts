import mongoose, {Schema} from "mongoose";

export interface User{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    address?:string,
    phoneNumber:string,
    gender:string,
    birthDate:string,
    token?:string
}

const userSchema = new Schema<User>({
    firstName: { type: String, required: true },
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: { type: String, required: true },
    address: String,
    phoneNumber: {type: String, required: true},
    gender: {type: String, required: true},
    birthDate: {type: String, required: true},
    token:String,
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