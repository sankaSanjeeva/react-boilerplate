import { Children, ReactNode } from 'react';
import { UIMatch, useMatches } from 'react-router-dom';
import { ChevronIcon } from '@/assets/icons';

export default function Breadcrumbs() {
  const matches = useMatches() as UIMatch<
    unknown,
    { crumb: (data?: unknown) => ReactNode }
  >[];

  const crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));

  if (crumbs.length === 0) {
    return null;
  }

  return (
    <ol className="w-fit py-2 px-3 rounded-md inline-flex items-center gap-x-1 bg-gray-100 dark:bg-slate-800">
      {Children.map(crumbs, (crumb, index) => (
        <>
          {index !== 0 && <ChevronIcon className="opacity-50" />}
          <li className="text-gray-600 dark:text-gray-300 [&>a]:transition-colors">
            {crumb}
          </li>
        </>
      ))}
    </ol>
  );
}
