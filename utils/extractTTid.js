import redirectUrl from "./redirectUrl.js";

export default async function extractTTid(url) {
    let link = ''
    if(url?.includes("vm.tiktok.com") || url?.includes("vt.tiktok.com")) {
        link = await redirectUrl(url)
    } else {
        link = url
    }
    const regex = /\/(video|photo)\/(\d+)(\??)/i;
    const match = link?.match(regex);
    if(match && match[2]) {
        return match[2]
    } else {
        console.log('Link does not contain ID')
        return null
    }
}