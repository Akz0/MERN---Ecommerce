const express = require("express");
const { initialData } = require("../../controllers/admin/initialData");
const routes=express.Router()

routes.get('/initialData',initialData)



exports.InitialDataRoutes=routes