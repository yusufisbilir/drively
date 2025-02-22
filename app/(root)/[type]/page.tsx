import Sort from '@/components/root/type/Sort';

const Page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || '';

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
      <section className="w-full">
        <h1 className="text-2xl font-semibold capitalize">{type}</h1>

        <div className="total-size-section">
          <p>
            Total: <span className="text-base font-semibold">0 MB</span>
          </p>
        </div>

        <div className="mt-5 flex items-center sm:mt-0 sm:gap-3">
          <p className="hidden text-light-200 sm:block">Sort by:</p>

          <Sort />
        </div>
      </section>
    </div>
  );
};

export default Page;
