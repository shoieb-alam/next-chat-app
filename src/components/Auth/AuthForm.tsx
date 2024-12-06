"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to send login or signup request to the API
  const loginOrSignup = async (url: string, data: { email: string; password: string }) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorResult = await response.json(); // Extract error message if available
        throw new Error(errorResult.message || "Authentication failed");
      }

      const result = await response.json();
      return result; // This can be a token or user data.
    } catch (error: unknown) {
      console.log("error", error);
      if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      } else {
        setError("An unexpected error occurred.");
      }
      return null; // Return null to indicate failure
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      let response;
      if (type === "login") {
        console.log("Logging in with:", email, password);
        response = await loginOrSignup("/api/auth/login", { email, password });

        if (response && response.token) {
          localStorage.setItem("authToken", response.token);
          console.log("Login successful:", response);
          router.push("/chat");
        } else {
          setError("Invalid credentials");
        }
      } else {
        console.log("Signing up with:", email, password);
        response = await loginOrSignup("/api/auth/signup", { email, password });

        if (response && response.token) {
          localStorage.setItem("authToken", response.token);
          console.log("Signup successful:", response);
          router.push("/");
        } else {
          setError(response.message || "Signup failed");
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || "Something went wrong");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`${
        type === "login"
          ? "bg-gradient-to-r from-blue-500 to-indigo-600"
          : "bg-gradient-to-r from-green-500 to-teal-600"
      } auth-container p-8 min-h-screen flex items-center justify-center`}
      onSubmit={handleSubmit}
    >
      <div
        className={`${
          type === "login"
            ? "bg-white p-10 rounded-lg shadow-lg w-full max-w-sm"
            : "bg-white p-10 rounded-lg shadow-xl w-full max-w-sm"
        }`}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{type === "login" ? "Login" : "Sign Up"}</h2>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(null);
            }}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Display error message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`p-2 w-full rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-700 hover:bg-indigo-800"
          } text-white`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <span className="loader border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></span>
              <span>{type === "login" ? "Logging in..." : "Signing up..."}</span>
            </div>
          ) : type === "login" ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Redirect Link */}
        <p className="mt-4 text-center text-gray-600">
          {type === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:text-blue-700">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/" className="text-blue-500 hover:text-blue-700">
                Login
              </Link>
            </>
          )}
        </p>
      </div>
    </form>
  );
};

export default AuthForm;
