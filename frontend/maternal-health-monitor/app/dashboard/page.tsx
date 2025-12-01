import Navbar from "@/components/header"; // fix import, was pointing to footer
import { Button } from "@/components/ui/button";
import Link from "next/link";

 function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <Navbar />
      <section className="flex flex-col items-center justify-center text-center py-64 px-4 text-white bg-cover bg-center"
  style={{ backgroundImage: "url('/image.png')" }}>
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to Maternal Health Monitor Platform
        </h1>
        <p className="text-xl max-w-xl mb-8">
          Track and monitor maternal health efficiently. Our platform ensures timely updates and better care.
        </p>
      <Link href="/auth/signup" passHref>
      <Button
        asChild
        className="bg-white text-blue-600 hover:bg-gray-100"
      >
        <span>Get Started</span>
      </Button>
    </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Real-Time Monitoring</h3>
            <p>Keep track of maternal health in real-time with easy-to-read dashboards.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Alerts & Notifications</h3>
            <p>Receive timely notifications for important health metrics and events.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">Data Insights</h3>
            <p>Analyze trends and make informed decisions with comprehensive health reports.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2025 Maternal Health Monitor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;