export default async function redirectUrl(url) {
    const response = await fetch(url, {
        redirect: "follow",
        follow: 10,
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 musical_ly_99.9.0 JsSdk/2.0 NetType/WIFI Channel/App Store ByteLocale/ru Region/CA RevealType/Dialog isDarkMode/0 WKWebView/1 BytedanceWebview/d8a21c6 FalconTag/'
        }
    });
    const red_URL = response.url
    return red_URL
}