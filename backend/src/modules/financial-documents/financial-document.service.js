// ======================================================
// ZULA TRAVELS 2026
// FINANCIAL DOCUMENT SERVICE
// ======================================================



const db = require("../../config/db");




// ======================================================
// CREATE FINANCIAL DOCUMENT
// ======================================================


exports.createDocument = async (

  connection,

  bookingId,

  paymentId,

  userId,

  documentType,

  amount,

  currency

) => {



  const documentNumber =

    documentType
      .toUpperCase()
      .substring(0, 3)

    +

    "-"

    +

    Date.now();





  const [result] = await connection.query(

    `
        INSERT INTO financial_documents
        (

            booking_id,

            payment_id,

            user_id,

            document_type,

            document_number,

            amount,

            currency

        )


        VALUES

        (?,?,?,?,?,?,?)

        `,

    [

      bookingId,

      paymentId,

      userId,

      documentType,

      documentNumber,

      amount,

      currency

    ]

  );




  return {

    document_id:
      result.insertId,


    document_number:
      documentNumber

  };


};





// ======================================================
// GET USER DOCUMENTS
// ======================================================


exports.getUserDocuments = async (userId) => {


  const [rows] =
    await db.query(

      `
        SELECT *

        FROM financial_documents

        WHERE user_id = ?

        ORDER BY id DESC

        `,

      [
        userId
      ]

    );


  return rows;


};