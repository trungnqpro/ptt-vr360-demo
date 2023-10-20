import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getLeaders } from 'lib/btl86';
import { defaultSort, sorting } from 'lib/constants';
import React from 'react';

export const runtime = 'edge';

export const metadata = {
  title: 'Search',
  description: 'Search leader'
};

export default async function LeadersPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const leaders = await getLeaders({ label: 'leader' });
  const resultsText = leaders.length > 1 ? 'results' : 'result';

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {leaders.length === 0
            ? 'There are no leaders that match '
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
