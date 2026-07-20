const db = require("../../config/db");


// =====================================
// GET MY WEBSITE
// =====================================

exports.getMyWebsite = async (
    vendorId
) => {


    const [[website]] =
        await db.query(

            `
SELECT *

FROM vendor_websites

WHERE vendor_id=?

LIMIT 1

`,
            [
                vendorId
            ]

        );


    if (!website) {

        throw new Error(
            "Website not found"
        );

    }


    return website;


};





// =====================================
// UPDATE BRANDING
// =====================================

exports.updateBranding =
    async (
        vendorId,
        data
    ) => {


        const {

            logo,
            favicon,
            primary_color,
            secondary_color,
            accent_color,
            font_family

        } = data;



        await db.query(

            `
UPDATE vendor_websites

SET ?

WHERE vendor_id=?

`,

            [
                {
                    logo,
                    favicon,
                    primary_color,
                    secondary_color,
                    accent_color,
                    font_family
                },
                vendorId
            ]

        );



        return {

            message:
                "Branding updated successfully"

        };


    };





// =====================================
// UPDATE WEBSITE SECTION
// =====================================


exports.updateSection =
    async (
        vendorId,
        sectionId,
        content
    ) => {


        const [[section]] =
            await db.query(

                `
SELECT ws.id

FROM website_sections ws

JOIN website_pages wp

ON wp.id = ws.page_id

JOIN vendor_websites vw

ON vw.id = wp.website_id


WHERE ws.id=?

AND vw.vendor_id=?

`,

                [
                    sectionId,
                    vendorId
                ]

            );



        if (!section) {

            throw new Error(
                "Section not found"
            );

        }



        await db.query(

            `
UPDATE website_sections

SET

content_json=?,

ai_generated=0

WHERE id=?

`,

            [
                JSON.stringify(content),
                sectionId
            ]

        );



        return {

            message:
                "Section updated successfully"

        };


    };





// =====================================
// PUBLISH WEBSITE
// =====================================


exports.publishWebsite =
    async (
        vendorId
    ) => {


        await db.query(

            `
UPDATE vendor_websites

SET status='published'

WHERE vendor_id=?

`,

            [
                vendorId
            ]

        );



        return {

            status:
                "published"

        };


    };