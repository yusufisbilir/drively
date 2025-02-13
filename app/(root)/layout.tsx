import Header from '@/components/root/Header';
import MobileNavigation from '@/components/root/MobileNavigation';
import Sidebar from '@/components/root/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-screen">
      <Sidebar />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation />
        <Header />
        <div className="remove-scrollbar h-full flex-1 overflow-auto bg-neutral-50 px-5 py-7">
          {children}
        </div>
      </section>
    </main>
  );
};

export default Layout;
