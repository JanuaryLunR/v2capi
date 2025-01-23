const sequenceForLink = [
  'requestTime', 'mId', 'maId', 'userName', 'password',
  'txDetails.apiVersion', 'txDetails.requestId', 'txDetails.recurrentType', 'txDetails.perform3DS',
  'txDetails.orderData.orderId', 'txDetails.orderData.orderDescription', 'txDetails.orderData.amount', 'txDetails.orderData.currencyCode',
  'txDetails.statement', 'txDetails.cancelUrl', 'txDetails.returnUrl', 'txDetails.notificationUrl']

const sequenceForPayment = [
  "requestTime", "mId", "maId", "userName", "password",
  "txDetails.apiVersion", "txDetails.requestId", " txDetails.recurrentType", "txDetails.perform3DS",
  "txDetails.orderData.orderId", "txDetails.orderData.orderDescription", "txDetails.orderData.amount", "txDetails.orderData.currencyCode",

  // "txDetails.orderData.cc.ccNumber", "txDetails.orderData.cc.cardHolderName", "txDetails.orderData.cc.cvv", "txDetails.orderData.cc.expirationMonth", "txDetails.orderData.cc.expirationYear",

  "txDetails.orderData.billingAddress.firstName", "txDetails.orderData.billingAddress.lastName", "txDetails.orderData.billingAddress.address1", "txDetails.orderData.billingAddress.address2", "txDetails.orderData.billingAddress.city", "txDetails.orderData.billingAddress.zipcode",
  "txDetails.orderData.billingAddress.stateCode", "txDetails.orderData.billingAddress.countryCode", "txDetails.orderData.billingAddress.mobile", "txDetails.orderData.billingAddress.phone", "txDetails.orderData.billingAddress.email", "txDetails.orderData.billingAddress.fax",

  // "txDetails.orderData.shippingAddress.firstName", "txDetails.orderData.shippingAddress.lastName", "txDetails.orderData.shippingAddress.address1", "txDetails.orderData.shippingAddress.address2", "txDetails.orderData.shippingAddress.city", "txDetails.orderData.shippingAddress.zipcode",
  // "txDetails.orderData.shippingAddress.stateCode", "txDetails.orderData.shippingAddress.countryCode", "txDetails.orderData.shippingAddress.mobile", "txDetails.orderData.shippingAddress.phone", "txDetails.orderData.shippingAddress.email", "txDetails.orderData.shippingAddress.fax",

  // "txDetails.orderData.personalAddress.firstName", "txDetails.orderData.personalAddress.lastName", "txDetails.orderData.personalAddress.address1", "txDetails.orderData.personalAddress.address2", "txDetails.orderData.personalAddress.city", "txDetails.orderData.personalAddress.zipcode",
  // "txDetails.orderData.personalAddress.stateCode", "txDetails.orderData.personalAddress.countryCode", "txDetails.orderData.personalAddress.mobile", "txDetails.orderData.personalAddress.phone", "txDetails.orderData.personalAddress.email", "txDetails.orderData.personalAddress.fax",

  "txDetails.statement",
  // "txDetails.cancelUrl", "txDetails.returnUrl",
  "txDetails.notificationUrl"
];

module.exports = {
  sequenceForLink,
  sequenceForPayment
}