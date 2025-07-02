"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { RoleType } from "./RoleSelection";

interface BaseSignUpProps {
  role: RoleType;
}

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
  studentid?: string;
  facultyid?: string;
  adminid?: string;
  [key: string]: string | undefined;
}

export default function BaseSignUpForm({
  role,
}: BaseSignUpProps) {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
    studentid: "",
    facultyid: "",
    adminid: "",
  });
  console.log("Role:",role);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const idField =
        role.value === "student"
          ? "studentid"
          : role.value === "faculty"
          ? "facultyid"
          : role.value === "admin"
          ? "adminid"
          : "";

      const payload = {
        ...formData,
        role: role.value,
        [idField]: formData[idField as keyof SignUpFormData] || null,
      };
      console.log("Form data: ", formData);
      console.log("Payload:", payload)

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Registration failed");
        return;
      }

      router.push("/auth/signin");
    } catch (err) {
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Sign Up as {role.label}</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium mb-1">
            Avatar URL (optional)
          </label>
          <input
            type="url"
            id="avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Admin */}
        {role.value==="admin" && <div>
          <label htmlFor="adminId" className="block text-sm font-medium mb-1">
            Admin ID
          </label>
          <input
          onChange={handleChange}
          value={formData.adminid}
            type="text"
            id="adminid"
            name="adminid"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>}
        {/* Faculty */}
        {role.value==="faculty" && <div>
          <label htmlFor="facultyId" className="block text-sm font-medium mb-1">
            Faculty ID
          </label>
          <input
          onChange={handleChange}
          value={formData.facultyid}
            type="text"
            id="facultyid"
            name="facultyid"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>}
        {/* student */}
        {role.value==="student" && <div>
          <label htmlFor="studentId" className="block text-sm font-medium mb-1">
            Student ID
          </label>
          <input
          onChange={handleChange}
          value={formData.studentid}
            type="text"
            id="studentid"
            name="studentid"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          Sign Up
        </button>
      </form>
    </div>
  );
}
