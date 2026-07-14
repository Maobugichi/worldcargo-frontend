"use client"

import { useEffect } from "react";
import { LoginForm } from "../components/LoginForm";

export function AdminLoginPage() {

 useEffect(() => {
  if (process.env.NODE_ENV !== "production" || !window.location.search.includes("debug")) return;
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/eruda";
  script.onload = () => (window as unknown as { eruda: { init: () => void } }).eruda.init();
  document.body.appendChild(script);
}, []);
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-xl font-semibold">Staff login</h1>
      <LoginForm />
    </main>
  );
}