"use client";

import SideBar from "@/components/dashboard/SideBar";

export default function DashboardLayput({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex gap-2 bg-foreground text-background min-h-screen">
      <SideBar />
      <div className="ml-80 w-full p-4">{children}</div>
    </main>
  );
}
