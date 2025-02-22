import Card from '@/components/root/type/Card';
import Sort from '@/components/root/type/Sort';
import { getFiles } from '@/lib/actions/file.actions';
import getFileTypesParams from '@/utils/getFileTypesParams';
import { Models } from 'node-appwrite';

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || '';
  const searchText = ((await searchParams)?.query as string) || '';
  const sort = ((await searchParams)?.sort as string) || '';

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types, searchText, sort });

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
      <section className="w-full">
        <h1 className="text-2xl font-semibold capitalize">{type}</h1>

        <div className="flex mt-2 flex-col justify-between sm:flex-row sm:items-center">
          <p>
            Total: <span className="text-base font-semibold">0 MB</span>
          </p>
          <div className="mt-5 flex items-center sm:mt-0 sm:gap-3">
            <p className="hidden text-light-200 sm:block whitespace-nowrap">Sort by:</p>

            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="mt-10 text-center">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;
