const fs = require('fs');

// Function to read data from a CSV file
async function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            // Split the CSV data into rows
            const rows = data.split('\n');

            // Extract column headers from the first row
            const headers = rows.shift().trim().split(',');

            // Initialize an array to store the parsed CSV data
            const result = [];

            // Iterate over each row and create an object with column headers as keys
            rows.forEach(row => {
                const values = row.trim().split(',');
                const obj = {};
                headers.forEach((header, index) => {
                    obj[header] = values[index];
                });
                result.push(obj);
            });

            resolve(result);
        });
    });
}

// Export the readCSV function
module.exports = readCSV;
