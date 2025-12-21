
import PatientSidebar from "./PatientSidebar";

export default function PatientsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen  bg-gray-200">
      <PatientSidebar/>
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
