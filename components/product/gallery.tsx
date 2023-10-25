'use client';

import AudioPlayer from 'components/btl86/audio-player';
import { GridTileImage } from 'components/grid/tile';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Gallery({
  images,
  mainImg,
  openVideo,
  openRelated,
  audioUrl,
  isPlayAudio,
  setPlayAudio,
}: {
  images: { src: string; altText: string; id: string; type: string }[];
  mainImg: { src: string; altText: string; id: string };
  openVideo: (open: boolean) => void;
  openRelated: (open: boolean) => void;
  audioUrl: string,
  isPlayAudio: boolean;
  setPlayAudio: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set('image', nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set('image', previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <>
      <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
        <Image
          className="h-full w-full object-contain"
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          alt={mainImg?.altText as string}
          src={mainImg?.src as string}
          priority={true}
        />
      </div>
      {images.length > 1 ? (
        <ul className="my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0">
          {images.map((image, index) => {
            const imageSearchParams = new URLSearchParams(searchParams.toString());

            // imageSearchParams.set('image', index.toString());

            return (
              <li key={image.id} className="h-20 w-20">
                <Link
                  aria-label="Enlarge product image"
                  href={'#'}
                  scroll={false}
                  className="h-full w-full"
                >
                  {image.type == 'video' ? (
                    <GridTileImage
                      onClick={() => openVideo(true)}
                      alt={image.altText}
                      src={image.src}
                      width={40}
                      height={40}
                    />
                  ) :
                  image.type == 'related' 
                    ? <GridTileImage onClick={() => openRelated(true)} alt={image.altText} src={image.src} width={40} height={40} />
                  // : image.type == 'audio' ? <GridTileImage onClick={() => {playAudio(true); console.log("playAudio(true)")}}  alt={image.altText} src={image.src} width={40} height={40} /> 
                  : image.type == 'audio' && audioUrl ? <AudioPlayer src={audioUrl} />
                  : <GridTileImage  alt={image.altText} src={image.src} width={40} height={40} /> }
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
