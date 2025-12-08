import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-yellow-600">
                MaternalHealth
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="#features"
              className="text-yellow-700 hover:text-yellow-600 transition"
            >
              Home
            </Link>
            <Link
              href="#features"
              className="text-yellow-700 hover:text-yellow-600 transition"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-yellow-700 hover:text-yellow-600 transition"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-yellow-700 hover:text-yellow-600 transition"
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex">
            <Button className="bg-yellow-600 text-white hover:bg-yellow-700">
              <Link href="/auth/login">Get Started</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600 focus:outline-none">
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
