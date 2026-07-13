import { apiFetch } from "@/lib/api-client";

export async function login(email: string, password: string): Promise<{ email: string }> {
  return apiFetch<{ email: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function logout(): Promise<void> {
  await apiFetch<{ success: boolean }>("/auth/logout", { method: "POST" });
}