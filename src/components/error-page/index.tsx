import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as { statusText: string; message: string };

  return (
    <div
      className="flex flex-col items-center justify-center gap-2 min-h-svh"
      data-testid="error-page"
    >
      <h1 className="text-3xl">Oops!</h1>
      <p className="text-xl text-slate-500">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-slate-700">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
