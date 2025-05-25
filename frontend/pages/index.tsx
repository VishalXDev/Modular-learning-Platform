import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} 
        min-h-screen flex flex-col items-center justify-center p-8 
        font-[family-name:var(--font-geist-sans)] bg-gray-50 dark:bg-gray-900`}
    >
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Welcome to Modular Learning Platform
      </h1>

      <p className="mb-10 text-center max-w-xl text-gray-700 dark:text-gray-300">
        Learn and manage courses seamlessly — whether you're a learner or an admin.
      </p>

      <div className="flex gap-6">
        <Link href="/learner/courses" className="btn-primary px-6 py-3 rounded text-white bg-blue-600 hover:bg-blue-700">
          Learner Dashboard
        </Link>
        <Link href="/admin/courses" className="btn-secondary px-6 py-3 rounded border border-blue-600 text-blue-600 hover:bg-blue-100">
          Admin Dashboard
        </Link>
      </div>
    </div>
  );
}
