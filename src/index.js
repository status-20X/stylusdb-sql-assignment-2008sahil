// Function to execute a SELECT SQL query
async function executeSELECTQuery(query) {
    // Sample dataset
    const dataset = [
        { id: '1', name: 'John', age: '30' },
        { id: '2', name: 'Alice', age: '25' },
        { id: '3', name: 'Bob', age: '35' }
    ];

    // Parse the query to extract fields and conditions
    const fields = query.match(/SELECT (.+?) FROM/)[1].split(',').map(field => field.trim());
    const conditions = query.match(/WHERE (.+)/);

    // Apply conditions if provided
    let result = dataset;
    if (conditions) {
        const condition = conditions[1].trim().split('=').map(part => part.trim());
        result = dataset.filter(item => item[condition[0]] === condition[1]);
    }

    // Select fields
    result = result.map(item => {
        const selected = {};
        fields.forEach(field => {
            selected[field] = item[field];
        });
        return selected;
    });

    return result;
}

module.exports = executeSELECTQuery;
