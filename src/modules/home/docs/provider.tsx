import { MDXProvider } from '@mdx-js/react';

const components = {
  h1: (props: React.HTMLAttributes<HTMLElement>) => (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h1 className="mt-6 mb-3 text-3xl font-semibold" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLElement>) => (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h2
      className="pb-2 my-3 text-2xl font-semibold border-b border-gray-200 dark:border-gray-700"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLElement>) => (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h3 className="my-3 text-xl font-semibold" {...props} />
  ),
  a: (props: React.HTMLAttributes<HTMLElement>) => (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      className="font-medium underline underline-offset-4"
      target="_blank"
      {...props}
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLElement>) => (
    <pre
      className="mb-4 mt-6 p-4 max-h-[500px] overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="py-1 px-2 font-mono text-sm bg-gray-100 dark:bg-gray-900"
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLElement>) => (
    <ul className="my-6 ml-6 list-disc" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLElement>) => (
    <ul className="my-6 ml-6 list-decimal" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLElement>) => (
    <li className="mt-2" {...props} />
  ),
};

export default function DocProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
