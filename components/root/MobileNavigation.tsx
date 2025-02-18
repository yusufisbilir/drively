'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { avatarPlaceholder, navItems } from '@/constants';
import {
  LayoutDashboard,
  FileText,
  Image as LucideImage,
  Video,
  MoreHorizontal,
  FolderKanban,
} from 'lucide-react';
import Image from 'next/image';

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
}

const MobileNavigation = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();

  return (
    <header className="flex h-[60px] items-center border-b border-neutral-200 px-4 sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <div className="flex h-full flex-col">
            <SheetHeader className="border-b border-neutral-200 p-4">
              <SheetTitle className="flex items-center gap-2">
                <FolderKanban className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-semibold">Drively</span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-1 flex-col justify-between p-4">
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

              <div className="border-t border-neutral-200 pt-4">
                <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-neutral-100">
                  <Image
                    src={avatarPlaceholder}
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
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
