const db =
    require("../../config/db");



exports.getDashboard =
    async (vendorId) => {


        const params =
            vendorId === null
                ?
                []
                :
                [vendorId];



        let condition = "";


        if (vendorId !== null) {

            condition =
                "WHERE b.vendor_id=?";

        }



        const [[stats]] = await db.query(

            `
SELECT


COUNT(*) total_bookings,


SUM(
CASE 
WHEN status='pending'
THEN 1 ELSE 0 END
)
pending_bookings,


SUM(
CASE 
WHEN status='confirmed'
THEN 1 ELSE 0 END
)
confirmed_bookings,


SUM(
CASE 
WHEN status='completed'
THEN 1 ELSE 0 END
)
completed_bookings,


SUM(
CASE 
WHEN status='cancelled'
THEN 1 ELSE 0 END
)
cancelled_bookings,


SUM(
CASE
WHEN payment_status='paid'
THEN total_amount
ELSE 0
END
)
paid_revenue


FROM bookings b

${condition}

`,
            params

        );



        return {

            total_bookings:
                Number(stats.total_bookings || 0),

            pending_bookings:
                Number(stats.pending_bookings || 0),

            confirmed_bookings:
                Number(stats.confirmed_bookings || 0),

            completed_bookings:
                Number(stats.completed_bookings || 0),

            cancelled_bookings:
                Number(stats.cancelled_bookings || 0),

            paid_revenue:
                stats.paid_revenue || 0


        };


    };