const axios = require('axios');
const fs = require('fs');
const path = require('path');
const url = require('url');


async function downloadVideoSegments(segmentUrl, outputPath,filename) {
    const headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 OPR/114.0.0.0",
        "Referer": "https://www.pornhub.com",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "Origin": "https://www.pornhub.com",
        "sec-ch-ua": '"Chromium";v="128", "Not;A=Brand";v="24", "Opera GX";v="114"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
    };
    try {
        const response = await axios({
            url: segmentUrl,
            method: 'GET',
            responseType: 'stream',
            headers: headers
        });
        // const parsedUrl = new url.URL(response.data.responseUrl);
        const writer = fs.createWriteStream(`${outputPath}/${filename}`);
        response.data.pipe(writer);
       return response
    } catch (error) {
        console.error(`Failed to download segment: ${error.response?.status || error.message}`);
    }
}


// const segmentUrl = "https://em-h.phncdn.com/hls/videos/202310/06/440716571/720P_4000K_440716571.mp4/seg-1-v1-a1.ts?validfrom=1731144940&validto=1731152140&ipa=104.28.242.148&hdl=-1&hash=LPlDZDkiR5dovpjqEZy3pYKMo1Q%3D";

// downloadVideoSegments(segmentUrl, path.join(__dirname, '../video_segments'))

module.exports=downloadVideoSegments