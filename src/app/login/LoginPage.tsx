

"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from '@/hooks/storeHooks';
import { loginUser, selectAuthLoading, selectAuthError, selectIsAuthenticated } from '@/store/slicers/authSlicer';
import CommonTextInput from "@/components/forms/CommonTextInput";

function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const methods = useForm();
  const { handleSubmit } = methods;

  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthed = useAppSelector(selectIsAuthenticated);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit() {
    const result = await dispatch(loginUser({ email, password }));
    if ((result as any).type?.endsWith('/fulfilled')) {
      router.push('/');
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EducareAI</h1>
          <p className="text-gray-600">Child Development Tracking Platform</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In to Your Account</h2>
          </div>

          {/* FormProvider wraps all inputs */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Username */}
              <CommonTextInput
                label="Username"
                name="username"
                placeholder="Enter your username"
                rules={{ required: "Username is required" }}
              />

              {/* Password */}
              <CommonTextInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
              />

              {/* Demo Credentials */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                <p className="font-semibold text-blue-800 mb-2">Demo Credentials:</p>
                <p><strong>Parent:</strong> any username / password</p>
                <p><strong>Admin:</strong> admin / admin123</p>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                // disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </FormProvider>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            © 2025 EducareAI. All rights reserved.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
