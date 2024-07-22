import { Skeleton } from '@/components/ui/skeleton';
import { PAGE_SIZE } from '@/constants';

export default function TableSkeleton() {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="p-3 first:pl-6 last:pr-6 w-[56px]">
            <span />
          </th>
          <th className="p-3 first:pl-6 last:pr-6 w-[80px]">
            <span />
          </th>
          {[1, 2, 3, 4].map((th) => (
            <th className="p-3 first:pl-6 last:pr-6" key={th}>
              <Skeleton className="w-1/2 h-6 rounded-full" />
            </th>
          ))}
          <th className="p-3 first:pl-6 last:pr-6  w-[116px]">
            <Skeleton className="w-full h-6 rounded-full" />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: PAGE_SIZE }, (_, k) => k + 1).map((tr) => (
          <tr
            key={tr}
            className="[&:not(:last-child)]:border-b-2 border-b-transparent"
          >
            <td className="p-3 first:pl-6 last:pr-6">
              <span />
            </td>
            <td className="p-3 first:pl-6 last:pr-6">
              <Skeleton className="w-14 h-14 rounded-full" />
            </td>
            <td className="p-3 first:pl-6 last:pr-6">
              <div>
                <Skeleton className="w-1/2 h-5 rounded-full" />
                <Skeleton className="w-2/3 h-4 mt-2 rounded-full" />
              </div>
            </td>
            {[1, 2, 3].map((td) => (
              <td className="p-3 first:pl-6 last:pr-6" key={td}>
                <Skeleton className="w-2/3 h-5 rounded-full" />
              </td>
            ))}
            <td className="p-3 first:pl-6 last:pr-6">
              <div className="flex">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
