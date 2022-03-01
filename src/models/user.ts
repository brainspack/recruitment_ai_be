import { model, Schema, Document } from 'mongoose'
import { IUser } from '../interfaces'
type UserType = IUser & Document;
const UserSchema = new Schema({
    user_role_id: {
        type: Schema.Types.ObjectId,
        ref: 'UserRoles',
        required: true,
        alias: 'userRoleId',
    },
    first_name: {
        type: String,
        alias: 'firstName',
    },
    last_name: {
        type: String ,
        alias: 'lastName',
    },
    username: {
        type: String, 
    },
    email: {
        type: String, 
    },
    phone: {
        type: String, 
    },
    password: {
        type: String,
    },
    company_name: {
        type: String,
    },
    company_number: {
        type: String,
    },
    company_phone_number: {
        type: String,
    },
    street_address: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    zip_code: {
        type: String,
    },
    login_token: {
        type: String,
        alias: 'loginToken'
    },
    forgot_token: {
        type: String,
        alias: 'forgotToken'
    },
    forgot_token_exp: {
        type: Date,
        alias: 'forgotTokenExp'
    },
    verification_token: {
        type: String,
        alias: 'verificationToken'
    },
    last_login: {
        type: String,
        alias: 'lastLogin'
    },
    status: {
        type: Number,
    },
    date_created: {
        type: Date,
        alias: 'dateCreated',
    },
    date_updated: {
        type: Date,
        alias: 'dateUpdated',
    },
    is_deleted: {
        type: Number,
        alias: 'isDeleted'
    },
})
export const User = model<UserType>('user', UserSchema)