const express = require("express");
const { CreatePage } = require("../../controllers/admin/pageController");
const { UploadsMiddleware } = require("../../validators/commonMiddlewares");
const { requireSignin, validateAdmin } = require("../../validators/userAdminAuth");

const routes=express.Router()

routes.post('/page/create',requireSignin,validateAdmin,UploadsMiddleware.fields([
    {name:'banners'},
    {name:'products'}
]),CreatePage)



exports.PageRoutes=routes