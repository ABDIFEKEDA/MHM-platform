"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token + role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert("Login successful!");

       
        if (data.role === "admin") {
          router.push("/dashboard/admin");
        } else if (data.role === "doctor") {
          router.push("/dashboard/doctor");
        } else if (data.role === "patient") {
          router.push("/dashboard/patients");
        } else {
          router.push("/auth/login"); 
        }
      } else {
        setError(data.error || data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm space-y-4 border p-6 rounded-lg shadow bg-white"
      >
        <h1 className="text-xl font-bold text-yellow-600 text-center">Login</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div>
          <Label htmlFor="email"  className="mb-2">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="mb-4"
          />
        </div>

        <div>
          <Label htmlFor="password"  className="mb-2">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="........."
            required
             className="mb-4"
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        <Link href={'/auth/signup'}>
        <h3 className="text-center text-red-600"> Don't Have account ? <span className="text-yellow-600">Register Here!</span></h3>
        </Link>
      </form>
    </div>
  );
}
