import React, { Suspense } from 'react';
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
      </Suspense>
    </>
  );
}
