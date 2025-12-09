
import React, { useEffect, useRef } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Download, FileText } from 'lucide-react';
import gsap from 'gsap';

const Transparency: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".header-anim", { y: 30, opacity: 0, duration: 1, ease: "power2.out" });
      gsap.from(".chart-card", { y: 50, opacity: 0, stagger: 0.2, duration: 0.8, delay: 0.2, ease: "power2.out" });
      gsap.from(".report-card", { x: -30, opacity: 0, stagger: 0.1, duration: 0.6, delay: 0.6, ease: "power2.out" });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const allocationData = [
    { name: 'Direct Aid (Food/Cash)', value: 65 },
    { name: 'Education Support', value: 20 },
    { name: 'Medical', value: 10 },
    { name: 'Logistics/Ops', value: 5 },
  ];

  const monthlyData = [
    { name: 'Jan', amount: 250000 },
    { name: 'Feb', amount: 320000 },
    { name: 'Mar', amount: 280000 },
    { name: 'Apr', amount: 450000 },
    { name: 'May', amount: 380000 },
    { name: 'Jun', amount: 500000 },
  ];

  const COLORS = ['#E53935', '#000000', '#424242', '#9E9E9E'];

  const reports = [
    { month: 'October 2023', size: '1.2 MB' },
    { month: 'September 2023', size: '1.1 MB' },
    { month: 'August 2023', size: '0.9 MB' },
  ];

  return (
    <div ref={containerRef} className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="header-anim text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Financial Transparency</h1>
          <p className="text-gray-600">See exactly how every Naira is utilized. Updated monthly.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Allocation Chart */}
          <div className="chart-card bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Fund Allocation (2023)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {allocationData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm text-gray-600">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="chart-card bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Distribution Growth (₦)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f5f5f5'}} />
                  <Bar dataKey="amount" fill="#E53935" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-400 mt-4 text-center">Funds distributed per month in 2023</p>
          </div>
        </div>

        {/* Downloadable Reports */}
        <div className="chart-card bg-black text-white rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Monthly Distribution Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reports.map((report, idx) => (
              <div key={idx} className="report-card bg-zinc-900 p-6 rounded-lg border border-zinc-800 flex justify-between items-center group hover:border-hive-red transition-colors cursor-pointer">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-hive-red mr-4" />
                  <div>
                    <h3 className="font-bold">{report.month}</h3>
                    <p className="text-xs text-gray-500">PDF • {report.size}</p>
                  </div>
                </div>
                <Download className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transparency;
