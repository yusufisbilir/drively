import Header from '@/components/root/Header';
import MobileNavigation from '@/components/root/MobileNavigation';
import Sidebar from '@/components/root/Sidebar';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import { Toaster } from 'sonner';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/sign-in');
  }

  return (
    <main className="flex h-screen">
      <Sidebar
        avatar={currentUser.avatar}
        fullName={currentUser.fullName}
        email={currentUser.email}
        className="hidden md:flex"
      />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation
          avatar={currentUser.avatar}
          fullName={currentUser.fullName}
          email={currentUser.email}
          ownerId={currentUser.$id}
          userId={currentUser.id}
          className="md:hidden"
        />
        <Header ownerId={currentUser.$id} userId={currentUser.id} />
        <div className="remove-scrollbar h-full flex-1 overflow-auto bg-neutral-50 px-5 py-7">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default Layout;
