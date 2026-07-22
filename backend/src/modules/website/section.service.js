const db = require("../../config/db");


// =====================================
// DEFAULT SECTION CONTENT
// =====================================

function defaultContent(sectionType) {

    return {

        title:
            sectionType
                .replace("_", " ")
                .toUpperCase(),

        subtitle: "",

        description:
            "Content will be generated.",

        button_text: "",

        button_link: "",

        images: [],

        videos: [],

        items: [],

        settings: {

            background_color: "#ffffff",

            text_color: "#000000",

            visible: true

        }

    };

}



// =====================================
// GET PAGE SECTIONS
// =====================================

exports.getPageSections =
    async (pageId) => {


        const [rows] =
            await db.query(

                `
        SELECT *
        FROM website_sections
        WHERE page_id=?
        AND status='active'
        ORDER BY sort_order,id
        `,

                [
                    pageId
                ]

            );


        return rows.map(section => ({

            ...section,

            content_json:
                section.content_json
                    ?
                    JSON.parse(section.content_json)
                    :
                    {}

        }));

    };



// =====================================
// GET SINGLE SECTION
// =====================================

exports.getSection =
    async (id) => {


        const [[section]] =
            await db.query(

                `
        SELECT *
        FROM website_sections
        WHERE id=?
        `,

                [
                    id
                ]

            );



        if (!section) {

            throw new Error(
                "Section not found."
            );

        }



        if (section.content_json) {


            try {


                section.content_json =
                    JSON.parse(
                        section.content_json
                    );


            }
            catch (error) {


                section.content_json = {};

            }


        }
        else {


            section.content_json = {};


        }

        return section;

    };

// =====================================
// CREATE SECTION
// =====================================

exports.createSection =
    async (
        pageId,
        data
    ) => {


        const {

            section_name,
            section_type

        } = data;



        const content =
            data.content_json ||
            defaultContent(section_type);



        const [result] =
            await db.query(

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

VALUES
(?,?,?,?,?,?)
`,

                [

                    pageId,

                    section_name,

                    section_type,

                    JSON.stringify(content),

                    data.sort_order || 0,

                    "active"

                ]

            );



        return {

            id:
                result.insertId,

            section_name,

            section_type,

            content_json:
                content

        };


    };



// =====================================
// UPDATE SECTION
// =====================================

exports.updateSection =
    async (
        id,
        data
    ) => {


        if (!data || Object.keys(data).length === 0) {

            throw new Error(
                "No update data provided."
            );

        }



        // Convert JSON content

        if (data.content_json) {


            data.content_json =
                JSON.stringify(
                    data.content_json
                );


        }



        // Manual editing means AI content changed

        if (data.content_json) {

            data.ai_generated = 0;

        }




        const [result] =
            await db.query(

                `
        UPDATE website_sections

        SET ?

        WHERE id=?

        `,

                [
                    data,
                    id
                ]

            );



        if (result.affectedRows === 0) {

            throw new Error(
                "Section not found."
            );

        }



        return {


            message:
                "Section updated successfully."

        };


    };

// =====================================
// CHANGE VISIBILITY
// =====================================

exports.updateStatus =
    async (
        id,
        status
    ) => {


        await db.query(

            `
UPDATE website_sections
SET status=?
WHERE id=?
`,

            [
                status,
                id
            ]

        );



        return {

            status

        };

    };



// =====================================
// DELETE SECTION
// =====================================

exports.deleteSection =
    async (id) => {


        await db.query(

            `
DELETE FROM website_sections
WHERE id=?
`,

            [
                id
            ]

        );


        return {

            message:
                "Section deleted"

        };

    };



// =====================================
// REORDER SECTIONS
// =====================================

exports.reorderSections =
    async (sections) => {


        for (
            const item of sections
        ) {


            await db.query(

                `
UPDATE website_sections
SET sort_order=?
WHERE id=?
`,

                [

                    item.sort_order,

                    item.id

                ]

            );


        }


        return {

            message:
                "Sections reordered"

        };


    };