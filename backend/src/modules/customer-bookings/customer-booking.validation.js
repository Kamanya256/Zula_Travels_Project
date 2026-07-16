// ======================================================
// ZULA TRAVELS 2026
// CUSTOMER BOOKING VALIDATION
// ======================================================

exports.validateBooking = (data) => {

    const errors = [];

    // =====================================
    // HOTEL
    // =====================================

    if (!data.hotel_id) {

        errors.push("Hotel is required.");

    }

    // =====================================
    // ROOM
    // =====================================

    if (!data.room_id) {

        errors.push("Room is required.");

    }

    // =====================================
    // CHECK-IN
    // =====================================

    if (!data.check_in) {

        errors.push("Check-in date is required.");

    }

    // =====================================
    // CHECK-OUT
    // =====================================

    if (!data.check_out) {

        errors.push("Check-out date is required.");

    }

    // =====================================
    // DATE VALIDATION
    // =====================================

    if (data.check_in && data.check_out) {

        const checkIn = new Date(data.check_in);

        const checkOut = new Date(data.check_out);

        if (Number.isNaN(checkIn.getTime())) {

            errors.push("Invalid check-in date.");

        }

        if (Number.isNaN(checkOut.getTime())) {

            errors.push("Invalid check-out date.");

        }

        if (

            !Number.isNaN(checkIn.getTime()) &&
            !Number.isNaN(checkOut.getTime()) &&
            checkOut <= checkIn

        ) {

            errors.push(
                "Check-out date must be after check-in date."
            );

        }

    }

    // =====================================
    // RETURN
    // =====================================

    return {

        valid: errors.length === 0,

        errors

    };

};