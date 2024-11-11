const fs = require('fs');
const path = require('path');

async function deleteFolder(pathname) {
    try {
        
        if (fs.existsSync(pathname)) {
            console.log(pathname);
            await fs.promises.rm(pathname, { recursive: true, force: true });
            return true
        } else {
            console.log(`Folder "${pathname}" does not exist, no need to delete.`);
            return false
        }
    } catch (err) {
        console.error('Error deleting folder:', err);
    }
}
// deleteFolder(path.join(__dirname, `../video_segments/My-cute-girlfriend-is-a-slut-in-bed-and-lets-me-creampie-his-pink-pussy`)).then(e=>console.log(e))

module.exports = deleteFolder
