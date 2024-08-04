import { Breadcrumbs, DocProvider, Examples, Table } from '../docs';

export default function Home() {
  return (
    <div className="w-full py-10">
      <DocProvider>
        <h1
          className="pb-2 my-3 text-3xl font-semibold scroll-m-20 "
          id="common-components"
        >
          Examples
        </h1>
        <Examples />

        <h1
          className="pb-2 my-3 text-3xl font-semibold scroll-m-20 "
          id="common-components"
        >
          Common components
        </h1>
        <Breadcrumbs />
        <Table />
      </DocProvider>
    </div>
  );
}
