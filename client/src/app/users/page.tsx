'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Use environment variable for API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/users`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Handle form submission to add a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to create user');
      const newUser = await res.json();
      setUsers([...users, newUser]); // Add new user to list
      setFormData({ name: '', email: '', password: '' }); // Reset form
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

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
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Button type="submit">Add User</Button>
          </form>
        </CardContent>
      </Card>

      {/* List of Users */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <Card key={user._id}>
              <CardHeader>
                <CardTitle className="text-lg">{user.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-blue-500">{user._id}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}