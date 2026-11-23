const asyncHandler = require('express-async-handler');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Enter all feilds required')
    }

    const checkExistUser = await User.findOne({ email });

    if (checkExistUser) {
        res.status(400);
        throw new Error("User already exists")
    }

    const salt = await bycrypt.genSalt(10);
    const hashPassword = await bycrypt.hash(password, salt);

    const addUser = {
        name, email, password: hashPassword
    }

    const user = await User.create(addUser)

    if (user) {
        res.status(201).json({
            message: "User created successfuly",
            data: user
        })
    }
})


const userLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user && await bycrypt.compare(password, user.password)) {
        res.status(201).json({
            message: "User Login successfuly",
            data: user,
            token: genarateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user credentials")
    }
})


const getMe = asyncHandler(async (req, res, next) => {
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({
        message: "User get me successfuly",
        data: { _id, name, email}
    })
})

const genarateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}


module.exports = {
    registerUser,
    userLogin,
    getMe
} 