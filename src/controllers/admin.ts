import {  IUser, IUserRole } from 'src/interfaces'
import { Request, Response } from 'express'
import { User, UserRoles } from '@schema'
import bcrypt from 'bcryptjs'
import moment from 'moment'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import randomize from 'randomatic'
import { isNil } from 'lodash'
import logger from '@utilities/logger'
import { __ } from 'i18n'
import * as mongoose from 'mongoose'
/**
 * @category Controllers
 * @classdesc Admin controller
 */
class Admin {

    private toObjectId(_id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(_id)
    }

    private  generatePassword = () =>  {
        const length = 8,
            charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$^&*()'
        let retVal = ''
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n))
        }
        return retVal
    }

    /**
    * @description getProfile
    */
    public getProfile = async (req: Request, res: Response) => {
        const {email} = req.body
        const userData: IUser | null = await User.findOne({email: email}).exec()
        return res.success({message: __('success.welcome'), user: {username: userData!.username, email: userData!.email, firstname: userData!.firstName, lastname: userData!.lastName}}, 'welcome')
        //return res.success({message: __('success.welcome')})
    };
    /**
    * @description getClients
    */
    public getClients = async (req: Request, res: Response) => {
        console.log('here  now')
        const roleData = await UserRoles.findOne({role_name: 'client'}).exec()
        if(roleData) {
            console.log(typeof roleData._id)
            const userData = await User.find({user_role_id: roleData._id}).exec()
            return res.success({message: __('success.welcome'), clients: userData}, 'welcome')

        } else {
            return res.badRequest(req.__('errors.userRoleNotFound'), 'userRoleNotFound')
        }
        //return res.success({message: __('success.welcome')})
    };

    /**
     * @description New Client Creation
     * @param req 
     * @param res 
     * @param  {String} req.body.email email of user
     * @param  {String} req.body.password password of user
     * @param  {String} req.body.username user name
     */
    public createClient  = async (req: Request, res: Response) => {
        const token = randomize('A1', 32)
        //const activationLink = process.env.CLIENT_APP_URL + 'verify-sign-up?token=' + token
        const roleType = 'client'
        const {first_name, last_name, email, phone_number, company_name, company_number, company_phone_number, street_address, city, zip_code, country} = req.body
        const password = this.generatePassword()
        const roleData: IUserRole | null = await UserRoles.findOne({role_name: roleType}).exec()
        if (isNil(roleData)) { return res.badRequest(req.__('errors.userRoleNotFound'), 'userRoleNotFound') }
        return new User({
            userRoleId: roleData._id,
            firstName: first_name || '',
            lastName: last_name || '',
            email,
            phone: phone_number,
            company_name,
            company_number,
            company_phone_number,
            city,
            street_address,
            zip_code,
            country,
            password: bcrypt.hashSync(password),
            status: 1,
            verificationToken: token,
            dateCreated: moment().toDate(),
            dateUpdated: moment().toDate(),
            isDeleted: 0,
        }).save()
            .then((user: IUser) => {
                console.log(user)
                /*const mailOptions = {
                    to: email,
                    subject: req.__('emails.welcomeEmailSubject'),
                    template: 'sign-up',
                    data: {
                        name: username || email,
                        link: activationLink,
                    },
                }
                sendEmail(mailOptions)
                    .catch((err) => {
                        logger.info(err)
                    })
                new Promise(() => {
                    return this.saveCustomerToMagento(user)
                }).catch((err) => {
                    logger.info(err)
                })*/
                return res.success({}, 'clientCreatedSuccessfully')
            })
            .catch((err) => {
                return res.error(err, 'internalServerError')
            })
        
    };
    
}

export default new Admin()
