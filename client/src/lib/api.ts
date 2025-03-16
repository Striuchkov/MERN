const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

// Define the User interface based on expected API response
interface User {
  id?: string; // Optional if returned by server
  name: string;
  email: string;
  password?: string; // Optional if not returned in fetch
}

// Fetch all users
export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

// Create a new user
export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}