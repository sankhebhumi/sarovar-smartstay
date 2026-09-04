import React from 'react';
import Navbar from '../../components/common/Navbar';
import { Hotel, Shield, Sparkles, Code2, Database, Lock, Cpu } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <div className="bg-navy text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-serif font-bold text-white">About Sarovar SmartStay</h1>
          <p className="text-sm text-slate-300 mt-1">Full-Stack Capstone Project combining Internet Programming, AI &amp; Cybersecurity.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-3">Project Overview</h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                <strong>Sarovar SmartStay — Intelligent Hotel Management System</strong> is designed specifically for <strong>Sarovar Hotel, Boisar, Maharashtra, India</strong>. The system provides an end-to-end digital operational framework for managing hotel rooms, reception workflows, customer reservations, restaurant ordering, inventory tracking, and security audit monitoring.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                The architecture is designed to reflect modern SaaS hotel platforms, moving away from static UI mockups to real working REST APIs, role-based JWT authentication, and interactive database entities.
              </p>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Academic Integration (3 Subjects)</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-1">
                    <Code2 className="text-amber-600" size={18} /> 1. Internet Programming (React + Spring Boot)
                  </h3>
                  <p className="text-xs text-slate-600">
                    Built using React.js, React Router, Axios, Recharts, Java 17 Spring Boot Web, Spring Data JPA, and MySQL relational schema. Clean RESTful API architecture following controller-service-repository patterns.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-1">
                    <Cpu className="text-blue-600" size={18} /> 2. Artificial Intelligence &amp; Analytics
                  </h3>
                  <p className="text-xs text-slate-600">
                    Content-based item recommendation engine for restaurant menus, moving-average 7-day inventory demand prediction, weekly time-series room occupancy forecasting, revenue trend regression, and intelligent staffing roster recommendations.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2 mb-1">
                    <Lock className="text-emerald-600" size={18} /> 3. Cybersecurity &amp; Audit Trail
                  </h3>
                  <p className="text-xs text-slate-600">
                    BCrypt password hashing algorithm, Spring Security JWT stateless session handling, fine-grained Role-Based Access Control (ADMIN, RECEPTIONIST, RESTAURANT_STAFF, HOUSEKEEPING, CUSTOMER), and Security Center audit logs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="card p-6 border-amber-200 bg-amber-50/50">
              <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <Hotel className="text-amber-600" size={20} /> Hotel Metadata
              </h3>
              <ul className="text-xs space-y-2 text-slate-700">
                <li><strong>Hotel Name:</strong> Hotel Sarovar Pure Veg</li>
                <li><strong>Location:</strong> P-25, MIDC Road, Boisar - 401 506</li>
                <li><strong>District:</strong> Palghar, Maharashtra, India</li>
                <li><strong>Rooms Capacity:</strong> 35 Guest Rooms</li>
                <li><strong>Menu Items:</strong> 55+ Pure Veg Dishes</li>
                <li><strong>Implementation:</strong> 40–50% MVP Completed</li>
              </ul>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default About;
