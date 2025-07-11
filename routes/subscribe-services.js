const express = require('express');
const { subscribePushService } = require('../controllers/subscribe-services');

const router = express.Router();


router.post('/push-notification',(req,res,next)=>{console.log('reached subscription router'); next();}, subscribePushService);

module.exports = router;