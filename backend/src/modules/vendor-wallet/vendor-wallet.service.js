const db = require("../../config/db");


// CREATE WALLET FOR VENDOR

exports.createWallet = async (vendorId) => {


    const [existing] =
        await db.query(
            `
        SELECT *
        FROM vendor_wallets
        WHERE vendor_id=?
        `,
            [vendorId]
        );


    if (existing.length)
        return existing[0];



    const [result] =
        await db.query(

            `
        INSERT INTO vendor_wallets
        (
            vendor_id
        )
        VALUES(?)
        `,

            [
                vendorId
            ]

        );


    return {

        wallet_id:
            result.insertId,

        vendor_id:
            vendorId

    };

};



// GET WALLET

exports.getWallet = async (vendorId) => {


    const [[wallet]] =
        await db.query(

            `
SELECT *
FROM vendor_wallets
WHERE vendor_id=?
`,

            [vendorId]

        );


    if (!wallet)
        throw new Error(
            "Wallet not found"
        );


    return wallet;


};




// ADD PENDING BALANCE

exports.addPendingBalance =
    async (
        vendorId,
        amount,
        bookingId,
        paymentId
    ) => {


        const wallet =
            await exports.getWallet(vendorId);



        await db.query(

            `
UPDATE vendor_wallets

SET pending_balance =
pending_balance + ?

WHERE id=?

`,

            [
                amount,
                wallet.id
            ]

        );



        await db.query(

            `
INSERT INTO wallet_transactions

(
wallet_id,
vendor_id,
booking_id,
payment_id,
transaction_type,
amount,
balance_before,
balance_after,
description

)

VALUES(?,?,?,?,?,?,?,?,?)

`,

            [

                wallet.id,

                vendorId,

                bookingId,

                paymentId,

                "booking_payment",

                amount,

                wallet.pending_balance,

                wallet.pending_balance + amount,

                "Booking payment received"

            ]

        );


        return true;


    };