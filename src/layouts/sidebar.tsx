import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ArrowLeftRight,
  BarChart3,
  DollarSign,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router";

export default function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      description: "Your financial overview",
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: ArrowLeftRight,
      description: "Manage income & expenses",
    },
    {
      name: "Reports",
      href: "/reports",
      icon: BarChart3,
      description: "Analytics and statistics",
    },
  ];

  return (
    <Sidebar className="border-r border-sidebar-border bg-gradient-to-b from-sidebar to-sidebar/95">
      <SidebarHeader className="border-b border-sidebar-border/50 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-primary-foreground" />
          </div>
          {state !== "collapsed" && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">
                Catatin
              </h1>
              <p className="text-xs text-sidebar-foreground/60">
                Manage your finances
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-sidebar-foreground/60 mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        relative group h-12 rounded-lg transition-all duration-200
                      `}
                    >
                      <Link
                        to={item.href}
                        className="flex items-center gap-3 px-3"
                      >
                        <item.icon className="h-5 w-5 transition-colors" />
                        {state !== "collapsed" && (
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">
                              {item.name}
                            </span>
                            <span
                              className={`text-xs ${
                                isActive ? "text-gray-500" : "text-gray-400"
                              }`}
                            >
                              {item.description}
                            </span>
                          </div>
                        )}
                        {isActive && (
                          <div className="absolute right-2 h-2 w-2 rounded-full bg-primary-foreground/80" />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/50 p-4">
        <Button
          variant="outline"
          className="w-full justify-start h-10 border-sidebar-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {state !== "collapsed" && "Logout"}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
