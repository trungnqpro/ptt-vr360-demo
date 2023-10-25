import AudioPlayer from 'components/btl86/audio-player';
import { Suspense } from 'react';
import HomeSwiper from '../components/btl86/home-swiper';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <Suspense>
        <HomeSwiper />
        <div style={{position:'absolute', zIndex: 2, top: '25%', left: '40%'}}><AudioPlayer src='/audios/home.wav' /></div>
      </Suspense>
    </>
  );
}
