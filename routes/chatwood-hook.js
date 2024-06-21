const express = require('express')
const { createReadStream } = require('fs')
const { join } = require('path')
const router = express.Router()


const chatWoodHook = async (req, res) => {
    const providerWS = req.providerWS;
    //console.log(providerWS)
    const body = req.body
    const phone = body?.conversation?.meta?.sender?.phone_number.replace("+", "")
    if (body?.private) {
        res.send(null)
        return
    }
    console.log('body', phone, body.content)
    await providerWS.sendMessage(`${phone}`, body.content, {})

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