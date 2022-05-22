/**
 *
 * DO NOT MODIFY THIS FILE
 * DO NOT MODIFY THIS FILE
 * DO NOT MODIFY THIS FILE
 *
 * Consider functions in this file to represent API endpoints.
 * Their implementation should be a black box.
 *
 */

interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Acts as our database
const users: User[] = [];

// Return all users
export function getUsers(): User[] {
  return JSON.parse(JSON.stringify(users));
}

// Creates a user with the given details and returns their generated ID.
export function createUser(
  firstName: string,
  lastName: string,
  email: string,
): String {
  // Just the fields together with some random string
  const userId: string = `${firstName}${lastName}${email}-${Math.random().toString().slice(-5)}`;
  return createUserWithId(firstName, lastName, email, userId);
}

// Creates a user with the given details and with the given ID.
export function createUserWithId(
  firstName: string,
  lastName: string,
  email: string,
  userId: string,
): String {
  users.push({
    userId,
    email,
    firstName,
    lastName
  });
  return userId;
}

// Removes a user with the given ID
export function removeUser(userId: string): Boolean {
  const userIndex = users.findIndex((user) => user.userId == userId);

  if (userIndex > -1) {
    users.splice(userIndex, 1);
    return true; // user removed
  } else {
    return false; // user not found
  }
}
