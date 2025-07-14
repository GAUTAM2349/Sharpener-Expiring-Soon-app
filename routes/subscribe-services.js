const express = require('express');
const { subscribePushService, unsubscribePushService } = require('../controllers/subscribe-services');

const router = express.Router();


router.post('/push-notification', subscribePushService);
router.post('/unsubscribe', unsubscribePushService);

module.exports = router;