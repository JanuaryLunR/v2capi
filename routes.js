const express = require('express');
const router = express.Router();
const { getHello,
  purchase,
  createReusablePaymentLink } = require('./controllers');

router.get('/hello', getHello);

router.post('/payin', purchase);

router.post('/createLink', createReusablePaymentLink);

router.post('/error', express.json(), (req, res) => {
  const data = req.body;
  console.log('Received error:', data);
  res.status(200).send('Error received');
});

router.post('/return', express.json(), (req, res) => {
  const data = req.body;
  console.log('Received return:', data);
  res.status(200).send('return received');
});

router.post('/notification', express.json(), (req, res) => {
  const data = req.body;
  console.log('Received notification:', data);
  res.status(200).send('Notification received');
});

module.exports = router;
