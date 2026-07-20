const db = require("../../config/db");

// =====================================
// GET VENDOR ID FROM USER
// =====================================

async function getVendorId(userId) {

    const [[vendor]] = await db.query(
        `
        SELECT id
        FROM vendors
        WHERE user_id = ?
        `,
        [userId]
    );

    if (!vendor) {
        throw new Error("Vendor account not found.");
    }

    return vendor.id;

}

// =====================================
// CREATE WEBSITE
// =====================================

exports.createWebsite = async (userId, data = {}) => {

    const vendorId = await getVendorId(userId);

    const {
        website_name,
        subdomain,
        logo,
        hero_image,
        about,
        contact_email,
        contact_phone,
        whatsapp,
        address,
        city,
        country
    } = data;

    if (!website_name) {
        throw new Error("Website name is required.");
    }

    if (!subdomain) {
        throw new Error("Subdomain is required.");
    }

    const [[exists]] = await db.query(
        `
        SELECT id
        FROM vendor_websites
        WHERE subdomain = ?
        `,
        [subdomain]
    );

    if (exists) {
        throw new Error("Subdomain already exists.");
    }

    const [result] = await db.query(
        `
        INSERT INTO vendor_websites
        (
            vendor_id,
            website_name,
            subdomain,
            logo,
            hero_image,
            about,
            contact_email,
            contact_phone,
            whatsapp,
            address,
            city,
            country,
            status
        )
        VALUES
        (?,?,?,?,?,?,?,?,?,?,?,?, 'draft')
        `,
        [
            vendorId,
            website_name,
            subdomain,
            logo || null,
            hero_image || null,
            about || null,
            contact_email || null,
            contact_phone || null,
            whatsapp || null,
            address || null,
            city || null,
            country || null
        ]
    );

    return {
        website_id: result.insertId,
        vendor_id: vendorId,
        website_name,
        subdomain,
        status: "draft"
    };

};

// =====================================
// GET MY WEBSITE
// =====================================

exports.getMyWebsite = async (userId) => {

    const vendorId = await getVendorId(userId);

    const [[website]] = await db.query(
        `
        SELECT *
        FROM vendor_websites
        WHERE vendor_id = ?
        LIMIT 1
        `,
        [vendorId]
    );

    return website;

};

// =====================================
// UPDATE WEBSITE
// =====================================

exports.updateWebsite = async (
    id,
    userId,
    data
) => {

    const vendorId = await getVendorId(userId);

    await db.query(
        `
        UPDATE vendor_websites
        SET ?
        WHERE id = ?
        AND vendor_id = ?
        `,
        [
            data,
            id,
            vendorId
        ]
    );

    return {
        message: "Website updated successfully."
    };

};

// =====================================
// PUBLISH WEBSITE
// =====================================

exports.publishWebsite = async (
    id,
    userId
) => {

    const vendorId = await getVendorId(userId);

    await db.query(
        `
        UPDATE vendor_websites
        SET status='published'
        WHERE id = ?
        AND vendor_id = ?
        `,
        [
            id,
            vendorId
        ]
    );

    return {
        status: "published"
    };

};

// =====================================
// SUSPEND WEBSITE
// =====================================

exports.deleteWebsite = async (
    id,
    userId
) => {

    const vendorId = await getVendorId(userId);

    await db.query(
        `
        UPDATE vendor_websites
        SET status='suspended'
        WHERE id = ?
        AND vendor_id = ?
        `,
        [
            id,
            vendorId
        ]
    );

    return {
        status: "suspended"
    };

};