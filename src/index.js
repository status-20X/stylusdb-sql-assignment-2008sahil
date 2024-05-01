async function executeSELECTQuery(query) {
    // Sample dataset
    const dataset = [
        { id: '1', name: 'John', age: '30' },
        { id: '2', name: 'Alice', age: '25' },
        { id: '3', name: 'Bob', age: '35' }
    ];

    // Parse the query to extract fields and conditions
    const fieldsMatch = query.match(/SELECT (.+?) FROM/);
    const fields = fieldsMatch ? fieldsMatch[1].split(',').map(field => field.trim()) : [];
    const conditionsMatch = query.match(/WHERE (.+)/);
    let result = dataset;

    // Apply conditions if provided
    if (conditionsMatch) {
        const conditions = conditionsMatch[1].trim().split(/\b(AND)\b/);
        result = result.filter(item => {
            return conditions.every(condition => {
                if (condition.includes('>')) {
                    const [field, value] = condition.split('>');
                    return parseInt(item[field.trim()]) > parseInt(value.trim());
                } else if (condition.includes('!=')) {
                    const [field, value] = condition.split('!=');
                    return item[field.trim()] !== value.trim();
                } else if (condition.includes('=')) {
                    const [field, value] = condition.split('=');
                    return item[field.trim()] === value.trim();
                }
                return true; // Handle other conditions if needed
            });
        });
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
