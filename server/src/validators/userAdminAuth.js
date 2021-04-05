const {check,validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
exports.SignUpValidation=[
    check('firstName').notEmpty().withMessage('firstName is Required.'),
    check('lastName').notEmpty().withMessage('lastName is Required.'),
    check('email').isEmail().withMessage('Enter Valid Email.'),
    check('password').isLength({min:6}).withMessage('Password must be atleast 6 characters.'),
]

exports.SignInValidation=[
    check('email').isEmail().withMessage('Enter Valid Email.'),
    check('password').notEmpty().withMessage('Please Enter Password')
]

exports.isRequestValid = (req,res,next)=>{
    const errors=validationResult(req)
    if(errors.array().length > 0){
        return res.status(400).json({errors:errors.array()[0].msg})
    }
    next()
}
     
exports.requireSignin=(req,res,next)=>{
    const token=req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token,process.env.JWT_KEY)
    req.user=user;
    next()
}