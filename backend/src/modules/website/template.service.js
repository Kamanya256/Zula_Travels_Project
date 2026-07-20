const db = require("../../config/db");


// =====================================
// GET ALL ACTIVE TEMPLATES
// =====================================

exports.getTemplates = async () => {

    const [rows] = await db.query(
        `
        SELECT *
        FROM website_templates
        WHERE status='active'
        ORDER BY id ASC
        `
    );

    return rows;

};



// =====================================
// GET TEMPLATE BY BUSINESS TYPE
// =====================================

exports.getTemplateByBusinessType = async (
    businessType
) => {


    const [[template]] = await db.query(
        `
        SELECT *
        FROM website_templates
        WHERE business_type=?
        AND status='active'
        LIMIT 1
        `,
        [
            businessType
        ]
    );


    return template;

};




// =====================================
// APPLY TEMPLATE TO WEBSITE
// =====================================

exports.applyTemplate = async (

    websiteId,
    templateId

) => {


    const [[template]] = await db.query(

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



    await db.query(

        `
        UPDATE vendor_websites

        SET template_id=?

        WHERE id=?

        `,

        [
            templateId,
            websiteId
        ]

    );



    return {

        website_id:
            websiteId,

        template_id:
            templateId,

        template_name:
            template.name

    };


};




// =====================================
// GET WEBSITE TEMPLATE
// =====================================

exports.getWebsiteTemplate = async (

    websiteId

) => {


    const [[website]] =
        await db.query(

            `
            SELECT

            vw.id,
            vw.website_name,

            wt.id AS template_id,
            wt.name AS template_name,
            wt.business_type,
            wt.layout

            FROM vendor_websites vw

            LEFT JOIN website_templates wt

            ON wt.id = vw.template_id

            WHERE vw.id=?

            `,

            [
                websiteId
            ]

        );


    return website;

};