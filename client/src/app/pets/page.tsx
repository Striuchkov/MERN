'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Use environment variable for API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

export default function PetsPage() {
  const [pets, setPets] = useState([]);
  const [users, setUsers] = useState([]); // For owner dropdown and name lookup
  const [formData, setFormData] = useState({ name: '', species: '', ownerId: '' });
  const [loading, setLoading] = useState(true);

  // Fetch all pets and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const petsRes = await fetch(`${API_BASE_URL}/api/pets`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!petsRes.ok) throw new Error('Failed to fetch pets');
        const petsData = await petsRes.json();
        setPets(petsData);

        const usersRes = await fetch(`${API_BASE_URL}/api/users`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!usersRes.ok) throw new Error('Failed to fetch users');
        const usersData = await res.json();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle form submission to add a new pet
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/pets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          species: formData.species,
          ownerIds: formData.ownerId ? [formData.ownerId] : [], // Send as array
        }),
      });
      if (!res.ok) throw new Error('Failed to create pet');
      const newPet = await res.json();
      setPets([...pets, newPet]); // Add new pet to list
      setFormData({ name: '', species: '', ownerId: '' }); // Reset form
    } catch (error) {
      console.error('Error creating pet:', error);
    }
  };

  // Helper to get owner name by ID
  const getOwnerName = (ownerId: string) => {
    const owner = users.find((user) => user._id === ownerId);
    return owner ? owner.name : 'Unknown';
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Pets</h1>

      {/* Form to Add Pet */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Pet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              type="text"
              placeholder="Species"
              value={formData.species}
              onChange={(e) => setFormData({ ...formData, species: e.target.value })}
              required
            />
            <Select
              value={formData.ownerId}
              onValueChange={(value) => setFormData({ ...formData, ownerId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an owner" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user._id} value={user._id}>
                    {user.firstName} {user.lastName} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit">Add Pet</Button>
          </form>
        </CardContent>
      </Card>

      {/* List of Pets */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pets.length === 0 ? (
          <p>No pets found.</p>
        ) : (
          pets.map((pet) => (
            <Card key={pet._id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link href={`/pets/${pet._id}`} className="text-blue-500 hover:underline">
                    {pet.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{pet.species}</p>
                <p className="text-blue-500">{pet._id}</p>
                <div className="mt-2">
                  <p>Owners:</p>
                  {pet.owners?.length > 0 ? (
                    pet.owners.map((owner) => (
                      <div key={owner._id || owner} className="mt-1">
                        <Link
                          href={`/users/${owner._id || owner}`}
                          className="font-bold text-blue-500 hover:underline"
                        >
                          {owner.firstName || getOwnerName(owner)} {owner.lastName || ""}
                        </Link>
                        <br />
                        <span className="text-blue-500">{owner._id || owner}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm">None</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}