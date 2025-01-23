const axios = require('axios');
const { processObject,
  getFormattedDate, } = require('./utils');

const { encryptToByteArray } = require('./newutil')

const { encryptDataInBase64,
  hashDataInBase64 } = require('./newnewutil')

const { sequenceForLink, sequenceForPayment } = require('./constants')

const purchase = async (req, res) => {
  const secretKey = 'da77f6eafb24407f';
  try {
    const rawRequestData = {
      // requestTime: getFormattedDate(),
      // lang: "en",
      paymentMode: "V2C",
      metaData: {
        // merchantUserId: "85f5f5f3-6662-4804-bbc2-ad50d984dd7e",
        merchantUserId: "c8955bd1-357c-410f-bbd3-9ffd7e2a235a",
        bankName: "СБП"
      },
      remoteIP: "127.0.0.1",
      mId: hashDataInBase64('9166ecc3-545a-40c8-ac10-2c35801b4624'),
      maId: hashDataInBase64('efcb34fc-665e-426a-9a89-7bc6b3a0c096'),
      userName: encryptDataInBase64('dbf14c5bc33b41e5896cfa7505308dd8', secretKey),
      password: encryptDataInBase64('95c001557c4e467abcfda98b76db3793', secretKey),
      // signature: "WzLXEJdR4vSjCV0KVRQ5MAzwoP4/7KTX8Xk9r+j4Ix8=",
      txDetails: {
        apiVersion: "1.0.1",
        requestId: `req_${Date.now()}`,
        // recurrentType: 1,
        // perform3DS: "0",
        orderData: {
          orderId: `order_${Date.now()}`,
          orderDescription: "Dell Vostro N series-1520423551668",
          amount: "10",
          currencyCode: "RUB",
          billingAddress: {
            firstName: "test",
            lastName: "test",
            address1: "address1",
            // address2: "address2",
            city: "Pune",
            // zipcode: "12345",
            // stateCode: "MH",
            // countryCode: "IN",
            mobile: "1234567890",
            phone: "12025550178",
            email: "test_k@gmail.com",
            fax: "+49 9131 23 28732"
          },
        },
        notificationUrl: "http://localhost:3000/api/notiifcation",
        statement: "test",
      }
    }

    const coString = processObject(rawRequestData, sequenceForPayment)

    const sign = encryptToByteArray(coString, secretKey)

    rawRequestData.signature = sign.signature

    const apiResponse = await axios.post(
      'https://sandbox.certus.finance/FE/rest/tx/sync/purchase', rawRequestData,
      {
        headers: { 'Content-Type': 'application/json' },
        maxRedirects: 5,
      });


    const result = apiResponse.data;

    console.log('apiResponse:', result)
    console.log('errors:', result.result.error)

    res.json({ success: true, message: 'Success!', response: result });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something goes wrong 500.' });
  }
}

/* URL - https://api.quicktransfernest.xyz/

Merchant Id - 459159e8-1ff3-4f79-b0c1-19f8302a0424
Merchant Account Id - 0110679b-eb6b-476a-a0d0-560cb5ab0448
Merchant Account Key - e9c187f0561e85e0
Merchant Account User Name - account1
Merchant Account Password - account1
 */

const createReusablePaymentLink = async (req, res) => {
  try {
    //prod 
    const apiUrl = 'https://api.quicktransfernest.xyz/FE/rest/tx/sync/purchase/r/createPaymentLink';
    const secretKey = 'e9c187f0561e85e0';

    //test
    // const apiUrl = 'https://sandbox.certus.finance/FE/rest/tx/sync/purchase/r/createPaymentLink';
    // const secretKey = 'da77f6eafb24407f'; 

    const rawRequestData =
    {
      requestTime: getFormattedDate(),
      lang: "en",
      paymentMode: "V2C",
      metaData: {
        merchantUserId: "8765432109",
        bankName: "СБП"
      },
      remoteIP: "127.0.0.1",

      //prod
      mId: hashDataInBase64('459159e8-1ff3-4f79-b0c1-19f8302a0424'),
      maId: hashDataInBase64('0110679b-eb6b-476a-a0d0-560cb5ab0448'),
      userName: encryptDataInBase64('account1', secretKey),
      password: encryptDataInBase64('account1', secretKey),

      //test
      // mId: hashDataInBase64('9166ecc3-545a-40c8-ac10-2c35801b4624'), 
      // maId: hashDataInBase64('efcb34fc-665e-426a-9a89-7bc6b3a0c096'),
      // userName: encryptDataInBase64('dbf14c5bc33b41e5896cfa7505308dd8', secretKey),
      // password: encryptDataInBase64('95c001557c4e467abcfda98b76db3793', secretKey),

      txDetails: {
        apiVersion: "1.0.1",
        requestId: `req_${Date.now()}`,
        recurrentType: "1",
        perform3DS: "0",
        orderData: {
          orderId: `order_${Date.now()}`,
          orderDescription: "Dell Vostro N series-1724998488317",
          amount: "100",
          currencyCode: "RUB"
        },
        cancelUrl: "http://localhost:3000/api/error",
        returnUrl: "http://localhost:3000/api/return",
        notificationUrl: "http://localhost:3000/api/notiifcation",
        statement: "test"
      }
    }

    // const apiraw =
    // {
    //   requestTime: "2024-08-30 06:14:59",
    //   // signature: "oECk6BOxx5QmLErzoqZ+Xu+joDYLdzGQumLZBepdMqE=",
    //   lang: "en",
    //   paymentMode: "V2C",
    //   metaData: {
    //     merchantUserId: "8765432109",
    //     bankName: "СБП"
    //   },
    //   remoteIP: "127.0.0.1",
    //   mId: "whTjpOxJvEIHuKQTxap+i1mYou2Q6+RfFAAcCXMEWko=",
    //   maId: "6DIUGwlk9aqGEnUlVhqUpyI3+wUmH+3/T0hKXo/BcGM=",
    //   userName: "/MdL25vyvRrsFqYYImU/pTVjjBVmKmG2KH4n4hyzmFJeE32Un258N1gAirJClT+6",
    //   password: "HDHkxrLvf6cvqRz32uGJL2TuV5C4LQCynopfGv0K0oVeE32Un258N1gAirJClT+6",
    //   txDetails: {
    //     apiVersion: "1.0.1",
    //     requestId: "DEMO_REQUEST1724998488317",
    //     recurrentType: "1",
    //     perform3DS: "0",
    //     orderData: {
    //       orderId: "DEMO_ORDER1724998488317",
    //       orderDescription: "Dell Vostro N series-1724998488317",
    //       amount: "100",
    //       currencyCode: "RUB"
    //     },
    //     cancelUrl: "http://localhost:8080/FE/error.jsp",
    //     returnUrl: "http://localhost:8080/FE/return.jsp",
    //     notificationUrl: "http://localhost:8080/FE/notiifcation.jsp",
    //     statement: "test"
    //   }
    // }

    const coString = processObject(rawRequestData, sequenceForLink)

    const sign = encryptToByteArray(coString, secretKey)

    rawRequestData.signature = sign.signature

    const response = await axios.post(
      apiUrl,
      rawRequestData,
      {
        headers: { 'Content-Type': 'application/json' },
        maxRedirects: 5,
      })

    console.log('Response:', response.data);
    console.log('errors:', response.data.result.error)
    res.json({ success: true, message: 'Success!', response: response.data });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Something goes wrong 500.' });
  }
};

const getHello = (req, res) => {
  res.json({ message: 'Hello, world!' });
};


module.exports = {
  getHello,
  purchase,
  createReusablePaymentLink,
};
