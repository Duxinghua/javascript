var WAValidator = require('wallet-address-validator');
 
var valid = WAValidator.validate('DL7RyLxMK7oBuAmpq8AaSFbGD9r2NtSTzy', 'DOGE');
if(valid)
    console.log('This is a valid address');
else
    console.log('Address INVALID');