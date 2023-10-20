import { GridTileImage } from 'components/grid/tile';
import { getLeaderDetail } from 'lib/btl86';
import type { Leader } from 'lib/btl86/types';
import Link from 'next/link';

function ThreeItemGridItem({
  item,
  size,
  priority
}: {
  item: Leader;
  size: 'full' | 'half';
  priority?: boolean;
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link className="relative block aspect-square h-full w-full" href={`#`}>
        <GridTileImage
          src={item.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name as string
            // amount: item.priceRange.maxVariantPrice.amount,
            // currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const homepageItems = await getLeaderDetail({
    label: 'cuc-cntt-detail'
  });
  console.log('[homepageItems]', homepageItems);

  // if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  // const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={homepageItems} priority={true} />
      <ThreeItemGridItem size="half" item={homepageItems} priority={true} />
      <ThreeItemGridItem size="half" item={homepageItems} />
    </section>
  );
}
