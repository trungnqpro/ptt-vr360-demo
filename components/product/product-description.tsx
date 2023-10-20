import Prose from 'components/prose';
import { Leader } from 'lib/btl86/types';

export function ProductDescription({ product }: { product: Leader }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="font-small mb-2 text-lg">{product.name}</h1>
      </div>

      <Prose
        className="mb-6 text-sm italic leading-tight dark:text-white/[60%]"
        html={product.description}
      />
    </>
  );
}
