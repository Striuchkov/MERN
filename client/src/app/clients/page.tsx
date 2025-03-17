'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchUsers, createUser } from '@/lib/api';
import { SignedIn, SignedOut } from '@clerk/nextjs';

// Define User type (consistent with /lib/api.ts)
interface User {
  _id?: string; // MongoDB ID from backend
  name: string;
  email: string;
  clerkId?: string; // Optional if synced from Clerk
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = await createUser(formData);
      setUsers([...users, newUser]);
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <>
      <SignedIn>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">User Management</h1>

          {/* Form to Add User */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New User</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <Button type="submit">Add User</Button>
              </form>
            </CardContent>
          </Card>

          {/* User List */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
              <Card key={user._id || user.email}>
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{user.email}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold">Please Sign In</h1>
          <p>You need to be signed in to manage users.</p>
        </div>
      </SignedOut>
    </>
  );
}