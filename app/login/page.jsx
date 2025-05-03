"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FaUserGraduate,
  FaUserShield,
  FaSignInAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn, useSession } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials"

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState("student");
  const [error, setError] = useState("");

  const { data: session, status } = useSession();
  if (session) {
    if (session.user.userType === "student") {
      redirect("/dashboard/student");
    } else if (session.user.userType === "admin") {
      redirect("/dashboard/admin");
    } else {
      redirect("/dashboard");
    }
  }
  if (status === "loading") {
    return <div>Loading...</div>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (userType === "student") {
      const res = await signIn("credentials", { redirect: false, email, password, userType })
      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
      }
    } else {
      const res = await signIn("credentials", { redirect: false, email, password, userType })
      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            {userType === "student" ? (
              <FaUserGraduate className="text-blue-600 text-2xl" />
            ) : (
              <FaUserShield className="text-blue-600 text-2xl" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold">
            {userType === "student" ? "Student Portal" : "Admin Portal"}
          </CardTitle>
          <p className="text-sm text-gray-600">
            Sign in to access your{" "}
            {userType === "student" ? "courses and projects" : "dashboard"}
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${userType === "student"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600 hover:text-gray-800"
                }`}
              onClick={() => setUserType("student")}
            >
              <FaUserGraduate className="inline mr-2" />
              Student
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${userType === "admin"
                ? "bg-white shadow-sm text-blue-600"
                : "text-gray-600 hover:text-gray-800"
                }`}
              onClick={() => setUserType("admin")}
            >
              <FaUserShield className="inline mr-2" />
              Admin
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                {userType === "student" ? "Student Email" : "Admin Email"}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={
                  userType === "student"
                    ? "student@university.edu"
                    : "admin@university.edu"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              <FaSignInAlt className="mr-2" />
              Sign In
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            {userType === "student" ? (
              <p>
                Need an account?{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Contact administration
                </a>
              </p>
            ) : (
              <p>Admin credentials provided by system administrator</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
