import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { LeaderMinor } from 'lib/btl86/types';
import Link from 'next/link';

export default function ProductGridItems({ leaders }: { leaders: LeaderMinor[] }) {
  return (
    <>
      {leaders.map((leader) => (
        <Grid.Item key={leader.name} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/suquantam/${leader.id}`}>
            <GridTileImage
              alt={leader.name}
              label={{
                title: leader.name
              }}
              src={leader.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
