const db = require("../../config/db");


// ======================================
// GENERATE WEBSITE FROM TEMPLATE
// ======================================

exports.generateWebsite = async (vendorWebsiteId) => {

    const connection = await db.getConnection();


    try {

        await connection.beginTransaction();



        // ======================================
        // GET VENDOR WEBSITE
        // ======================================

        const [[website]] = await connection.query(

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
                "Vendor website not found."
            );

        }



        if (!website.template_id) {

            throw new Error(
                "No template assigned to this website."
            );

        }





        // ======================================
        // REMOVE OLD GENERATED WEBSITE CONTENT
        // ======================================


        await connection.query(

            `
            DELETE ws
            FROM website_sections ws

            INNER JOIN website_pages wp
            ON wp.id = ws.page_id

            WHERE wp.website_id=?
            `,

            [
                vendorWebsiteId
            ]

        );



        await connection.query(

            `
            DELETE FROM website_pages

            WHERE website_id=?
            `,

            [
                vendorWebsiteId
            ]

        );





        // ======================================
        // GET TEMPLATE PAGES
        // ======================================


        const [templatePages] =
            await connection.query(

                `
                SELECT *
                FROM website_template_pages

                WHERE template_id=?

                AND status='active'

                ORDER BY sort_order,id

                `,

                [
                    website.template_id
                ]

            );



        if (templatePages.length === 0) {

            throw new Error(
                "Selected template has no pages."
            );

        }





        let pagesCreated = 0;

        let sectionsCreated = 0;





        // ======================================
        // CREATE WEBSITE PAGES
        // ======================================


        for (const templatePage of templatePages) {



            const isHomepage =
                templatePage.page_type === "homepage"
                    ? 1
                    : 0;



            const [pageResult] =
                await connection.query(

                    `
                    INSERT INTO website_pages

                    (
                        website_id,
                        title,
                        slug,
                        page_type,
                        sort_order,
                        is_homepage,
                        status
                    )

                    VALUES(?,?,?,?,?,?,?)

                    `,


                    [

                        vendorWebsiteId,

                        templatePage.title,

                        templatePage.slug,

                        templatePage.page_type,

                        templatePage.sort_order,

                        isHomepage,

                        "published"

                    ]

                );



            const newPageId =
                pageResult.insertId;



            pagesCreated++;







            // ======================================
            // CREATE PAGE SECTIONS
            // ======================================


            const [templateSections] =
                await connection.query(

                    `
                    SELECT *

                    FROM website_template_sections

                    WHERE template_page_id=?

                    AND status='active'

                    ORDER BY sort_order,id

                    `,

                    [
                        templatePage.id
                    ]

                );





            for (const section of templateSections) {



                const content =

                    section.content_json

                    ||

                    JSON.stringify({

                        title:
                            section.section_name,


                        subtitle:
                            "",


                        description:
                            "Content will be generated.",


                        images: [],


                        videos: [],


                        items: [],


                        settings: {

                            background_color: "#ffffff",

                            text_color: "#000000",

                            visible: true

                        }

                    });





                await connection.query(

                    `
                    INSERT INTO website_sections

                    (

                        page_id,

                        section_name,

                        section_type,

                        content_json,

                        sort_order,

                        status

                    )

                    VALUES(?,?,?,?,?,'active')

                    `,

                    [

                        newPageId,

                        section.section_name,

                        section.section_type,

                        content,

                        section.sort_order

                    ]

                );



                sectionsCreated++;


            }



        }





        await connection.commit();





        return {


            message:
                "Website generated successfully.",


            pages_created:
                pagesCreated,


            sections_created:
                sectionsCreated


        };



    }



    catch (error) {


        await connection.rollback();


        throw error;


    }



    finally {


        connection.release();


    }


};