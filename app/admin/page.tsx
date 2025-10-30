"use client"

import React, { useState } from 'react'
import { Menu, Search, Bell, User, Settings, BarChart2, Users, FileText, Home, LogOut } from 'lucide-react'

export default function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-indigo-800 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && <h2 className="text-xl font-bold">DIYAMA Admin</h2>}
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-indigo-700">
            <Menu size={24} />
          </button>
        </div>
        <nav className="mt-6">
          <div className={`px-4 py-3 cursor-pointer flex items-center ${activeTab === 'dashboard' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`} 
               onClick={() => setActiveTab('dashboard')}>
            <Home size={20} />
            {isSidebarOpen && <span className="ml-4">Dashboard</span>}
          </div>
          <div className={`px-4 py-3 cursor-pointer flex items-center ${activeTab === 'users' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
               onClick={() => setActiveTab('users')}>
            <Users size={20} />
            {isSidebarOpen && <span className="ml-4">Users</span>}
          </div>
          <div className={`px-4 py-3 cursor-pointer flex items-center ${activeTab === 'analytics' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
               onClick={() => setActiveTab('analytics')}>
            <BarChart2 size={20} />
            {isSidebarOpen && <span className="ml-4">Analytics</span>}
          </div>
          <div className={`px-4 py-3 cursor-pointer flex items-center ${activeTab === 'content' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
               onClick={() => setActiveTab('content')}>
            <FileText size={20} />
            {isSidebarOpen && <span className="ml-4">Content</span>}
          </div>
          <div className={`px-4 py-3 cursor-pointer flex items-center ${activeTab === 'settings' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
               onClick={() => setActiveTab('settings')}>
            <Settings size={20} />
            {isSidebarOpen && <span className="ml-4">Settings</span>}
          </div>
          <div className="px-4 py-3 cursor-pointer flex items-center hover:bg-indigo-700 mt-auto">
            <LogOut size={20} />
            {isSidebarOpen && <span className="ml-4">Logout</span>}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  <User size={18} />
                </div>
                <span className="font-medium">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Total Users</h3>
                    <Users className="text-indigo-600" size={24} />
                  </div>
                  <p className="text-3xl font-bold mt-2">1,254</p>
                  <p className="text-green-500 text-sm mt-2">+12% from last month</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Active Sessions</h3>
                    <User className="text-indigo-600" size={24} />
                  </div>
                  <p className="text-3xl font-bold mt-2">423</p>
                  <p className="text-green-500 text-sm mt-2">+5% from last week</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Total Revenue</h3>
                    <BarChart2 className="text-indigo-600" size={24} />
                  </div>
                  <p className="text-3xl font-bold mt-2">$12,543</p>
                  <p className="text-red-500 text-sm mt-2">-2% from yesterday</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-gray-500">Pending Tasks</h3>
                    <FileText className="text-indigo-600" size={24} />
                  </div>
                  <p className="text-3xl font-bold mt-2">15</p>
                  <p className="text-gray-500 text-sm mt-2">3 urgent</p>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                  <h3 className="font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="flex items-start pb-4 border-b">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                          <User size={20} />
                        </div>
                        <div>
                          <p className="font-medium">User #{item} performed an action</p>
                          <p className="text-sm text-gray-500">{item * 10} minutes ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                      Add New User
                    </button>
                    <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Generate Report
                    </button>
                    <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Update Content
                    </button>
                    <button className="w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      System Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Users Management</h1>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-semibold">All Users</h3>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    Add User
                  </button>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
                      { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
                      { name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
                      { name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
                      { name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', status: 'Active' },
                    ].map((user, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                              <User size={18} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.role}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Analytics</h1>
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-semibold mb-4">Performance Overview</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  <p className="text-gray-500">Analytics Chart Placeholder</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Content Management</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Blog Posts', count: 24 },
                  { title: 'Pages', count: 12 },
                  { title: 'Media Files', count: 145 },
                  { title: 'Categories', count: 8 },
                  { title: 'Tags', count: 32 },
                  { title: 'Comments', count: 217 },
                ].map((item, index) => (
                  <div key={index} className="bg-white rounded-lg shadow p-6">
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-3xl font-bold">{item.count}</p>
                    <button className="mt-4 text-indigo-600 hover:text-indigo-800">Manage →</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h1 className="text-2xl font-bold mb-6">Settings</h1>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue="DIYAMA Platform"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Admin Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        defaultValue="admin@diyama.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                      <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option>English</option>
                        <option>French</option>
                        <option>Spanish</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="darkMode" className="mr-2" />
                      <label htmlFor="darkMode" className="text-sm text-gray-700">Enable Dark Mode</label>
                    </div>
                    <div className="pt-4">
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}