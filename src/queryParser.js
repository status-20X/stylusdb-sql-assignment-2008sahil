function parseQuery(query) {
    query = query.trim();

    if (!query.startsWith('SELECT')) {
        throw new Error('Invalid SQL query. Only SELECT queries are supported.');
    }

    const selectIndex = query.indexOf('SELECT') + 'SELECT'.length;
    const fromIndex = query.indexOf('FROM');
    const whereIndex = query.indexOf('WHERE');

    const tableNameAndWhere = query.substring(fromIndex + 'FROM'.length, whereIndex !== -1 ? whereIndex : query.length).trim();

    const tableName = tableNameAndWhere.trim();

    const fieldsString = query.substring(selectIndex, fromIndex).trim();
    const fields = fieldsString.split(',').map(field => field.trim());

    let whereClauses = null;
    if (whereIndex !== -1) {
        const whereClauseString = query.substring(whereIndex + 'WHERE'.length).trim();
        const clauses = whereClauseString.split('AND').map(clause => clause.trim());

        whereClauses = clauses.map(clause => {
            const [field, rest] = clause.split('=').map(part => part.trim());
            const operator = '=';
            const value = rest.replace(/['"]+/g, '').trim(); // Remove quotes and trim whitespace
            return { field, operator, value };
        });
    }

    return {
        fields,
        table: tableName,
        whereClauses: whereClauses
    };
}

module.exports = parseQuery;
