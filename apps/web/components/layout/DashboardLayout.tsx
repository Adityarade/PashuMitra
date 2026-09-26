'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import DeviceFrameModal from '@/components/common/DeviceFrameModal';
import { LanguageProvider } from '@/lib/LanguageContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [deviceModalOpen, setDeviceModalOpen] = useState(false);

  const pathname = usePathname();

  if (pathname === '/login') {
    return (
      <LanguageProvider>
        {children}
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-100/70 flex flex-col antialiased text-slate-900 selection:bg-orange-200">
        
        {/* Left Sidebar (Desktop) */}
        <div className="hidden md:block">
          <Sidebar
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />
        </div>

        {/* Mobile Drawer Overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative z-10 w-72">
              <Sidebar
                collapsed={false}
                setCollapsed={() => setMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Area (Fluid full-width fit to screen) */}
        <div
          className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarCollapsed ? 'md:pl-20' : 'md:pl-72'
          }`}
        >
          {/* Full-width Topbar */}
          <Topbar
            onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            onOpenDeviceSimulator={() => setDeviceModalOpen(true)}
          />

          {/* Wide Full-Width Main Content Container */}
          <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 max-w-[1920px] mx-auto">
            {children}
          </main>

          <Footer />
        </div>

        {/* Android & Web Device Emulator Modal */}
        <DeviceFrameModal
          isOpen={deviceModalOpen}
          onClose={() => setDeviceModalOpen(false)}
        />
      </div>
    </LanguageProvider>
  );
}
