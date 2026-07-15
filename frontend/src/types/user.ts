// =====================================================
// ZULA TRAVELS 2026
// USER TYPES
// =====================================================


// =====================================================
// USER STATUS
// =====================================================

export type UserStatus =
  | "active"
  | "inactive"
  | "pending"
  | "suspended"
  | "rejected";


// =====================================================
// USER TYPE
// =====================================================

export type UserType =
  | "customer"
  | "vendor"
  | "admin";



// =====================================================
// USER OBJECT
// =====================================================

export interface User {

  id: number;


  first_name: string;


  last_name: string | null;


  email: string;


  phone: string | null;


  password_hash?: string;


  user_type: UserType;


  status: UserStatus;



  roles: string[];



  profile_image?: string | null;



  email_verified: number;


  phone_verified: number;



  is_active: number;



  is_deleted: number;



  created_at?: string;



  updated_at?: string;



  last_login?: string | null;



  deleted_at?: string | null;



  deleted_by?: number | null;


}



// =====================================================
// CREATE USER PAYLOAD
// =====================================================

export interface CreateUserPayload {


  first_name: string;



  last_name?: string;



  email: string;



  phone?: string;



  password: string;



  user_type: UserType;



  status?: UserStatus;



}



// =====================================================
// UPDATE USER PAYLOAD
// =====================================================

export interface UpdateUserPayload {


  first_name?: string;



  last_name?: string;



  email?: string;



  phone?: string;



  status?: UserStatus;



  user_type?: UserType;



  profile_image?: string | null;



}



// =====================================================
// LOGIN USER
// =====================================================

export interface LoginUser {


  email: string;


  password: string;


}



// =====================================================
// AUTH RESPONSE USER
// =====================================================

export interface AuthUser {


  id: number;


  first_name: string;


  last_name: string | null;


  email: string;


  phone: string | null;


  user_type: UserType;


  status: UserStatus;


  roles: string[];


  profile_image?: string | null;


  email_verified: number;


  phone_verified: number;


}



// =====================================================
// USER STATISTICS
// =====================================================

export interface UserStats {


  total_users: number;


  active_users: number;


  inactive_users: number;


  pending_users: number;


  suspended_users: number;


  rejected_users: number;


  customers: number;


  vendors: number;


  admins: number;


}