const { check,query, validationResult } = require('express-validator');

const validateBookingPOST = [
    check('date')
        .custom((value) => {
            let bookingDate = new Date(value);
            let today = new Date();
            let eightDaysFromNow = new Date();
            eightDaysFromNow.setDate(today.getDate() + 8);

            // Reset hours, minutes, seconds and milliseconds
            bookingDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            eightDaysFromNow.setHours(0, 0, 0, 0);

            return bookingDate >= today && bookingDate <= eightDaysFromNow;
        })
        .withMessage('Date should be within the range of today to the next 8 days'),
    check('times')
        .isInt({ min: 0, max: 8 })
        .withMessage('Times must be an integer between 0 and 8')
        .custom((value, { req }) => {
            let bookingDate = new Date(req.body.date);
            let today = new Date();
        
            // Reset hours, minutes, seconds and milliseconds
            bookingDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
      
            // Check if the booking date is today
            if (bookingDate.getTime() === today.getTime()) {
              // Current hour in 24h format
              let currentHour = new Date().getHours();
      
              // Convert the booking time index to a real hour (9 + index)
              let bookingHour = 9 + parseInt(value, 10);
      
              // Check if the booking is at least one hour in advance
              return currentHour < bookingHour - 1;
            }
      
            // If booking date is not today, skip this validation
            return true;
          })
          .withMessage('Booking should be made at least 1 hour in advance'),
    check('name')
        .notEmpty()
        .withMessage('Name is required'),

    // Use this middleware to check the result of the above validation
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
        next();
    },
];

const validateBookingGET = [
    query('date')
        .notEmpty()
        .withMessage('Date is required')
        .isDate()
        .withMessage('Date should be a valid date'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

module.exports = {
    validateBookingPOST,
    validateBookingGET
}