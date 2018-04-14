const axios = require('axios')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.get('/', (req, res) => {
    res.send('hello world')
})
app.get('/deep', (req, res) => {
    const { id, street, zip } = req.query;
    axios.get(`http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=${id}&address=${street}&citystatezip=${zip}`).then(data => {
        console.log(typeof data.data)
        res.send(data.data)
    })
})

app.listen(4567, () => console.log('running server'))