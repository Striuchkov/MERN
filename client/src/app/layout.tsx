import './globals.css';
import { Inter } from 'next/font/google';
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SidebarLeft } from '@/components/sidebar-left';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MERN + Next.js + Shadcn UI',
  description: 'A user management app with Next.js and Shadcn UI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen bg-gray-100`}>
          <SignedIn>
            <SidebarProvider>
              <div className="flex h-screen w-full">
                {/* Left Sidebar */}
                <SidebarLeft />

                {/* Main Content with Header */}
                <SidebarInset>
                  <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background shadow">
                    <div className="flex flex-1 items-center gap-2 px-3">
                      <SidebarTrigger />
                      <Separator orientation="vertical" className="mr-2 h-4" />
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1">
                              <Link href="/">Home</Link>
                            </BreadcrumbPage>
                          </BreadcrumbItem>
                          <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1">
                              <Link href="/users">Users</Link>
                            </BreadcrumbPage>
                          </BreadcrumbItem>
                          <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1">
                              <Link href="/calculators">Calculators</Link>
                            </BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                      <div className="ml-auto flex gap-2">
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </div>
                  </header>
                  <main className="flex-1 p-4 overflow-auto">{children}</main>
                </SidebarInset>
              </div>
            </SidebarProvider>
          </SignedIn>

          <SignedOut>
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
                  <Link href="/sign-in">
                    <Button variant="ghost">Sign In</Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button variant="ghost">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </nav>
            <main className="container mx-auto p-4">{children}</main>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}