const express = require('express')
const routes = require('../routes/chatwood-hook')
class ServerHttp {
    app;
    port = process.env.PORT ?? 3030;

    constructor(params) {
    }

    buildApp = () => {
        return this.app = express().use(express.json()).use(routes).listen(this.port, () => console.log(`🚀 Saliendo por el puerto ${this.port}`))
    };
    /** iniciamos el app */
    start() {
        this.buildApp()
    }
}
module.exports = ServerHttp