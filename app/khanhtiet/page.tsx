import AudioPlayer from 'components/btl86/audio-player';
import { Suspense } from 'react';
import KhanhTietSwiper from '../../components/btl86/khanhtiet-swiper';

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
        <KhanhTietSwiper />
        <div style={{position:'absolute', 'zIndex': '2', top: '10%', left: '40%'}}><AudioPlayer src='/audios/khanhtiet.wav' /></div>
      </Suspense>
    </>
  );
}
