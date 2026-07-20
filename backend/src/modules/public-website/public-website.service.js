const db = require("../../config/db");



// =====================================
// GET PUBLIC WEBSITE
// =====================================

exports.getWebsiteBySubdomain =
    async (subdomain) => {


        const [[website]] =
            await db.query(

                `
        SELECT
            vw.*,
            v.name AS vendor_name,
            v.company_name,
            v.business_type

        FROM vendor_websites vw

        LEFT JOIN vendors v
            ON v.id = vw.vendor_id

        WHERE vw.subdomain=?
        AND vw.status='published'

        LIMIT 1
        `,

                [
                    subdomain
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

        AND status='published'

        ORDER BY sort_order,id

        `,

                [
                    website.id
                ]

            );




        for (const page of pages) {



            const [sections] =
                await db.query(

                    `
        SELECT
            id,
            section_name,
            section_type,
            content_json,
            sort_order

        FROM website_sections

        WHERE page_id=?

        AND status='active'

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

                    content:
                        JSON.parse(
                            section.content_json
                        )

                }));


        }




        return {


            website: {

                id:
                    website.id,

                name:
                    website.website_name,

                vendor:
                    website.company_name ||
                    website.vendor_name,


                logo:
                    website.logo,


                hero_image:
                    website.hero_image,


                theme: {

                    primary:
                        website.primary_color,

                    secondary:
                        website.secondary_color,

                    accent:
                        website.accent_color,

                    font:
                        website.font_family

                },


                contact: {

                    email:
                        website.contact_email,

                    phone:
                        website.contact_phone,

                    whatsapp:
                        website.whatsapp

                }

            },


            pages


        };


    };

// =====================================
// GET SINGLE PUBLIC PAGE
// =====================================

exports.getPublicPage =
    async (
        subdomain,
        slug
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

WHERE vw.subdomain=?
AND vw.status='published'

LIMIT 1
`,

                [
                    subdomain
                ]

            );



        if (!website) {

            throw new Error(
                "Website not found"
            );

        }




        const [[page]] =
            await db.query(

                `
SELECT *

FROM website_pages

WHERE website_id=?

AND slug=?

AND status='published'

LIMIT 1

`,

                [
                    website.id,
                    slug
                ]

            );



        if (!page) {

            throw new Error(
                "Page not found"
            );

        }




        const [sections] =
            await db.query(

                `
SELECT

id,
section_name,
section_type,
content_json,
sort_order

FROM website_sections

WHERE page_id=?

AND status='active'

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

                content:
                    JSON.parse(
                        section.content_json
                    )

            }));




        return {


            website: {

                name:
                    website.website_name,

                logo:
                    website.logo,


                theme: {

                    primary:
                        website.primary_color,

                    secondary:
                        website.secondary_color,

                    accent:
                        website.accent_color

                }

            },


            page


        };


    };