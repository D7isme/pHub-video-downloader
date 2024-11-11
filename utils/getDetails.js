const parseIsoDuration = require('./parseIsoDuration')
const getTargetValue = require('./getTargetValue')
const getCategoryFromUrl = require('./getCategoryFromUrl')

const fs = require('fs')
const path = require('path')

async function getDetails(response) {
    try {

        const html = await response.text();

        const videoDetails = await getTargetValue(html, 'script[type="application/ld+json"]', 'html');


        const mainPlayerHtml = await getTargetValue(html, '#mobileContainer script', 'html')
        const jsonMatch = mainPlayerHtml.match(/var flashvars_\d+\s*=\s*(\{.*\});/);
        const linksLists = JSON.parse(jsonMatch[1]);

        const parsedJson = JSON.parse(videoDetails)
        // console.log(linksLists);
        // console.log(parsedJson);
        return {
            videoID: linksLists.trackingTimeWatched.video_id,
            videoName: parsedJson.name.replace(/ /g,'-'),
            videoImage: parsedJson.thumbnailUrl,
            uploadDate: parsedJson.uploadDate,
            description: parsedJson.description,
            author:parsedJson.author,
            actionTags: linksLists.actionTags,
            tags: getCategoryFromUrl(linksLists.adRollGlobalConfig[0].json),
            defaultQuality: linksLists.defaultQuality,
            segmentUrls: linksLists.mediaDefinitions.map(e => {
                    return e.videoUrl.replace('master.m3u8', 'seg-1-v1-a1.ts')
                }),
            duration: parseIsoDuration(parsedJson.duration),
            embedCode: linksLists.embedCode,
            hotspots:linksLists.hotspots,
            thumbs:linksLists.thumbs.urlPattern,
            nextVideo: linksLists.nextVideo
        }

        // fs.writeFile(path.join(__dirname, 'logs/h.html'), html, (err) => {
        //     if (err) throw err;
        //     console.log('File has been written successfully');
        // });
        // fs.writeFile(path.join(__dirname, 'logs/t.json'), JSON.stringify(flashvarsJson, null, 2), (err) => {
        //     if (err) throw err;
        //     console.log('File has been written successfully');
        // });

        // linkLists.mediaDefinitions.forEach(e => {
        //     console.log(e.videoUrl.replace('master.m3u8', 'seg-1-v1-a1.ts'));
        // });


        // cv-v,hv-v, ev-h,
        // seg-1-v1-a1.ts
    } catch (error) {
        console.log(error);
    }
}
module.exports = getDetails