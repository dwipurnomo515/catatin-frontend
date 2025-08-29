import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DollarSign,
  PieChart,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Summary Dashboard",
      description:
        "View total income and expenses, monthly summary charts, and your final balance at a glance",
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Transaction Management",
      description:
        "Easily add income and expenses, filter by category or date, edit or delete records, and create custom categories",
    },
    {
      icon: <PieChart className="h-6 w-6" />,
      title: "Financial Reports",
      description:
        "Generate monthly reports with pie chart statistics, export data, and download in PDF or Excel format",
    },
  ];

  return (
    <div className="min-h-screen ">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Catatin</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Sign In
              </Button>
              <Button onClick={() => navigate("/register")}>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 The Leading Platform for Financial Management
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Manage Your Finances with
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {" "}
              Catatin
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A powerful and easy-to-use financial record-keeping app. Track your
            income and expenses, and gain in-depth insights into your finances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="text-lg px-8"
            >
              Sign Up
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/demo")}
              className="text-lg px-8"
            >
              Log In
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your finances better
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card/50 backdrop-blur-sm border-0 shadow-soft hover:shadow-medium transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-2">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Manage Your Finances?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have experienced the ease of managing
            their finances.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/register")}
            className="text-lg px-8"
          >
            Get Started - Free!
          </Button>
        </div>
      </section>

      <footer className="bg-card border-t py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-r from-primary to-primary/80 rounded-md flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Catatin</span>
          </div>
          <p className="text-muted-foreground">
            © 2025 Catatin All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
