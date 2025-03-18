'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Define interfaces for User and Pet
interface Pet {
  _id: string;
  name?: string; // Optional because it might not be populated
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  phoneNumber: string;
  additionalPhoneNumber?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  status: string;
  rDVM: string;
  marketingChannel: string;
  pets: Pet[] | string[]; // Can be array of objects (populated) or IDs
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/users/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch user');
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!user) return <p className="p-4">User not found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">
        {user.firstName} {user.lastName}
      </h1>
      <p className="text-gray-600">ID: {user._id}</p>
      <p>Type: {user.type}</p>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phoneNumber}</p>
      {user.additionalPhoneNumber && (
        <p>Additional Phone Number: {user.additionalPhoneNumber}</p>
      )}
      <p>
        Address: {user.address}, {user.city}, {user.state} {user.postalCode}
      </p>
      <p>Status: {user.status}</p>
      <p>rDVM: {user.rDVM}</p>
      <p>Marketing Channel: {user.marketingChannel}</p>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Pets:</h2>
        {user.pets && user.pets.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {user.pets.map((pet: Pet | string) => (
              <li key={typeof pet === 'string' ? pet : pet._id}>
                <Link
                  href={`/pets/${typeof pet === 'string' ? pet : pet._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {typeof pet === 'string' ? pet : pet.name || pet._id}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm">No pets assigned.</p>
        )}
      </div>
    </div>
  );
}