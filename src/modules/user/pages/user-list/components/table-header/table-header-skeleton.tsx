import { Skeleton } from '@/components/ui/skeleton';

export default function TableHeaderSkeleton() {
  return (
    <div className="flex justify-between gap-5 py-5 px-2">
      <Skeleton className="max-w-md w-full h-12 rounded-lg" />
      <Skeleton className="w-36 h-12 rounded-lg" />
    </div>
  );
}
