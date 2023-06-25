const { sqlQuery } = require('./../services/sql-connection');

const getOverviewBooking = async () => {
    let date = Array(8).fill('');
    for (let i = 0; i < 8; i++) {
        date[i] = new Date(Date.now() + 86400000 * i)
    }
    let result = [];
    for (date_ of date) {
        const querySelecteDate = `
            SELECT * FROM [CS_ROOM_BOOKING].[dbo].[BOOKING]
            WHERE [date] = '${formatDate(date_)}'
        `
        const resultSelectDate = await sqlQuery(querySelecteDate);
        const bookedHr = resultSelectDate.recordset.length;
        result.push({
            date: formatDate(date_).substring(0,10),
            freeHour: 9-bookedHr
        })
    }


    return JSON.stringify(result);
}


function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

module.exports = {getOverviewBooking}