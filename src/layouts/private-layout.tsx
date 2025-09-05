import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "lucide-react";
import { Outlet } from "react-router";
import AppSidebar from "./sidebar";

export default function PrivateLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-muted/20 to-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-8 w-8 rounded-lg hover:bg-accent transition-colors" />
              <div className="hidden lg:block">
                <h1 className="text-lg font-semibold text-foreground">
                  Catatin
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage your finances easily
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-8 bg-gradient-to-br from-background to-muted/30">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
