const express = require('express')
const routes = require('../routes/chatwood-hook')
class ServerHttp {
    app;
    port = process.env.PORT ?? 3030;
    providerWS;
    constructor(_providerWS) {
        this.providerWS = _providerWS
    }

    buildApp = () => {
        return this.app = express()
            .use(express.json())
            .use((req, _, next) => {
                req.providerWS = this.providerWS
                next()
            })
            .use(routes)
            .listen(this.port, () => console.log(`🚀 Saliendo por el puerto ${this.port}`))
    };
    /** iniciamos el app */
    start() {
        this.buildApp()
    }
}
module.exports = ServerHttp