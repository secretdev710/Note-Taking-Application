import User from "../models/Auth.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// ROUTE 1: ceate a user using: POST "/api/auth/createuser". Doesn't require auth
export const createUser = async (req, res) => {
    let success = false;
    console.log("Registeration request received");
    //error: throws error -> bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    };
    //check whether the user with this email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
        }
        //hashing the password
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        //Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });

        // Define your secret key
        const jwt_secret_key = "secret";

        //returning the json web token
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwt_secret_key);

        // res.json(user);
        success = true;
        res.json({ success, authToken });
    }
    //catching errors
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
}

export const login = async (req, res) => {
    let success = false;
    //error: throws error -> bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        // Define your secret key
        const data = {
            user: {
                id: user.id
            }
        }
        const jwt_secret_key = "secret";
        //returning the json web token
        const authToken = jwt.sign(data, jwt_secret_key);
        const success = true;
        res.json({ success, authToken });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

export const getUserInfo = async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(req.user.id).select("name email created_at updated_at");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

export const getUser = async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(req.user.id).select("password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

export const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newuser = {};
        if (name) newuser.name = name;
        if (email) newuser.email = email;
        newuser.updated_at = Date.now();

        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user = await User.findByIdAndUpdate(req.user.id, { $set: newuser }, { new: true });
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}