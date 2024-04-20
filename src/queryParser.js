

function parseQuery(query) {
    query = query.trim();

    if (!query.startsWith('SELECT')) {
        throw new Error('Invalid SQL query. Only SELECT queries are supported.');
    }

    const selectIndex = query.indexOf('SELECT') + 'SELECT'.length;
    const fromIndex = query.indexOf('FROM');
    const fieldsString = query.substring(selectIndex, fromIndex).trim();
    const fields = fieldsString.split(',').map(field => field.trim());
    const tableName = query.substring(fromIndex + 'FROM'.length).trim();

    return {
        fields,
        table: tableName
    };
}

module.exports = parseQuery;
