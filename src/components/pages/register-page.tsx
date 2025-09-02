import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { DollarSign, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import RegisterHooks from "../hooks/register-hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { form, onSubmit } = RegisterHooks();

  const password = form.watch("password");
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = password ? getPasswordStrength(password) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">Catatin</span>
          </Link>
        </div>

        <Card className="shadow-medium border-0 bg-card/50 ">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Create New Account
            </CardTitle>
            <CardDescription>
              Start your journey to better financial management
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name={"username"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Username</FormLabel>
                        <FormControl>
                          <Input
                            id="name"
                            type="text"
                            placeholder="Enter your username"
                            required
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name={"email"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            placeholder="name@gmail.com"
                            required
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name={"password"}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create a strong password"
                              required
                              className="bg-background pr-10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormItem>
                    )}
                  />

                  {password && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">
                          Password Strength
                        </span>
                        <span
                          className={`font-medium ${
                            passwordStrength < 50
                              ? "text-destructive"
                              : passwordStrength < 75
                              ? "text-warning"
                              : "text-success"
                          }`}
                        >
                          {passwordStrength < 50
                            ? "Weak"
                            : passwordStrength < 75
                            ? "Medium"
                            : "Strong"}
                        </span>
                      </div>
                      <Progress value={passwordStrength} className="h-2" />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!form.formState.isValid ||passwordStrength < 50}
                >
                  Sign Up Now
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in here
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
