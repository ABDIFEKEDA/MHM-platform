import AdminLayout from "@/components/adminLayout";
import RecentActivityFilters from "@/components/fiter";
import DashboardChart from "@/components/chart";
import DashboardChart2 from "@/components/chart2";

export default function AdminDashboard() {
  return (
    <AdminLayout>
     
<div className="bg-[#c5d2ff] min-h-screen p-8 rounded-lg">
 <h1 className="text-3xl font-bold mb-6 text-[#0F2B8F]">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-2xl font-bold">1200</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Active Reports</h2>
          <p className="text-2xl font-bold">24</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Notifications</h2>
          <p className="text-2xl font-bold">8</p>
        </div>
      </div>
      <div className="p-6 mt-6 bg-white rounded-lg shadow">
        <RecentActivityFilters />
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <DashboardChart />
      <DashboardChart2/>
    </div>
</div>
    </AdminLayout>
  );
}
