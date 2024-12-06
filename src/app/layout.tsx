import Header from "@/components/Header/Header";
import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Real-Time Chat App",
  description: "A Next.js real-time chat application",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <footer className="app-footer bg-gray-800 text-gray-200 py-4 text-center">
          <p>&copy; 2024 Chat App</p>
        </footer>
      </body>
    </html>
  );
}
