import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { signOutUser } from '@/lib/actions/user.actions';
import Search from './Search';
import FileUploader from './FileUploder';

const Header = () => {
  return (
    <header className="hidden items-center justify-between gap-5 px-5 py-2 sm:flex">
      <Search />
      <div className="flex items-center justify-center min-w-fit gap-4">
        <FileUploader />
        <form
          action={async () => {
            'use server';

            await signOutUser();
          }}
        >
          <Button type="submit" className="bg-white shadow-none hover:bg-neutral-100 px-2">
            <LogOut className="w-6 h-6 text-red-500" />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
