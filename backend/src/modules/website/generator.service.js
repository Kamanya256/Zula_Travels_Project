const db = require("../../config/db");



// =====================================
// GENERATE WEBSITE FROM TEMPLATE
// =====================================

exports.generateWebsite = async (
    websiteId,
    templateId
) => {


    const connection =
        await db.getConnection();


    try {


        await connection.beginTransaction();



        // Get template

        const [[template]] =
            await connection.query(
                `
                SELECT *
                FROM website_templates
                WHERE id=?
                `,
                [
                    templateId
                ]
            );


        if (!template) {

            throw new Error(
                "Template not found"
            );

        }



        const layout =
            JSON.parse(
                template.layout
            );



        if (!layout.pages) {

            throw new Error(
                "Invalid template structure"
            );

        }



        // Prevent duplicate generation

        const [[existing]] =
            await connection.query(
                `
                SELECT id
                FROM website_pages
                WHERE website_id=?
                LIMIT 1
                `,
                [
                    websiteId
                ]
            );


        if (existing) {

            throw new Error(
                "Website already generated"
            );

        }



        let generatedPages = [];



        // Create pages

        for (
            const page of layout.pages
        ) {



            const [pageResult] =
                await connection.query(

                    `
                INSERT INTO website_pages
                (
                    website_id,
                    title,
                    slug,
                    page_type,
                    is_homepage,
                    status
                )

                VALUES
                (?,?,?,?,?,?)
                `,

                    [

                        websiteId,

                        page.title,

                        page.slug,

                        page.page_type,

                        page.slug === "/" ? 1 : 0,

                        "published"

                    ]

                );



            const pageId =
                pageResult.insertId;



            let order = 1;



            // Create sections

            for (
                const section of page.sections
            ) {



                await connection.query(

                    `
                INSERT INTO website_sections
                (
                    page_id,
                    section_name,
                    section_type,
                    content_json,
                    ai_generated,
                    sort_order,
                    status
                )

                VALUES
                (?,?,?,?,?,?,?)
                `,

                    [

                        pageId,

                        section,

                        section,

                        JSON.stringify({

                            title:
                                section
                                    .replace("_", " ")
                                    .toUpperCase(),

                            description:
                                "Content will be generated."

                        }),

                        0,

                        order,

                        "active"

                    ]

                );


                order++;


            }



            generatedPages.push({

                page_id: pageId,

                title: page.title,

                sections:
                    page.sections

            });


        }



        await connection.commit();



        return {


            website_id: websiteId,

            template:
                template.name,

            pages:
                generatedPages


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