const fs = require('fs');
const path = require('path');

/**
 * Concatenates multiple .ts files into a single .mp4 file.
 * @param {string} inputFolder - The folder containing .ts segment files.
 * @param {string} outputFile - The output .mp4 file path.
 */
async function segmentCombiner(inputFolder, outputFile) {
    const tsFiles = fs.readdirSync(inputFolder)
        .filter(file => file.endsWith('.ts'))
        .sort((a, b) => {
            // Sort based on the segment number extracted from the file name
            const numA = parseInt(a.match(/seg-(\d+)/)?.[1] || "0", 10);
            const numB = parseInt(b.match(/seg-(\d+)/)?.[1] || "0", 10);
            return numA - numB;
        });
    
    console.log(`Found ${tsFiles.length} .ts files to merge.`);

    if (tsFiles.length === 0) {
        console.log('No .ts files found!');
        return;
    }

    const outputStream = fs.createWriteStream(outputFile);
    let processedCount = 0;

    function writeNextBatch(batchSize = 100) {
        const filesToProcess = tsFiles.slice(processedCount, processedCount + batchSize);
        filesToProcess.forEach(file => {
            const tsFilePath = path.join(inputFolder, file);
            const tsData = fs.readFileSync(tsFilePath);
            outputStream.write(tsData);
        });

        processedCount += filesToProcess.length;

        if (processedCount < tsFiles.length) {
            // Continue processing the next batch
            setImmediate(() => writeNextBatch(batchSize));
        } else {
            // End the stream after all files are processed
            outputStream.end(() => {
                console.log('Successfully concatenated all .ts files into an .mp4 file.');
            });
        }
    }

    writeNextBatch();  // Start the batch writing process

    
}

// Example usage
// const inputFolder = path.join(__dirname, '../video_segments'); // Folder containing .ts segments
// const outputFile = path.join(__dirname, '../videos', 'output_video.mp4'); // Path for the combined .mp4 file

// concatenateTsFiles(inputFolder, outputFile);

module.exports = segmentCombiner