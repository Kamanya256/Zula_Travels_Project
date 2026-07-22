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

exports.createPage = async (data) => {

    const {
        website_id,
        title,
        slug,
        page_type
    } = data;

    // Create page first

    const [result] = await db.query(

        `
        INSERT INTO website_pages
        (
            website_id,
            title,
            slug,
            page_type
        )

        VALUES(?,?,?,?)

        `,

        [
            website_id,
            title,
            slug,
            page_type
        ]

    );

    const pageId = result.insertId;



    const defaultSections = {


        gallery: [
            "gallery_grid",
            "testimonials"
        ],


        rooms: [
            "room_listing",
            "booking"
        ],


        restaurant: [
            "menu",
            "gallery"
        ],


        hospital: [
            "doctors",
            "services",
            "gallery"
        ],


        tour_operator: [
            "packages",
            "destinations",
            "gallery",
            "booking"
        ],


        car_rental: [
            "fleet",
            "drivers",
            "booking"
        ],


        contact: [
            "contact_form",
            "map"
        ],


        homepage: [
            "hero",
            "about",
            "gallery"
        ]

    };

    const sections =
        defaultSections[page_type]
        ||
        [
            "hero",
            "content",
            "gallery"
        ];

    let order = 1;

    for (const section of sections) {


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

        VALUES(?,?,?,?,?,'active')

        `,

            [

                pageId,

                section,

                section,


                JSON.stringify({

                    title: section,

                    subtitle: "",

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

                }),


                order++

            ]);


    }

    return {

        id: pageId,

        title,

        slug

    };


};

// =====================================
// UPDATE PAGE
// =====================================

exports.updatePage = async (id, data) => {


    if (!data || Object.keys(data).length === 0) {

        throw new Error(
            "No update data provided."
        );

    }

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
            "Page updated successfully."

    };
};
// =====================================
// DELETE PAGE
// =====================================

exports.deletePage = async (id) => {


    // First remove sections belonging to page

    await db.query(

        `
        DELETE FROM website_sections
        WHERE page_id=?
        `,

        [
            id
        ]

    );



    // Then remove the page

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
            "Page and sections deleted successfully."

    };


};