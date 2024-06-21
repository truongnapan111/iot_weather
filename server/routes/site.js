const express = require("express")
const router = express.Router()

const iotSchema = require("../models/Iot.js")
const controlHistorySchema = require("../models/Control.js")

router.get('/', async (req, res) => {
    const newestDataSensor = await iotSchema.find().limit(1).sort({$natural:-1})
        // console.log(newestDataSensor)
       res.json(newestDataSensor)
})
router.get('/abc', async (req, res) => {
    const totalOn = await controlHistorySchema.find()
        // console.log(newestDataSensor)
       res.send(totalOn)
})
router.get('/analysis', async (req, res) => {
    const newestDataSensor = await iotSchema.find().sort({$natural:-1})
        // console.log(newestDataSensor)
       res.json(newestDataSensor)
})

router.get('/history', async (req, res) => {
    const newestDataSensor = await controlHistorySchema.find().sort({$natural:-1})
        // console.log(newestDataSensor);
       res.json(newestDataSensor)
})

module.exports = router;