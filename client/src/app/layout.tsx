import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MERN + Next.js + Shadcn UI',
  description: 'A user management app with Next.js and Shadcn UI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen bg-gray-100`}>
          <nav className="bg-white shadow p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex gap-4">
                <Link href="/">
                  <Button variant="ghost">Home</Button>
                </Link>
                <Link href="/calculators">
                  <Button variant="ghost">Calculators</Button>
                </Link>
              </div>
              <div className="flex gap-4">
                <SignedOut>
                  <Link href="/sign-in">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button variant="ghost">Sign Up</Button>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}