const cheerio = require('cheerio');

async function getTargetValue(html, target, types= 'text', attributeName = null) {
    try {
        const $ = cheerio.load(html);

        // Select the target element
        const element = $(target);

        // Retrieve data based on the types parameter
        let jsonData;
        if (types === 'text') {
            jsonData = element.text(); // Get the text content of the element
        } else if (types === 'html') {
            jsonData = element.html(); // Get the inner HTML of the element
        } else if (types === 'attr') {
            // Use the attributeName to get a specific attribute
            if (!attributeName) {
                throw new Error('Please specify an attribute name when using "attr" type.');
            }
            jsonData = element.attr(attributeName); // Get the value of the specified attribute
        } else if (types === 'data') {
            jsonData = element.data(); // Get all data-* attributes as an object
        } else {
            throw new Error('Invalid types parameter');
        }

        return jsonData;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
    }
}

module.exports = getTargetValue;
