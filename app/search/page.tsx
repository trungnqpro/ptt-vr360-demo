import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getLeaders } from 'lib/btl86';
import { defaultSort, sorting } from 'lib/constants';

export const runtime = 'edge';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default async function SearchPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string | undefined };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

//   const products = await getProducts({ sortKey, reverse, query: searchValue });
const leaders = await getLeaders({ label: 'leader', q: searchValue });
  const resultsText = leaders.length > 1 ? 'results' : 'result';

  return (
    <>
      {searchValue ? (
        <p className="mb-20">
          {leaders.length === 0
            ? 'There are no item that match '
            : `Showing ${leaders.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {leaders.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems leaders={leaders} />
        </Grid>
      ) : null}
    </>
  );
}
