const express = require('express')
const { createReadStream } = require('fs')
const { join } = require('path')
const router = express.Router()


const chatWoodHook = async (req, res) => {
    const body = req.body
    console.log(body)
    res.send(body)

};
router.post('/chatwood-hook', chatWoodHook);

router.get('/get-qr', async (_, res) => {
    const path = join(process.cwd(), `bot.qr.png`);
    const fileStream = createReadStream(path)

    res.writeHead(200, { "Content-type": "image/png" })
    fileStream.pipe(res)
});

module.exports = router