const express = require('express');
const {validateBookingPOST,validateBookingGET} = require('./../middlewares/validateBooking');
const { sqlQuery } = require('./../services/sql-connection');

const router = express.Router();

// GET: Get all available hour in specific date
router.get('/api/booking',validateBookingGET, async (req, res) => {
    try {
        const {date} = req.query;

        const querySelecteDate = `
            SELECT * FROM [CS_ROOM_BOOKING].[dbo].[BOOKING]
            WHERE [date] = '${date}'
        `
        const resultSelectDate = await sqlQuery(querySelecteDate);

        const result =new Array(9).fill(true);
        for( data of resultSelectDate.recordset){
            console.log(data)
            const dateFromSQL = new Date(data.time);
            const hour = dateFromSQL.getUTCHours();
            result[hour-9] = false;
        }

        return res.status(200).send({
            success: true,
            msg: "Get data success",
            data: result
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            errors: ['Internal server error']
        })
    }
})

// POST: Booking a specific time on date
router.post('/api/booking', validateBookingPOST, async (req, res) => {
    try {
        // Get value from
        const { date, times, name } = req.body;

        // Check duplicate booking
        const queryCheckDup = `
            SELECT * FROM [CS_ROOM_BOOKING].[dbo].[BOOKING]
            WHERE [date] = '${date}' AND [time] = '${time[times]}'
        `
        const resultCheckDup = await sqlQuery(queryCheckDup);
        if (resultCheckDup.recordset.length > 0) {
            return res.status(409).send({
                success: true,
                errors: ['Your selected time slot has already been booked.']
            })
        }

        // Insert to databasea
        const queryBooking = `
            INSERT INTO [dbo].[BOOKING]([date],[time],[date_booking],[user])
            VALUES('${date}','${time[times]}', CURRENT_TIMESTAMP,'${name}');
        `
        const resultBooking = await sqlQuery(queryBooking);
        if (resultBooking.rowsAffected == 1) {
            return res.status(201).send({
                succes: true,
                msg: "Booking successful"
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            errors: ['Internal server error']
        })
    }
})

time = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
]

module.exports = router;