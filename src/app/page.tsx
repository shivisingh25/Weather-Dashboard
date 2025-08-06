"use client";

import Sidebar from "../../components/Sidebar";
import MapDashboard from "../../components/MapDashboard";

export default function HomePage() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-x-hidden">
     
      <aside className="w-64 min-w-[16rem] max-w-[20rem] bg-white shadow-md border-r border-gray-200 overflow-y-auto">
        <Sidebar />
      </aside>

      
      <main className="flex-1 flex flex-col">
        
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Weather Dashboard
          </h1>
        </header>

        
        <section className="flex-1 overflow-hidden">
          <MapDashboard />
        </section>
      </main>
    </div>
  );
}
