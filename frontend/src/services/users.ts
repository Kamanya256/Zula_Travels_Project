import { api } from "./api";

import {
  User,
  CreateUserPayload,
  UpdateUserPayload,
  UserStats,
} from "@/types/user";


// =====================================================
// GET ALL USERS
// =====================================================

export async function getUsers(): Promise<User[]> {

  const response =
    await api.get("/users");


  return response.data.users ?? [];

}



// =====================================================
// GET SINGLE USER
// =====================================================

export async function getUser(
  id: number
): Promise<User> {

  const response =
    await api.get(
      `/users/${id}`
    );


  return response.data.user;

}



// =====================================================
// CREATE USER
// =====================================================

export async function createUser(
  payload: CreateUserPayload
) {

  const response =
    await api.post(
      "/users/register",
      payload
    );


  return response.data;

}



// =====================================================
// UPDATE USER
// =====================================================

export async function updateUser(
  id: number,
  payload: UpdateUserPayload
) {

  const response =
    await api.put(
      `/users/${id}`,
      payload
    );


  return response.data;

}



// =====================================================
// DELETE USER
// =====================================================

export async function deleteUser(
  id: number
) {

  const response =
    await api.delete(
      `/users/${id}`
    );


  return response.data;

}



// =====================================================
// DELETED USERS
// =====================================================

export async function getDeletedUsers()
  : Promise<User[]> {


  const response =
    await api.get(
      "/users/deleted"
    );


  return response.data.users ?? [];

}



// =====================================================
// RESTORE
// =====================================================

export async function restoreUser(
  id: number
) {

  const response =
    await api.put(
      `/users/restore/${id}`
    );


  return response.data;

}



// =====================================================
// FORCE DELETE
// =====================================================

export async function forceDeleteUser(
  id: number
) {

  const response =
    await api.delete(
      `/users/force/${id}`
    );


  return response.data;

}



// =====================================================
// STATS
// =====================================================

export async function getUserStats()
  : Promise<UserStats> {


  const response =
    await api.get(
      "/users/stats"
    );


  return response.data.stats;

}