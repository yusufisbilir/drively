import React from 'react';
import { cn } from '@/lib/utils';
import formatDateTime from '@/utils/formatDateTime';

export const FormattedDateTime = ({ date, className }: { date: string; className?: string }) => {
  return <p className={cn('body-1 text-light-200', className)}>{formatDateTime(date)}</p>;
};
export default FormattedDateTime;
