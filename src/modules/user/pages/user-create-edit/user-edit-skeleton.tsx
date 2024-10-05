import { Skeleton } from '@/components/ui/skeleton';

export default function UserEditSkeleton() {
  return (
    <div className="flex flex-col w-full gap-5 p-2 sm:p-5 md:p-10">
      <div className="flex justify-between">
        <Skeleton className="w-28 h-10 rounded-md" />
        <Skeleton className="w-20 h-10 rounded-md" />
      </div>

      <div className="p-[25px]">
        <Skeleton className="w-full max-w-80 h-80 rounded-md" />
      </div>

      <div className="mt-[25px]">
        <Skeleton className="w-56 h-6 ml-[25px] rounded-md" />
        <div className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2 p-6">
          <div>
            <Skeleton className="w-20 h-5 rounded-md" />
            <Skeleton className="h-10 mt-3 rounded-md" />
          </div>
          <div>
            <Skeleton className="w-20 h-5 rounded-md" />
            <Skeleton className="h-10 mt-3 rounded-md" />
          </div>
          <div>
            <Skeleton className="w-10 h-5 rounded-md" />
            <Skeleton className="h-10 mt-3 rounded-md" />
          </div>
          <div>
            <Skeleton className="w-10 h-5 rounded-md" />
            <Skeleton className="h-10 mt-3 rounded-md" />
          </div>
          <div>
            <Skeleton className="w-24 h-5 rounded-md" />
            <Skeleton className="h-10 mt-3 rounded-md" />
          </div>
        </div>
      </div>

      <div className="mt-[25px]">
        <Skeleton className="w-28 h-6 ml-[25px] rounded-md" />
        <div className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2 p-6">
          <div>
            <Skeleton className="w-16 h-5 rounded-md" />
            <Skeleton className="h-10 mt-3 rounded-md" />
          </div>
          <div>
            <Skeleton className="w-12 h-5 rounded-md" />
            <Skeleton className="h-10 mt-3 rounded-md" />
          </div>
          <div>
            <Skeleton className="w-20 h-5 rounded-md" />
            <Skeleton className="h-10 mt-3 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
