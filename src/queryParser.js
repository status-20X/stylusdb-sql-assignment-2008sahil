function parseQuery(query) {
    query = query.trim();

    if (!query.startsWith('SELECT')) {
        throw new Error('Invalid SQL query. Only SELECT queries are supported.');
    }

    const selectIndex = query.indexOf('SELECT') + 'SELECT'.length;
    const fromIndex = query.indexOf('FROM');
    const tableNameAndWhere = query.substring(fromIndex + 'FROM'.length).trim();

    let tableName, whereClause;

    // Extract the table name and where clause
    const whereIndex = tableNameAndWhere.indexOf('WHERE');
    if (whereIndex !== -1) {
        tableName = tableNameAndWhere.substring(0, whereIndex).trim();
        whereClause = tableNameAndWhere.substring(whereIndex + 'WHERE'.length).trim();
    } else {
        tableName = tableNameAndWhere.trim();
        whereClause = null; // Set whereClause to null when WHERE clause is not present
    }

    const fieldsString = query.substring(selectIndex, fromIndex).trim();
    const fields = fieldsString.split(',').map(field => field.trim());

    return {
        fields,
        table: tableName,
        whereClause: whereClause
    };
}

module.exports = parseQuery;
