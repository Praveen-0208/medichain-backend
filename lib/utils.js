const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 512 })
// const key = new NodeRSA()


module.exports = {
    encryptText: (plainText) => {
        return key.encrypt(plainText, 'base64')
        // return key.encrypt(plainText)
    },
    decryptText: (encryptedText) => {
        return key.decrypt(encryptedText, 'utf8')
        // return key.decrypt(encryptedText, 'utf8')
    }
}