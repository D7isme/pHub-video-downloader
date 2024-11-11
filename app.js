const axios = require('axios');
const url = require('url');
const fs = require('fs');
const path = require('path');

const getDetails = require('./utils/getDetails')
const fetchData = require('./utils/fetchData')
const segmentCombiner = require('./utils/segmentCombiner')
const downloadVideoSegments = require('./utils/downloadVideoSegments')
const deleteFolder = require('./utils/deleteFolder')

async function main(fetchUrl) {
    const response = await fetchData(fetchUrl)
    const jsonData = await getDetails(response)


    console.log(jsonData);
    const totalVideoSegment = Math.floor(jsonData.duration.totalSeconds / 4)
    const segmentUrl = jsonData.segmentUrls[0]
    const videoName = jsonData.videoName
    console.log(segmentUrl);
    console.log(videoName);


    const filePath = path.join(__dirname, `./video_segments/${videoName}`);

    if (!fs.existsSync(filePath)) {
        console.log('file not exsist');
        fs.mkdirSync(path.join(__dirname, `./video_segments/${videoName}`), { recursive: true });
    }

    const tsFiles = fs.readdirSync(filePath) || null


    for (let n = tsFiles || 1; n <= totalVideoSegment; n++) {
        let loopedSegmentUrl = await segmentUrl.replace('seg-1', `seg-${n}`)
        let fileExtension = new url.URL(loopedSegmentUrl).pathname.split('/').pop();
        await downloadVideoSegments(loopedSegmentUrl, path.join(__dirname, `./video_segments/${videoName}`), `${videoName}-${fileExtension}`)
        console.log(`${n}. ===> ${loopedSegmentUrl}`);
    }



    if (!fs.existsSync(path.join(__dirname, `./videos`))) {
        console.log('folder dosenot exsist, making the folder.');
        fs.mkdirSync(path.join(__dirname, `./videos`), { recursive: true });
    }
    await segmentCombiner(path.join(__dirname, `./video_segments/${videoName}`), path.join(__dirname, `./videos/${videoName}.mp4`))

    await new Promise(resolve => setTimeout(resolve, 2000));
    if (fs.existsSync(path.join(__dirname, `./video_segments/${videoName}`))) {
       const tempFileRemoved = await deleteFolder(path.join(__dirname, `./video_segments/${videoName}`))
       tempFileRemoved? console.log('successfully removed the temp') : console.log('error removing the file');
    }


}

console.time('executionTime')


main('https://www.pornhub.org/view_video.php?viewkey=66eefc51d34ae')
console.timeEnd('executionTime')



