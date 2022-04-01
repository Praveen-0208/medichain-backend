//Required modules
const express = require('express');
const fs = require('fs');
const app = express();

app.get('/addfile', function(req, res) {

    ipfs.files.add(testBuffer, function (err, file) {
        if (err) {
          console.log(err);
        }
        console.log(file)
      })

})
//Getting the uploaded file via hash code.
app.get('/getfile', function(req, res) {
    
    //This hash is returned hash of addFile router.
    const validCID = 'HASH_CODE'

    ipfs.files.get(validCID, function (err, files) {
        files.forEach((file) => {
          console.log(file.path)
          console.log(file.content.toString('utf8'))
        })
      })

      
})

app.listen(9000, () => console.log('App listening on port 9000!'))