import {
  Breadcrumbs,
  DocProvider,
  Examples,
  Lint,
  Structure,
  Table,
  Testing,
} from '../docs';

export default function Home() {
  return (
    <div className="w-full py-5">
      <DocProvider>
        <Structure />

        <Lint />

        <Testing />

        <Examples />

        <h1 className="pb-2 my-3 text-3xl font-semibold scroll-m-20">
          Common components
        </h1>
        <Breadcrumbs />
        <Table />
      </DocProvider>
    </div>
  );
}
