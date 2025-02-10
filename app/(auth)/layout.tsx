import React from 'react';
import Image from 'next/image';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center p-10 lg:flex xl:w-2/5 bg-slate-900">
        <div className="flex items-center gap-x-4">
          <Image src="/vercel.svg" alt="logo" width={50} height={50} className="h-auto" />
          <div className="text-slate-50">
            <h1 className="text-2xl font-bold">Drively</h1>
            <p className="text-lg">Data storage solution</p>
          </div>
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        {children}
      </section>
    </div>
  );
};

export default Layout;
