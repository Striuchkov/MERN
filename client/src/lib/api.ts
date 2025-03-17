const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

interface User {
  id: string; // e.g., C123456789
  name: string;
  email: string;
  pets?: string[]; // Array of Pet _ids
}

interface Pet {
  id: string; // e.g., P987654321
  name: string;
  species: string;
  owners?: string[]; // Array of User _ids
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}

export async function fetchPets(): Promise<Pet[]> {
  const res = await fetch(`${API_BASE_URL}/api/pets`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to fetch pets');
  return res.json();
}

export async function createPet(data: {
  name: string;
  species: string;
  ownerIds: string[];
}): Promise<Pet> {
  const res = await fetch(`${API_BASE_URL}/api/pets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create pet');
  return res.json();
}