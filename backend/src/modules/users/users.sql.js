// ======================================================
// ZULA TRAVELS 2026
// USERS SQL QUERIES
// MariaDB Compatible
// ======================================================


// ======================================================
// GET ALL USERS
// ======================================================

exports.GET_USERS = `

SELECT

    u.id,
    u.first_name,
    u.last_name,
    u.email,
    u.phone,
    u.user_type,
    u.status,
    u.is_active,
    u.email_verified,
    u.phone_verified,
    u.profile_image,
    u.last_login,
    u.created_at,

    GROUP_CONCAT(
        DISTINCT r.role_name
        ORDER BY r.role_name
        SEPARATOR ','
    ) AS roles

FROM users u

LEFT JOIN user_roles ur
    ON u.id = ur.user_id

LEFT JOIN roles r
    ON ur.role_id = r.id

WHERE u.is_deleted = 0

GROUP BY u.id

ORDER BY u.id DESC;

`;



// ======================================================
// GET SINGLE USER
// ======================================================

exports.GET_USER = `

SELECT

    u.id,
    u.first_name,
    u.last_name,
    u.email,
    u.phone,
    u.user_type,
    u.status,
    u.is_active,
    u.email_verified,
    u.phone_verified,
    u.profile_image,
    u.last_login,
    u.created_at,
    u.updated_at

FROM users u

WHERE 
    u.id = ?

AND
    u.is_deleted = 0

LIMIT 1;

`;



// ======================================================
// GET USER BY EMAIL
// ======================================================

exports.GET_USER_BY_EMAIL = `

SELECT *

FROM users

WHERE email = ?

LIMIT 1;

`;



// ======================================================
// CHECK EMAIL EXISTS
// ======================================================

exports.CHECK_EMAIL_EXISTS = `

SELECT id

FROM users

WHERE email = ?

AND id <> ?

LIMIT 1;

`;



// ======================================================
// CREATE USER
// ======================================================

exports.CREATE_USER = `

INSERT INTO users

(
    first_name,
    last_name,
    email,
    phone,
    password_hash,
    user_type,
    status,
    email_verified,
    phone_verified,
    is_active
)

VALUES

(
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?,
    ?
);

`;



// ======================================================
// UPDATE USER
// ======================================================

exports.UPDATE_USER = `

UPDATE users

SET

    first_name = ?,
    last_name = ?,
    email = ?,
    phone = ?,
    user_type = ?,
    status = ?,
    updated_at = NOW()

WHERE id = ?

AND is_deleted = 0;

`;



// ======================================================
// UPDATE PROFILE IMAGE
// ======================================================

exports.UPDATE_PROFILE_IMAGE = `

UPDATE users

SET

    profile_image = ?,
    updated_at = NOW()

WHERE id = ?;

`;



// ======================================================
// UPDATE PASSWORD
// ======================================================

exports.UPDATE_PASSWORD = `

UPDATE users

SET

    password_hash = ?,
    reset_token = NULL,
    reset_token_expiry = NULL,
    updated_at = NOW()

WHERE id = ?;

`;



// ======================================================
// UPDATE LAST LOGIN
// ======================================================

exports.UPDATE_LAST_LOGIN = `

UPDATE users

SET

    last_login = NOW(),
    failed_login_attempts = 0

WHERE id = ?;

`;



// ======================================================
// FAILED LOGIN ATTEMPT
// ======================================================

exports.INCREMENT_FAILED_LOGIN = `

UPDATE users

SET

    failed_login_attempts =
    failed_login_attempts + 1

WHERE id = ?;

`;



// ======================================================
// VERIFY EMAIL
// ======================================================

exports.VERIFY_EMAIL = `

UPDATE users

SET

    email_verified = 1,
    updated_at = NOW()

WHERE id = ?;

`;



// ======================================================
// VERIFY PHONE
// ======================================================

exports.VERIFY_PHONE = `

UPDATE users

SET

    phone_verified = 1,
    updated_at = NOW()

WHERE id = ?;

`;



// ======================================================
// GET USER ROLES
// ======================================================

exports.GET_ROLES = `

SELECT

    r.id,
    r.role_name

FROM roles r

INNER JOIN user_roles ur

ON r.id = ur.role_id

WHERE ur.user_id = ?;

`;



// ======================================================
// GET ROLE BY NAME
// ======================================================

exports.GET_ROLE = `

SELECT

    id

FROM roles

WHERE role_name = ?

LIMIT 1;

`;



// ======================================================
// ASSIGN ROLE
// ======================================================

exports.ASSIGN_ROLE = `

INSERT INTO user_roles

(
    user_id,
    role_id
)

VALUES

(
    ?,
    ?
);

`;



// ======================================================
// REMOVE USER ROLES
// ======================================================

exports.DELETE_USER_ROLES = `

DELETE FROM user_roles

WHERE user_id = ?;

`;



// ======================================================
// SOFT DELETE USER
// ======================================================

exports.SOFT_DELETE_USER = `

UPDATE users

SET

    is_deleted = 1,
    deleted_at = NOW(),
    deleted_by = ?

WHERE id = ?

AND is_deleted = 0;

`;



// ======================================================
// RESTORE USER
// ======================================================

exports.RESTORE_USER = `

UPDATE users

SET

    is_deleted = 0,
    deleted_at = NULL,
    deleted_by = NULL

WHERE id = ?;

`;



// ======================================================
// GET DELETED USERS
// ======================================================

exports.GET_DELETED_USERS = `

SELECT

    id,
    first_name,
    last_name,
    email,
    phone,
    user_type,
    status,
    deleted_at

FROM users

WHERE is_deleted = 1

ORDER BY deleted_at DESC;

`;



// ======================================================
// FORCE DELETE
// ======================================================

exports.FORCE_DELETE_USER = `

DELETE FROM users

WHERE id = ?;

`;



// ======================================================
// USER STATISTICS
// ======================================================

exports.GET_USER_STATS = `

SELECT

    COUNT(*) AS total_users,

    SUM(status='active')
    AS active_users,

    SUM(status='inactive')
    AS inactive_users,

    SUM(status='pending')
    AS pending_users,

    SUM(status='suspended')
    AS suspended_users,

    SUM(status='rejected')
    AS rejected_users,

    SUM(user_type='customer')
    AS customers,

    SUM(user_type='vendor')
    AS vendors,

    SUM(user_type='admin')
    AS admins,

    SUM(email_verified=1)
    AS verified_emails,

    SUM(phone_verified=1)
    AS verified_phones

FROM users

WHERE is_deleted = 0;

`;