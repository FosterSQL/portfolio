 import User from '../models/user.model.js';
 import jwt from 'jsonwebtoken';
 import { expressjwt } from "express-jwt";
 import config from './../../config/config.js'

const signin = async (req, res) => {
 try {
 let user = await User.findOne({ "email": req.body.email })
 if (!user)
 return res.status(401).json({ error: "User not found" })
 if (!user.authenticate(req.body.password)) {
 return res.status(401).send({ error: "Email and password don't match." })
 }
 const token = jwt.sign({ _id: user._id }, config.jwtSecret)
 res.cookie('t', token, { expire: new Date() + 9999 })
 return res.json({
 token,
 user: {
 _id: user._id,
 name: user.name,
 email: user.email
 }
 })
 } catch (err) {
 return res.status(401).json({ error: "Could not sign in" })
 }
 }

const signout = (req, res) => {
 res.clearCookie("t")
 return res.status(200).json({
 message: "signed out"
 })
 }

 const requireSignin = expressjwt({
 secret: config.jwtSecret,
 algorithms: ["HS256"],
 userProperty: 'auth',
 // accept token from Authorization header (Bearer ...) or from cookie 't'
 getToken: function fromHeaderOrCookie (req) {
	 if (!req) return null;
	 if (req.headers && req.headers.authorization) {
		 const parts = req.headers.authorization.split(' ');
		 if (parts.length === 2 && parts[0] === 'Bearer') return parts[1];
	 }
	 if (req.cookies && req.cookies.t) {
		 return req.cookies.t;
	 }
	 return null;
 }
 })

 const hasAuthorization = (req, res, next) => {
 const authorized = req.profile && req.auth
 && req.profile._id == req.auth._id
 if (!(authorized)) {
 return res.status(403).json({
 error: "User is not authorized"
 })
 }
 next()
 }
 export default { signin, signout, requireSignin, hasAuthorization }
