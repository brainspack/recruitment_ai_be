import {IBaseSchema} from './'
export interface IUser extends IBaseSchema  {
    _id: string
    userRoleId: Record<string, unknown>
    subscriptionId?: number
    firstName?: string
    lastName?: string
    username: string
    email: string
    password: string
    loginToken?: string
    forgotToken?: string
    verificationToken?: string
    lastLogin?: string
    status: number
}