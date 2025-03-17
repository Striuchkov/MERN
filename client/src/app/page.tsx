'use client';

import { SignedIn, SignedOut } from '@clerk/nextjs';

// Default content for signed-out users
function DefaultHome() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <p>Please sign in to access the dashboard.</p>
    </div>
  );
}

// Minimal content for signed-in users (layout provides "Dashboard")
function DashboardHome() {
  return null; // Empty for now, as layout handles "Dashboard"
  // Optionally add content later, e.g.:
  // return <div className="p-4">Welcome to your dashboard!</div>;
}

export default function Home() {
  return (
    <>
      <SignedIn>
        <DashboardHome />
      </SignedIn>
      <SignedOut>
        <DefaultHome />
      </SignedOut>
    </>
  );
}