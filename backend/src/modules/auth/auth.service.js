const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");





// ============================
// REGISTER
// ============================

exports.register = async (data) => {


  const {

    first_name,

    last_name,

    email,

    phone,

    password,

    user_type = "customer"

  } = data;



  if (
    !first_name ||
    !email ||
    !password
  ) {

    throw new Error(
      "Required fields missing"
    );

  }




  const [exists] = await db.query(

    `
SELECT id
FROM users
WHERE email=?
`,
    [email]

  );



  if (exists.length) {

    throw new Error(
      "Email already exists"
    );

  }




  const password_hash =
    await bcrypt.hash(
      password,
      10
    );



  const [result] = await db.query(

    `
INSERT INTO users

(
first_name,
last_name,
email,
phone,
password_hash,
user_type,
status
)

VALUES
(?,?,?,?,?,?,?)

`,

    [

      first_name,

      last_name,

      email,

      phone || null,

      password_hash,

      user_type,

      "active"

    ]


  );




  // assign default role


  const [role] = await db.query(

    `
SELECT id
FROM roles
WHERE role_name=?

`,

    [user_type]

  );



  if (role.length) {


    await db.query(

      `
INSERT INTO user_roles

(
user_id,
role_id
)

VALUES(?,?)

`,

      [
        result.insertId,
        role[0].id
      ]

    );


  }



  return {


    success: true,

    message: "Registration successful",

    user_id: result.insertId


  };



};







// ============================
// LOGIN
// ============================

exports.login = async (data) => {


  const {

    email,

    password

  } = data;



  if (!email || !password) {

    throw new Error(
      "Email and password required"
    );

  }




  const [rows] = await db.query(

    `
SELECT *
FROM users
WHERE email=?
LIMIT 1

`,

    [email]

  );



  if (!rows.length) {

    throw new Error(
      "Invalid email or password"
    );

  }



  const user = rows[0];





  const passwordMatch =
    await bcrypt.compare(

      password,

      user.password_hash

    );



  if (!passwordMatch) {


    throw new Error(
      "Invalid email or password"
    );


  }






  // GET USER ROLES

  const [roles] = await db.query(

    `

SELECT

roles.role_name


FROM roles


JOIN user_roles

ON roles.id=user_roles.role_id


WHERE user_roles.user_id=?


`,

    [user.id]

  );





  const userRoles =
    roles.map(
      (role) => role.role_name
    );







  const token =
    jwt.sign(

      {

        id: user.id,

        email: user.email,

        roles: userRoles


      },

      process.env.JWT_SECRET ||
      "zula_secret_key",


      {

        expiresIn: "7d"

      }


    );







  return {


    success: true,


    message: "Login successful",


    token,



    user: {


      id: user.id,

      first_name: user.first_name,

      last_name: user.last_name,

      email: user.email,

      phone: user.phone,

      roles: userRoles,

      email_verified: user.email_verified || 0


    }


  };



};