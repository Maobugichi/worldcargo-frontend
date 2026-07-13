import { LoginForm } from "../components/LoginForm";

export function AdminLoginPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-xl font-semibold">Staff login</h1>
      <LoginForm />
    </main>
  );
}