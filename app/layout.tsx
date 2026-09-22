import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shivakumar Goud S Patil — AI / ML Engineer",
  description:
    "Portfolio of Shivakumar Goud S Patil — AI/ML, computer vision, robotics, embedded systems and product engineering.",
  metadataBase: new URL("https://shivakumar-portfolio.vercel.app"),
  openGraph: {
    title: "Shivakumar Goud S Patil",
    description: "AI / ML • Computer Vision • Robotics • Systems",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
