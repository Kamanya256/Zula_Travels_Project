const db = require("../../config/db");



// =====================================
// PREVIEW WEBSITE
// =====================================

exports.previewWebsite = async (
    websiteId
) => {


    const [[website]] =
        await db.query(

            `
SELECT

vw.*,

v.company_name,
v.name AS vendor_name

FROM vendor_websites vw

LEFT JOIN vendors v

ON v.id = vw.vendor_id


WHERE vw.id=?

LIMIT 1

`,

            [
                websiteId
            ]

        );



    if (!website) {

        throw new Error(
            "Website not found"
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
                websiteId
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



        page.sections =
            sections.map(section => ({

                id:
                    section.id,

                type:
                    section.section_type,

                name:
                    section.section_name,

                status:
                    section.status,

                content:
                    JSON.parse(
                        section.content_json
                    )

            }));



    }



    return {


        preview: true,


        website: {


            id:
                website.id,


            name:
                website.website_name,


            status:
                website.status,


            theme: {


                primary:
                    website.primary_color,


                secondary:
                    website.secondary_color,


                accent:
                    website.accent_color


            }

        },


        pages


    };



};