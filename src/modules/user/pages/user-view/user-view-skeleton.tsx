import { Skeleton } from '@/components/ui/skeleton';

export default function UserViewSkeleton() {
  return (
    <div className="flex flex-col gap-5 p-10 w-full">
      <div className="flex justify-between">
        <Skeleton className="w-[74px] h-10 rounded-lg" />
        <Skeleton className="w-[88px] h-10 rounded-lg" />
      </div>

      <div className="p-6 flex gap-5">
        <Skeleton className="w-20 h-20 rounded-full flex-shrink-0" />

        <div className="flex flex-col gap-1 w-full">
          <Skeleton className="w-full max-w-32 h-7 rounded-full" />
          <Skeleton className="w-full max-w-48 h-6 rounded-full" />
          <Skeleton className="w-full max-w-56 h-6 rounded-full" />
        </div>
      </div>

      <div className="p-6">
        <Skeleton className="w-60 h-7 rounded-lg" />
        <div className="grid grid-cols-2 gap-4 max-w-2xl mt-5">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-6 rounded-lg" />
            <Skeleton className="w-40 h-6 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-6 rounded-lg" />
            <Skeleton className="w-40 h-6 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-24 h-6 rounded-lg" />
            <Skeleton className="w-48 h-6 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-16 h-6 rounded-lg" />
            <Skeleton className="w-32 h-6 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-16 h-6 rounded-lg" />
            <Skeleton className="w-44 h-6 rounded-lg" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <Skeleton className="w-32 h-7 rounded-lg" />
        <div className="grid grid-cols-2 gap-4 max-w-2xl mt-5">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-6 rounded-lg" />
            <Skeleton className="w-40 h-6 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-20 h-6 rounded-lg" />
            <Skeleton className="w-40 h-6 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-24 h-6 rounded-lg" />
            <Skeleton className="w-20 h-6 rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="w-16 h-6 rounded-lg" />
            <Skeleton className="w-44 h-6 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
