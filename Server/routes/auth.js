import express from 'express'
import { body } from 'express-validator';
import fetchUser from '../middleware/fetchUser.js';
import { createUser, login, getUser, getUserInfo, updateUser } from '../controllers/Auth.js';
const router = express.Router();


//ROUTE 1:ceate a user using: POST "/api/auth/createuser". Doesn"t require auth

router.post("/createuser", [
  body("email", "Enter a valid email").isEmail(),
  body("name", "Enter a valid name").isLength({ min: 3 }),
  body("password", "Minimum length of password should be 5").isLength({ min: 5 })
], createUser);

//ROUTE 2: autheticate a user using: POST "/api/auth/login". No login required

router.post("/login", [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password Cannot be blank").exists()
], login);

//ROUTE 3: Get loggedin user details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchUser, getUser);

router.post("/getuserinfo", fetchUser, getUserInfo);

router.post("/updateuser", fetchUser, updateUser);

export default router;