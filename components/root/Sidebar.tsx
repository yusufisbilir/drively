'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { navItems } from '@/constants';
import {
  LayoutDashboard,
  FileText,
  Image as LucideImage,
  Video,
  MoreHorizontal,
  FolderKanban,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const iconMap = {
  LayoutDashboard,
  FileText,
  LucideImage,
  Video,
  MoreHorizontal,
};

interface Props {
  fullName: string;
  avatar: string;
  email: string;
  className?: string;
}

const Sidebar = ({ fullName, avatar, email, className }: Props) => {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'sticky left-0 top-0 z-40 flex h-screen w-64 flex-col justify-between border-r border-neutral-200 bg-white px-4 py-5',
        className
      )}
    >
      <div>
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
      </div>

      <div className="mt-auto border-t border-neutral-200 pt-4">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-neutral-100">
          <Image
            src={avatar}
            alt="Avatar"
            width={40}
            height={40}
            className="aspect-square rounded-full object-cover"
          />
          <div className="flex-1 overflow-hidden">
            <p className="truncate font-medium text-neutral-900">{fullName}</p>
            <p className="truncate text-sm text-neutral-500">{email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
