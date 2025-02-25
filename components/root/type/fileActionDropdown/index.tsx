'use client';

import React, { useState } from 'react';
import { Models } from 'node-appwrite';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Ellipsis,
  PenSquare as LucidePenSquare,
  Info as LucideInfo,
  Share2 as LucideShare2,
  Download as LucideDownload,
  Trash2 as LucideTrash2,
} from 'lucide-react';
import Link from 'next/link';
import { constructDownloadUrl } from '@/utils/appwriteUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { deleteFile, renameFile, updateFileUsers } from '@/lib/actions/file.actions';
import { actionsDropdownItems } from './constants';
import FileDetails from './FileDetails';
import Share from './Share';
import LoadingSpinner from '@/components/ui/loadingSpinner';

const iconMap = {
  PenSquare: LucidePenSquare,
  Info: LucideInfo,
  Share2: LucideShare2,
  Download: LucideDownload,
  Trash2: LucideTrash2,
};

const index = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const path = usePathname();

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    let success = false;

    const actions = {
      rename: () => renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => updateFileUsers({ fileId: file.$id, emails, path }),
      delete: () => deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path }),
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setIsLoading(false);
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });

    if (success) setEmails(updatedEmails);
    closeAllModals();
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent>
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center">{label}</DialogTitle>
          {value === 'rename' && (
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          {value === 'details' && <FileDetails file={file} />}
          {value === 'share' && (
            <Share file={file} onInputChange={setEmails} onRemove={handleRemoveUser} />
          )}
          {value === 'delete' && <p>Are you sure you want to delete {file.name} ?</p>}
        </DialogHeader>
        {['rename', 'delete', 'share'].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button onClick={closeAllModals}>Cancel</Button>
            <Button onClick={handleAction}>
              <p className="capitalize">{value}</p>
              {isLoading && <LoadingSpinner />}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <Ellipsis className="size-6 text-neutral-500" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">{file.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => {
            const Icon = iconMap[actionItem.icon as keyof typeof iconMap];

            if (!Icon) return null;
            return (
              <DropdownMenuItem
                key={actionItem.value}
                onClick={() => {
                  setAction(actionItem);

                  if (['rename', 'share', 'delete', 'details'].includes(actionItem.value)) {
                    setIsModalOpen(true);
                  }
                }}
              >
                {actionItem.value === 'download' ? (
                  <Link
                    href={constructDownloadUrl(file.bucketFileId)}
                    download={file.name}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {actionItem.label}
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {actionItem.label}
                  </div>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};

export default index;
