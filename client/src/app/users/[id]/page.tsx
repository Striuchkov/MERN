'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Use environment variable for API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

export default function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
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
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-blue-500">{user._id}</p>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Pets:</h2>
        {user.pets && user.pets.length > 0 ? (
          <ul className="mt-2 space-y-2">
          {user.pets.map((pet) => (
            <li key={pet._id || pet}>
              <Link href={`/pets/${pet._id || pet}`} className="text-blue-500 hover:underline">
                {pet.name || pet}
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