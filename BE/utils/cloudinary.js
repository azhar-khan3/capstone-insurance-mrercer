const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'dd6rkfwjr',
  api_key: '844285553352693',
  api_secret:  'cWeDtsVBucD3sr4huiOff0p-x24',
  secure: false,
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

module.exports = cloudinary;