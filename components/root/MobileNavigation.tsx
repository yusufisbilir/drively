'use client';

import { Menu, FolderKanban, LogOut } from 'lucide-react';
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
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { signOutUser } from '@/lib/actions/user.actions';
import FileUploader from './FileUploder';

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
  ownerId: string;
  userId: string;
}

const MobileNavigation = ({ fullName, avatar, email, className, ownerId, userId }: Props) => {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        'flex h-[60px] items-center justify-between border-b border-neutral-200 px-4',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <FolderKanban className="h-8 w-8 text-blue-600" />
        <h1 className="text-xl font-semibold">Drively</h1>
      </div>

      <div className="flex items-center gap-2">
        <FileUploader ownerId={ownerId} userId={userId} />
        <form action={async () => await signOutUser()}>
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-red-500 hover:bg-transparent"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </form>

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
      </div>
    </header>
  );
};

export default MobileNavigation;
