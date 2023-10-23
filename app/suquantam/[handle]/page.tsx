'use client';

import { notFound } from 'next/navigation';
import { Suspense, useState } from 'react';

import ModalRelated from 'components/btl86/related-modal';
import ModalVideo from 'components/btl86/video-modal';
import { GridTileImage } from 'components/grid/tile';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import { getLeaderDetail } from 'lib/btl86';
import { ImgAction, Leader, LeaderMinor } from 'lib/btl86/types';
import Link from 'next/link';

export const runtime = 'edge';

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOpenRelated, setModalOpenRelated] = useState<boolean>(false);

  const product: Leader | undefined = await getLeaderDetail({ label: params.handle });

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.url
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      {product.videoUrl && (
        <ModalVideo
          thumb={product.url}
          thumbWidth={768}
          thumbHeight={432}
          thumbAlt="Modal video thumbnail"
          video={product.videoUrl}
          videoWidth={1920}
          videoHeight={1080}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
      )}
      
      {<ModalRelated 
          modalOpenRelated={modalOpenRelated}
          setModalOpenRelated={setModalOpenRelated} 
          relatedImgs={product.images} />}

      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Gallery
              images={product.actionImgs.map((image: ImgAction) => ({
                src: image.url,
                id: image.name,
                altText: image.name,
                type: image.type
              }))}
              mainImg={{ src: product.url, altText: product.name, id: product.id }}
              openVideo={setModalOpen}
              openRelated={setModalOpenRelated}
            />
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts relatedProducts={product.images}  />
        </Suspense>
      </div>


      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

async function RelatedProducts({ relatedProducts }: { relatedProducts: LeaderMinor[] }) {
  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Ảnh liên quan</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.id}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link className="relative h-full w-full" href={`#`}>
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name
                }}
                src={product.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
