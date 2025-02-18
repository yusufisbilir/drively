import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { signOutUser } from '@/lib/actions/user.actions';
import Search from './Search';
import FileUploader from './FileUploder';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

const Header = ({ className }: Props) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-16 items-center justify-between gap-5 border-b border-neutral-200 bg-white px-5',
        className
      )}
    >
      <Search />
      <div className="flex items-center justify-center min-w-fit gap-4">
        <FileUploader />
        <form
          action={async () => {
            'use server';
            await signOutUser();
          }}
        >
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-red-500 hover:bg-transparent"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
