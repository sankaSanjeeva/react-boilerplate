import { useMemo } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  darcula,
  duotoneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@/contexts';

function InlineCode({ children }: { children?: React.ReactNode }) {
  return (
    <code className="py-0.5 px-2 text-sm rounded bg-[#faf8f5] dark:bg-[#2b2b2b]">
      {children}
    </code>
  );
}

function BlockCode({ children }: { children?: React.ReactNode }) {
  const { theme } = useTheme();

  const style = useMemo(() => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? darcula
        : duotoneLight;

      return systemTheme;
    }
    return theme === 'dark' ? darcula : duotoneLight;
  }, [theme]);

  return (
    <SyntaxHighlighter
      language="javascript"
      style={style}
      customStyle={{ borderRadius: 8, maxHeight: 500, overflowY: 'auto' }}
    >
      {`${children}`}
    </SyntaxHighlighter>
  );
}

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
  code: InlineCode, // Handles inline code
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pre: (props: any) => <BlockCode {...props.children.props} />, // Handles block code
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
