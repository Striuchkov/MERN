'use client';

import { SignedIn, SignedOut } from '@clerk/nextjs';
import { SidebarLeft } from "@/components/sidebar-left"
import { SidebarRight } from "@/components/sidebar-right"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar" // Adjust based on actual imports


import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

// Default layout for logged-out users
function DefaultHome() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <p>Please sign in to access the dashboard.</p>
    </div>
  );
}

// Sidebar layout for logged-in users
 function SidebarHome() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
      <SidebarLeft />
      <SidebarInset>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50" />
          <div className="mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50" />
        </div>
      </SidebarInset>
      <SidebarRight />
      </div>
    </SidebarProvider>
  );
}

export default function Home() {

  return (
    <>
      <SignedIn>
        <SidebarHome />
      </SignedIn>
      <SignedOut>
        <DefaultHome />
      </SignedOut>
    </>
  );
}   

