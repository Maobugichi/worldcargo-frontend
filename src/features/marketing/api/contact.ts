import { apiFetch } from "@/lib/api-client";

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export async function submitContactForm(input: ContactInput): Promise<void> {
  await apiFetch<{ success: boolean }>("/contact", {
    method: "POST",
    body: JSON.stringify(input),
  });
}