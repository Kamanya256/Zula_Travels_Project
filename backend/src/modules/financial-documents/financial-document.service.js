const db = require("../../config/db");


// =====================================
// CREATE FINANCIAL DOCUMENT
// =====================================

exports.createDocument = async (
  bookingId,
  paymentId,
  userId,
  documentType,
  amount,
  currency
) => {


  const prefix =
    documentType === "invoice"
      ? "INV"
      : documentType === "receipt"
        ? "REC"
        : "PRO";


  const documentNumber =
    prefix + "-" + Date.now();



  const [result] =
    await db.query(
      `
            INSERT INTO financial_documents
            (
                booking_id,
                payment_id,
                user_id,
                document_type,
                document_number,
                amount,
                currency,
                status
            )

            VALUES
            (?,?,?,?,?,?,?,'issued')
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




// =====================================
// GET USER DOCUMENTS
// =====================================

exports.getUserDocuments = async (userId) => {


  const [rows] =
    await db.query(
      `
            SELECT *
            FROM financial_documents
            WHERE user_id=?
            ORDER BY id DESC
            `,
      [
        userId
      ]
    );


  return rows;


};