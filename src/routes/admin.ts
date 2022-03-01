import { AdminController } from  '../controllers'
import passport from 'passport'
import express = require('express')
const router = express.Router()
/* auth routes listing. */
router.post('/profile', passport.authenticate('jwt', { session: false, failWithError: true }), AdminController.getProfile)
router.post('/create-client', passport.authenticate('jwt', { session: false, failWithError: true }), AdminController.createClient)
router.get('/get-clients', passport.authenticate('jwt', { session: false, failWithError: true }), AdminController.getClients)

export default router
