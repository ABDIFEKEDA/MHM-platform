import Sidebar from "./adminsidebar";

export default function PatientsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen ">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
