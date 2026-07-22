const db = require("../../config/db");


// Get complete website editor data
exports.getEditor = async (vendorId) => {


    const [websites] = await db.query(
        `
        SELECT *
        FROM vendor_websites
        WHERE vendor_id = ?
        LIMIT 1
        `,
        [vendorId]
    );


    if (websites.length === 0) {
        throw new Error("Website not found");
    }


    const website = websites[0];


    const [pages] = await db.query(
        `
        SELECT *
        FROM website_pages
        WHERE website_id = ?
        ORDER BY sort_order ASC
        `,
        [website.id]
    );


    for (const page of pages) {


        const [sections] = await db.query(
            `
            SELECT *
            FROM website_sections
            WHERE page_id = ?
            ORDER BY sort_order ASC
            `,
            [page.id]
        );


        page.sections = sections.map(section => ({

            id: section.id,

            name: section.section_name,

            type: section.section_type,

            content:
                typeof section.content_json === "string"
                    ?
                    JSON.parse(section.content_json)
                    :
                    section.content_json,


            status: section.status

        }));

    }


    return {

        website,

        pages

    };


};





// Update website settings

exports.updateSettings = async (
    vendorId,
    data
) => {


    const allowed = [

        "website_name",
        "logo",
        "favicon",
        "hero_image",
        "primary_color",
        "secondary_color",
        "accent_color",
        "font_family",
        "about",
        "contact_email",
        "contact_phone",
        "whatsapp",
        "seo_title",
        "seo_description"

    ];


    let fields = [];
    let values = [];



    allowed.forEach(field => {

        if (data[field] !== undefined) {

            fields.push(`${field}=?`);

            values.push(data[field]);

        }

    });



    if (fields.length === 0) {

        throw new Error(
            "No fields provided"
        );

    }



    values.push(vendorId);



    await db.query(
        `
        UPDATE vendor_websites vw

        JOIN vendors v

        ON vw.vendor_id=v.id

        SET ${fields.join(",")}

        WHERE v.id=?

        `,
        values
    );



    return {
        message: "Website settings updated"
    };


};






// Update section content

exports.updateSection = async (
    sectionId,
    data
) => {


    await db.query(

        `
        UPDATE website_sections

        SET content_json=?,

        ai_generated=?

        WHERE id=?

        `,

        [

            JSON.stringify(data.content),

            data.ai_generated || 0,

            sectionId

        ]

    );



    return {

        message: "Section updated successfully"

    };


};