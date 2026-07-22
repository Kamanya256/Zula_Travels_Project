const db = require("../../config/db");


// ======================================
// GET WEBSITE EDITOR DATA
// ======================================

exports.getEditor = async (vendorWebsiteId) => {


    const [[website]] =
        await db.query(

            `
            SELECT *
            FROM vendor_websites
            WHERE id=?
            `,
            [
                vendorWebsiteId
            ]

        );


    if (!website) {

        throw new Error(
            "Website not found."
        );

    }



    const [pages] =
        await db.query(

            `
            SELECT *
            FROM website_pages

            WHERE website_id=?

            ORDER BY sort_order,id

            `,

            [
                vendorWebsiteId
            ]

        );



    for (const page of pages) {


        const [sections] =
            await db.query(

                `
                SELECT *
                FROM website_sections

                WHERE page_id=?

                ORDER BY sort_order,id

                `,

                [
                    page.id
                ]

            );


        page.sections = sections;


    }



    return {

        website,

        pages

    };


};