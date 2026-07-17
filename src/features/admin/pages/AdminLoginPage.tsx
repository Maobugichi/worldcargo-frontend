"use client"


import { LoginForm } from "../components/LoginForm";

export function AdminLoginPage() {


  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-xl font-semibold text-foreground">Staff login</h1>
      <LoginForm />
    </main>
  );
}