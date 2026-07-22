const db = require("../../config/db");


exports.getDashboard = async (userId) => {


    // Get vendor
    const [vendors] = await db.query(
        `
        SELECT 
            id,
            name,
            company_name,
            business_type,
            status,
            rating
        FROM vendors
        WHERE user_id = ?
        `,
        [userId]
    );


    if (vendors.length === 0) {
        throw new Error("Vendor account not found");
    }


    const vendor = vendors[0];



    // Website
    const [websites] = await db.query(
        `
        SELECT
            id,
            website_name,
            subdomain,
            status
        FROM vendor_websites
        WHERE vendor_id = ?
        `,
        [vendor.id]
    );


    const website = websites[0] || null;



    let pages = 0;
    let sections = 0;
    let visitors = 0;



    if (website) {


        const [pageResult] = await db.query(
            `
            SELECT COUNT(*) total
            FROM website_pages
            WHERE website_id = ?
            `,
            [website.id]
        );


        pages = pageResult[0].total;



        const [sectionResult] = await db.query(
            `
            SELECT COUNT(*) total
            FROM website_sections ws
            INNER JOIN website_pages wp
            ON ws.page_id = wp.id
            WHERE wp.website_id = ?
            `,
            [website.id]
        );


        sections = sectionResult[0].total;



        const [visitResult] = await db.query(
            `
            SELECT COUNT(*) total
            FROM website_visits
            WHERE website_id = ?
            `,
            [website.id]
        );


        visitors = visitResult[0].total;


    }



    // Booking statistics

    const [bookingStats] = await db.query(
        `
        SELECT

        COUNT(*) total_bookings,

        SUM(
        CASE 
        WHEN status='pending'
        THEN 1 ELSE 0 END
        ) pending_bookings,


        SUM(
        CASE 
        WHEN status='completed'
        THEN 1 ELSE 0 END
        ) completed_bookings,


        COALESCE(SUM(total_amount),0) total_sales


        FROM bookings

        WHERE vendor_id = ?

        `,
        [vendor.id]
    );




    // Revenue from ledger

    const [finance] = await db.query(
        `
        SELECT

        COALESCE(SUM(net_amount),0) revenue,

        COALESCE(SUM(commission_amount),0) commission


        FROM vendor_ledger

        WHERE vendor_id = ?

        `,
        [vendor.id]
    );



    return {


        vendor,


        website,


        statistics: {


            pages,

            sections,

            visitors,


            bookings:
                bookingStats[0].total_bookings || 0,


            pending_bookings:
                bookingStats[0].pending_bookings || 0,


            completed_bookings:
                bookingStats[0].completed_bookings || 0,


            sales:
                bookingStats[0].total_sales || 0,


            revenue:
                finance[0].revenue || 0,


            commission:
                finance[0].commission || 0

        }


    };


};