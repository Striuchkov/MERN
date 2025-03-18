'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Define User interface
interface User {
  _id: string;
  type: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  additionalPhoneNumber?: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  status: string;
  rDVM: string;
  marketingChannel: string;
  pets: string[] | { _id: string; name: string }[]; // Can be IDs or populated objects
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<{
    type: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    additionalPhoneNumber: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    status: string;
    rDVM: string;
    marketingChannel: string;
  }>({
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    additionalPhoneNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    status: '',
    rDVM: '',
    marketingChannel: '',
  });
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed to create user');
      const newUser = await res.json();
      setUsers([...users, newUser]);
      setFormData({
        type: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        additionalPhoneNumber: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        status: '',
        rDVM: '',
        marketingChannel: '',
      });
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
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Individual">Individual</SelectItem>
                <SelectItem value="Organization">Organization</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
            <Input
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />
            <Input
              placeholder="Additional Phone Number"
              value={formData.additionalPhoneNumber}
              onChange={(e) => setFormData({ ...formData, additionalPhoneNumber: e.target.value })}
            />
            <Input
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
            <Input
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <Input
              placeholder="State/Province"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              required
            />
            <Input
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              required
            />
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="rDVM"
              value={formData.rDVM}
              onChange={(e) => setFormData({ ...formData, rDVM: e.target.value })}
              required
            />
            <Input
              placeholder="Marketing Channel"
              value={formData.marketingChannel}
              onChange={(e) => setFormData({ ...formData, marketingChannel: e.target.value })}
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
                <CardTitle className="text-lg">
                  <Link href={`/users/${user._id}`} className="text-blue-500 hover:underline">
                    {user.firstName} {user.lastName}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-blue-500">{user._id}</p>
                <p>Type: {user.type}</p>
                <p>Phone: {user.phoneNumber}</p>
                {user.additionalPhoneNumber && (
                  <p>Additional Phone: {user.additionalPhoneNumber}</p>
                )}
                <p>
                  Address: {user.address}, {user.city}, {user.state} {user.postalCode}
                </p>
                <p>Status: {user.status}</p>
                <p>rDVM: {user.rDVM}</p>
                <p>Marketing Channel: {user.marketingChannel}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}