const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const ServerHttp = require('./http')
const { sendMessageChatwood } = require('./services/chatwood')

const flowSecundario = addKeyword(['salir', 'Salir']).addAnswer(['Gracias por contribuir a la mejora de nuestro país.'])

const flowDocs = addKeyword(['1', 'denuncia'])
    .addAnswer(
        [
            '📄 Asunto',
        ],
        null,
        null,
        [flowSecundario], { capture: true }
    )


const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

/*
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAction(async (ctx, { flowDynamic }) => {
        MESSAGE = "🍀Bienvenido al Chat de la Fiscalia General Electoral.";
        console.log(MESSAGE);
        await sendMessageChatwood(MESSAGE, 'incoming');
        await flowDynamic(MESSAGE);
    }, [flowDocs])
*/
const flowPrincipal = addKeyword(['hola'])
    .addAction(async (_, { flowDynamic }) => {
        return await flowDynamic('Buenas! ¿Cual es tu nombre?')
    })
    .addAction({ capture: true }, async (ctx, { flowDynamic, state }) => {
        await state.update({ name: ctx.body })
        return await flowDynamic(`Gracias por tu nombre!: ${ctx.body}`)
    })
    .addAnswer('Chao!')
const main = async () => {

    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
    QRPortalWeb();

    const server = new ServerHttp(adapterProvider)
    server.start();
}

main()
