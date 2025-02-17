'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navItems } from '@/constants';
import {
  LayoutDashboard,
  FileText,
  Image,
  Video,
  MoreHorizontal,
  FolderKanban,
} from 'lucide-react';

const iconMap = {
  LayoutDashboard,
  FileText,
  Image,
  Video,
  MoreHorizontal,
};

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sticky left-0 top-0 z-40 h-screen w-64 border-r border-neutral-200 bg-white px-4 py-5">
      <div className="mb-8 flex items-center gap-2">
        <FolderKanban className="h-8 w-8 text-blue-600" />
        <h1 className="text-xl font-semibold">Drively</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];

          if (!Icon) return null;

          const isActive = pathname === item.url;

          return (
            <Link
              key={item.name}
              href={item.url}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
