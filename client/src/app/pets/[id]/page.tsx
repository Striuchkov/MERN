'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// Use environment variable for API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

export default function PetPage() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/pets/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch pet');
        return res.json();
      })
      .then((data) => setPet(data))
      .catch((error) => console.error('Error fetching pet:', error));
  }, [id]);

  if (!pet) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{pet.name}</h1>
      <p className="text-gray-600">{pet.species}</p>
      <p className="text-blue-500">{pet._id}</p>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Owners:</h2>
        {pet.owners && pet.owners.length > 0 ? (
          <ul className="mt-2 space-y-2">
            {pet.owners.map((owner) => (
              <li key={owner._id || owner}>
                <Link
                  href={`/users/${owner._id || owner}`}
                  className="font-bold text-blue-500 hover:underline"
                >
                  {owner.name || 'Unknown'}
                </Link>
                <br />
                <span className="text-blue-500">{owner._id || owner}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm">No owners assigned.</p>
        )}
      </div>
    </div>
  );
}