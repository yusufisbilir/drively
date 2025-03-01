import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.actions';
import getUsageSummary from '@/utils/getUsageSummary';
import Link from 'next/link';
import FileActionDropdown from '@/components/root/type/fileActionDropdown';
import convertFileSize from '@/utils/convertFileSize';
import FormattedDateTime from '@/components/root/type/FormattedDateTime';
import { Models } from 'node-appwrite';
import Thumbnail from '@/components/root/Thumbnail';
import { FileText, LayoutDashboard, LucideImage, MoreHorizontal, Video } from 'lucide-react';
import DashboardChart from '@/components/root/DashboardChart';

const iconMap = {
  LayoutDashboard,
  FileText,
  LucideImage,
  Video,
  MoreHorizontal,
};

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:gap-10">
      <section>
        <DashboardChart used={totalSpace.used} />

        {/* Uploaded file type summaries */}
        <ul className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6 mt-4">
          {usageSummary.map((summary) => {
            const Icon = iconMap[summary.icon as keyof typeof iconMap];
            if (!Icon) return null;

            return (
              <Link
                href={summary.url}
                key={summary.title}
                className="relative rounded-[20px] bg-white p-5 transition-all hover:scale-105"
              >
                <div className="space-y-4">
                  <div className="flex justify-between gap-3">
                    <Icon className="h-24 w-24 text-neutral-600" />
                    <h4 className="relative z-20 w-full text-right">
                      {convertFileSize(summary.size) || 0}
                    </h4>
                  </div>

                  <h5 className="relative z-20 text-center">{summary.title}</h5>
                  <FormattedDateTime date={summary.latestDate} className="text-center" />
                </div>
              </Link>
            );
          })}
        </ul>
      </section>

      {/* Recent files uploaded */}
      <section className="h-full rounded-[20px] bg-white p-5 xl:p-8">
        <h2>Recent files uploaded</h2>
        {files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.documents.map((file: Models.Document) => (
              <Link
                href={file.url}
                target="_blank"
                className="flex items-center gap-3"
                key={file.$id}
              >
                <Thumbnail type={file.type} extension={file.extension} url={file.url} />

                <div className="flex w-full flex-col xl:flex-row xl:justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-md font-semibold text-neutral-700 line-clamp-1">
                      {file.name}
                    </p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="text-neutral-500 text-sm"
                    />
                  </div>
                  <FileActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
