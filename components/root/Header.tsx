import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { signOutUser } from '@/lib/actions/user.actions';
import Search from './Search';
import FileUploader from './FileUploder';

const Header = ({ ownerId, userId }: { ownerId: string; userId: string }) => {
  return (
    <header className="sticky top-0 z-30 h-16 items-center justify-between gap-5 border-b border-neutral-200 bg-white px-5 hidden md:flex">
      <Search />
      <div className="flex items-center justify-center min-w-fit gap-4">
        <FileUploader ownerId={ownerId} userId={userId} />
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
