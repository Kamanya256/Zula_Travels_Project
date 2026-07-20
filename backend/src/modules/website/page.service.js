const db = require("../../config/db");


// =====================================
// GET ALL WEBSITE PAGES
// =====================================

exports.getPages = async (websiteId) => {


    const [rows] =
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


    return rows;

};



// =====================================
// GET SINGLE PAGE
// =====================================

exports.getPageById = async (id) => {


    const [[page]] =
        await db.query(
            `
        SELECT *
        FROM website_pages
        WHERE id=?
        `,
            [
                id
            ]
        );


    return page;

};



// =====================================
// CREATE PAGE
// =====================================

exports.createPage = async (
    websiteId,
    data
) => {


    const {

        title,
        slug,
        page_type

    } = data;



    const [result] =
        await db.query(

            `
        INSERT INTO website_pages
        (
            website_id,
            title,
            slug,
            page_type
        )

        VALUES
        (?,?,?,?)
        `,

            [
                websiteId,
                title,
                slug,
                page_type || "custom"
            ]

        );


    return {

        id:
            result.insertId,

        title,
        slug

    };

};



// =====================================
// UPDATE PAGE
// =====================================

exports.updatePage =
    async (
        id,
        data
    ) => {


        await db.query(

            `
UPDATE website_pages
SET ?
WHERE id=?
`,
            [
                data,
                id
            ]

        );


        return {

            message:
                "Page updated"

        };


    };



// =====================================
// DELETE PAGE
// =====================================

exports.deletePage =
    async (id) => {


        await db.query(

            `
DELETE FROM website_pages
WHERE id=?
`,
            [
                id
            ]

        );


        return {

            message:
                "Page deleted"

        };


    };