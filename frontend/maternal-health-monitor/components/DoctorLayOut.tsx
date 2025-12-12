
import DoctorSideBar from "./DoctorSideBar";

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-200">
      <DoctorSideBar />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
