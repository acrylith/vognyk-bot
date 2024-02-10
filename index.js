import TelegramBot from "node-telegram-bot-api"
import download from "download"
import extractTTid from "./utils/extractTTid.js"
import getMediaLink from "./utils/getMediaLink.js"

const headers = { headers: { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 musical_ly_99.9.0 JsSdk/2.0 NetType/WIFI Channel/App Store ByteLocale/ru Region/CA RevealType/Dialog isDarkMode/0 WKWebView/1 BytedanceWebview/d8a21c6 FalconTag/' } }
const envOptions = {
    token: process.env.BOT_TOKEN,
}

const bot = new TelegramBot(envOptions.token, { 
    polling: true,
})

bot.onText(/vm\.tiktok\.com|vt\.tiktok\.com|tiktok\.com/, async (msg, match) => {
    const { chat, text } = msg
    bot.sendChatAction(chat.id, 'upload_video')
    const ttId = await extractTTid(text)
    const mediaLink = await getMediaLink(ttId)
    switch(mediaLink.type) {
        case 'video':
            bot.sendVideo(chat.id, await download(mediaLink.links, headers), {}, { filename: `${Date.now()}`, contentType: 'video/mp4' })
            break;
        
        case 'photo':
            bot.sendMediaGroup(chat.id, mediaLink.links)
            break;
    }
})

bot.onText('/start', async (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'Hello. Just send a tiktok video link to download')
})

bot.on('polling_error', (error) => {
    console.log(error.code);  // => 'EFATAL'
});