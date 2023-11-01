// import { getMenu } from 'lib/btl86';
// import { Menu } from 'lib/btl86/types';
import MobileMenu from './mobile-menu';
import SideMenu from './side-menu';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  // const menu = await getMenu('next-js-frontend-header-menu');
  const menu = [
    {
      title: 'Trang chủ',
      path: '/'
    },
    {
      title: 'Khánh tiết',
      path: '/khanhtiet'
    },
    {
      title: 'Các đồng chí lãnh đạo, chỉ huy qua các thời kỳ',
      path: '/'
    },
    {
      title: 'Quá trình hình thành và phát triển BTL86',
      path: '/'
    },
    {
      title: 'Sự quan tâm của lãnh đạo, Đảng và Nhà nước',
      path: '/suquantam'
    }
  ];

  return (
    <nav className="relative flex items-center justify-between">
      <div className="block flex-none md:hidden"><MobileMenu menu={menu} /></div>
      <div className="hidden md:flex h-full w-52 absolute top-8 left-8 z-10"><SideMenu menu={menu} /></div>
    </nav>
  );
}
