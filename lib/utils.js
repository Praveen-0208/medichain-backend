const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 512 })


module.exports = {
    encryptText: (plainText) => {
        return key.encrypt(plainText, 'base64')
    },
    decryptText: (encryptedText) => {
        return key.decrypt(encryptedText, 'utf8')
    }
}