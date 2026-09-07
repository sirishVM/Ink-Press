import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./provider";
import { AuthProvider } from "@/context/AuthContext";
import { BlogProvider } from "@/context/BlogContext";

export const metadata: Metadata = {
  title: "Ink & Press — 2026 Editorial Blog & Newsletter Platform",
  description: "A high-contrast, distraction-free publishing engine and Tiptap writing studio for independent writers, tech publications, and newsletters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-black dark:text-white min-h-screen selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
        <Provider>
          <AuthProvider>
            <BlogProvider>
              {children}
            </BlogProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
