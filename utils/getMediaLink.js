export default async function getMediaLink(id) {
    const awemeInfo = await fetch(`https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${id}`, {
        redirect: "follow",
        follow: 10,
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 musical_ly_99.9.0 JsSdk/2.0 NetType/WIFI Channel/App Store ByteLocale/ru Region/CA RevealType/Dialog isDarkMode/0 WKWebView/1 BytedanceWebview/d8a21c6 FalconTag/'
        }
    })
    const jsonInfo = await awemeInfo.json()
    // return jsonInfo?.aweme_list[0]?.video?.play_addr?.url_list[2]
    if(jsonInfo?.aweme_list[0]?.image_post_info) {
        let imageArray = []
        jsonInfo?.aweme_list[0]?.image_post_info.images.map(item => {
            // imageArray.push(item.display_image.url_list[0])
            imageArray.push({
                type: 'photo',
                media: item.display_image.url_list[0]
            })
        })
        return {
            type: 'photo',
            links: imageArray
        }
    } else {
        return {
            type: 'video',
            links: jsonInfo?.aweme_list[0]?.video?.play_addr?.url_list[2]
        }
    }
}