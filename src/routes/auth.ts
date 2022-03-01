import { AuthController, AdminController } from  '../controllers'
import passport from 'passport'
import {
    registerValidation,
    loginValidation,
    usernameValidation,
    socialSignUpValidation,
    socialUserValidation,
    forgotPasswordValidation,
    resetPasswordValidation,
    emailValidation
} from '../validations'
import express = require('express')
const router = express.Router()
/* auth routes listing. */
router.post('/register', registerValidation, AuthController.register)
router.post('/login', loginValidation, AuthController.login)
router.post('/logout', passport.authenticate('jwt', { session: false, failWithError: true }), AuthController.logout)
router.post('/username-validate', usernameValidation, AuthController.validateUsername)
router.post('/email-validate', emailValidation, AuthController.validateEmail)
router.post('/forgot-password', forgotPasswordValidation, AuthController.forgotPassword)
router.post('/reset-password', resetPasswordValidation, AuthController.resetPassword)
router.post('/verify-sign-up', AuthController.verifySignUpLink)
export default router
