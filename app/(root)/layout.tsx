import Header from '@/components/root/Header';
import MobileNavigation from '@/components/root/MobileNavigation';
import Sidebar from '@/components/root/Sidebar';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

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
      />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation
          avatar={currentUser.avatar}
          fullName={currentUser.fullName}
          email={currentUser.email}
        />
        <Header />
        <div className="remove-scrollbar h-full flex-1 overflow-auto bg-neutral-50 px-5 py-7">
          {children}
        </div>
      </section>
    </main>
  );
};

export default Layout;
