

async function fetchData(url, options = {}) {
    try {
        console.log('starting the fetch function');
        const response = await fetch(url, { options })
        return response
    } catch (error) {
        // console.error(`Error fetching data: ${error.message}`);
        // throw error.response ? error.response.data : error;
    }
}

// fetchData()


module.exports = fetchData