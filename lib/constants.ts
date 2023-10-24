import { Leader } from './btl86/types';

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const TAGS = {
  collections: 'collections',
  products: 'products'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';

export const sqtImages: Leader[] = [
  {
    name: 'Phùng Quang Thanh',
    id: 'phung-quang-thanh',
    no: 1,
    url: '/images/suquantam/1.phungquangthanh.jpg',
    audioUrl: '/audios/anh-2-dong_chi_dai_tuong_phung_quang_241023142033.wav',
    videoUrl: '',
    description: 'Phùng Quang Thanh',
    images: [],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: 'Võ Văn Thưởng',
    no: 2,
    id: 'vo-van-thuong',
    url: '/images/suquantam/2.vovanthuong.jpg',
    audioUrl: '/audios/anh-2-dong_chi_vo_van_thuong.wav',
    videoUrl: '',
    description: 'Võ Văn Thưởng',
    images: [],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: 'Trần Quốc Vượng',
    no: 3,
    id: 'tran-quoc-vuong',
    url: '/images/suquantam/3.tranquocvuong.jpg',
    audioUrl: '/audios/anh-3-dong_chi_tran-quoc-vuong_241023142302.wav',
    videoUrl: '',
    description: 'Trần Quốc Vượng',
    images: [],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: 'Đỗ Bá Tỵ',
    no: 4,
    id: 'do-ba-ty',
    url: '/images/suquantam/4.dobaty.jpg',
    audioUrl: '/audios/anh-4-dong_chi_do-ba-ty_241023143829.wav',
    videoUrl: '',
    description: 'Đỗ Bá Tỵ',
    images: [],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: 'Vũ Đức Đam',
    no: 5,
    id: 'vu-duc-dam',
    url: '/images/suquantam/5.vuducdam.jpg',
    audioUrl: '/audios/anh-5-dong_chi_vu_duc_dam_241023214108.wav',
    videoUrl: '',
    description: 'Vũ Đức Đam',
    images: [],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: ' Đ/c Thượng tướng Phan Văn Giang, Ủy viên Trung ương Đảng, Ủy viên Thường vụ QUTW, Tổng Tham mưu trưởng QĐND Việt Nam, Thứ trưởng Bộ Quốc phòng (nay là Đại tướng, Ủy viên Bộ Chính trị, Phó Bí thư QUTW, Bộ trưởng Bộ Quốc phòng) tặng hoa chúc mừng Đại hội đại biểu Đảng bộ Bộ Tư lệnh 86 lần thứ I, nhiệm kỳ 2020 - 2025 (7/2020).',
    no: 6,
    id: 'phan-van-giang',
    url: '/images/suquantam/6.phanvangiang.jpg',
    audioUrl: '/audios/anh6dong_chi_thuong_tuong_phan_van_giang_241023214421',
    videoUrl: '',
    description:
      'Sáng ngày 22/7/2020, Thượng tướng Phan Văn Giang, Ủy viên Trung ương Đảng, Ủy viên Thường vụ QUTW, Tổng Tham mưu trưởng QĐND Việt Nam, Thứ trưởng Bộ Quốc phòng (nay là Đại tướng, Ủy viên Bộ Chính trị, Phó Bí thư QUTW, Bộ trưởng Bộ Quốc phòng) cùng đoàn công tác của Bộ Quốc phòng đã đến dự và chỉ đạo Đại hội đại biểu Đảng bộ Bộ Tư lệnh 86 lần thứ nhất, nhiệm kỳ 2020 - 2025. Phát biểu chỉ đạo tại Đại hội, thay mặt Quân ủy Trung ương và Lãnh đạo Bộ Quốc phòng, Thượng tướng Phan Văn Giang biểu dương những thành tích mà Đảng bộ Bộ Tư lệnh 86 đã đạt được trong nhiệm kỳ qua và yêu cầu Đảng bộ Bộ Tư lệnh 86 tiếp tục quán triệt sâu sắc các nghị quyết, chỉ thị của Quân ủy Trung ương, Bộ Quốc phòng, các nghị quyết, chiến lược, đề án, luật về an toàn thông tin đã ban hành; cụ thể hóa, xác định chủ trương, biện pháp lãnh đạo sát với đặc điểm tình hình của Bộ Tư lệnh; thực hiện tốt chức năng tham mưu cho Quân ủy Trung ương, Bộ Quốc phòng về nâng cao năng lực tác chiến không gian mạng, chiến tranh thông tin; phối hợp triển khai giải pháp tổng thể bảo đảm an ninh, an toàn thông tin; nghiên cứu, từng bước làm chủ công nghệ thông tin; lãnh đạo xây dựng Bộ Tư lệnh 86 vững mạnh về chính trị, làm cơ sở nâng cao chất lượng tổng hợp, sức mạnh chiến đấu, hoàn thành tốt nhiệm vụ, xây dựng Bộ Tư lệnh 86 cách mạng, chính quy, tinh nhuệ, hiện đại, làm nòng cốt xây dựng lực lượng tác chiến không gian mạng toàn quân tiến lên hiện đại.',
    images: [
      {
        name: 'Phan Văn Giang',
        id: 'phan-van-giang1',
        url: '/images/suquantam/6.phanvangiang.jpg'
      },
      {
        name: 'Phan Văn Giang',
        id: 'phan-van-giang2',
        url: '/images/suquantam/6.phanvangiang.jpg'
      },
      { name: 'Phan Văn Giang', id: 'phan-van-giang3', url: '/images/suquantam/6.phanvangiang.jpg' }
    ],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/video.webp', name: 'Video', type: 'video' },
      { url: '/images/actions/more.png', name: 'Liên quan', type: 'related' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: 'Phạm Hoài Nam',
    no: 7,
    id: 'pham-hoai-nam',
    url: '/images/suquantam/7.phamhoainam.jpg',
    audioUrl: '/audios/anh7dong_chi_trung_tuong_pham_hoai_nam_241023214720.wav',
    videoUrl: '',
    description: 'Phạm Hoài Nam',
    images: [],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: 'Đ/c Đại tướng Ngô Xuân Lịch, Ủy viên Bộ Chính trị, Phó Bí thư QUTW, Bộ Trưởng Bộ Quốc phòng và đồng chí Nguyễn Mạnh Hùng, UV Trung ương Đảng, Bộ trưởng Bộ Thông tin & Truyền thông chứng kiến ký kết Quy chế phối hợp công tác giữa Bộ Tư lệnh 86 với Cục ATTT/ Bộ TTTT (01/2021).',
    no: 8,
    id: 'ngo-xuan-lich',
    url: '/images/suquantam/8.ngoxuanlich.jpg',
    audioUrl: '/audios/anh8dong_chi_dai_tuong_ngo_xuan_lich_241023215153.wav',
    videoUrl: '/videos/video_8.mp4',
    description:
      'Trước cuộc chạy đua công nghệ nhằm kiểm soát, giành thế chủ động trên không gian mạng đang diễn ra mạnh mẽ. Song song với việc xây dựng, phát triển Chính phủ điện tử, chính phủ số, hệ sinh thái số, Việt Nam cũng đang đối mặt với nhiều nguy cơ, thách thức từ không gian mạng. Chính vì vậy, phối hợp công tác về an toàn thông tin không gian mạng giữa Bộ Tư lệnh 86 với Cục An toàn thông tin/Bộ Thông tin & Truyền thông là hoạt động cần thiết nhằm giải quyết các vấn đề về bảo đảm an toàn thông tin cho các sự kiện chính trị quan trọng của đất nước, bảo vệ chủ quyền quốc gia trên không gian mạng, phát triển công nghiệp an toàn thông tin, tuyên truyền nâng cao nhận thức và tham mưu, đề xuất xây dựng hệ thống văn bản quy phạm pháp luật, hoạch định chính sách để phát triển lĩnh vực an toàn thông tin mạng.',
    images: [
      { name: 'Ngô Xuân Lịch', id: 'ngo-xuan-lich1', url: '/images/suquantam/8.ngoxuanlich.jpg' },
      { name: 'Ngô Xuân Lịch', id: 'ngo-xuan-lich2', url: '/images/suquantam/8.ngoxuanlich.jpg' },
      { name: 'Ngô Xuân Lịch', id: 'ngo-xuan-lich3', url: '/images/suquantam/8.ngoxuanlich.jpg' }
    ],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/video.webp', name: 'Video', type: 'video' },
      { url: '/images/actions/more.png', name: 'Liên quan', type: 'related' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: 'Lê Huy Vịnh',
    no: 9,
    id: 'le-huy-vinh',
    url: '/images/suquantam/9.lehuyvinh.jpg',
    audioUrl: '/audios/anh9dong_chi_thuong_tuong_le_huy_vinh_241023215351.wav',
    videoUrl: '',
    description: 'Lê Huy Vịnh',
    images: [],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: 'Vũ Hải Sản',
    no: 10,
    id: 'vu-hai-san',
    url: '/images/suquantam/10.vuhaisan.jpg',
    audioUrl: '/audios/anh10dong_chi_thuong_tuong_vu_hai_san_241023215459.wav',
    videoUrl: '',
    description: 'Vũ Hải Sản',
    images: [],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: 'Đ/c Thượng tướng Nguyễn Tân Cương, Ủy viên Trung ương Đảng, Ủy viên Thường vụ QUTW, Tổng Tham mưu trưởng QĐND Việt Nam, Thứ trưởng Bộ Quốc phòng trao Huân chương BVTQ hạng Ba cho Bộ Tư lệnh 86 (11/2021).',
    no: 11,
    id: 'nguyen-tan-cuong',
    url: '/images/suquantam/11.nguyentancuong.jpg',
    audioUrl: '/audios/anh11dong_chi_thuong_tuong_nguyen_tan_cuong_241023215646.wav',
    videoUrl: '',
    description:
      'Ngày 06/11/2021, Bộ Tư lệnh 86 tổ chức Lễ kỷ niệm 10 năm Ngày truyền thống (07/11/2011 - 07/11/2021) và đón nhận Huân chương Bảo vệ Tổ quốc hạng Ba, Thượng tướng Nguyễn Tân Cương, Ủy viên Trung ương Đảng, Ủy viên Thường vụ QUTW, Tổng Tham mưu trưởng QĐND Việt Nam, Thứ trưởng Bộ Quốc phòng cùng đoàn công tác Bộ Quốc phòng đã đến dự và chỉ đạo buổi Lễ. Với những thành tích xuất sắc mà Bộ Tư lệnh 86 đã đạt được trong thời gian qua, thừa ủy quyền của Chủ tịch nước, Thượng tướng Nguyễn Tân Cương trao Huân chương Bảo vệ Tổ quốc hạng Ba tặng Bộ Tư lệnh 86. ',
    images: [
      {
        name: 'Nguyễn Tân Cương',
        id: 'nguyen-tan-cuong1',
        url: '/images/suquantam/11.nguyentancuong.jpg'
      },
      {
        name: 'Nguyễn Tân Cương',
        id: 'nguyen-tan-cuong2',
        url: '/images/suquantam/11.nguyentancuong.jpg'
      },
      {
        name: 'Nguyễn Tân Cương',
        id: 'nguyen-tan-cuong3',
        url: '/images/suquantam/11.nguyentancuong.jpg'
      }
    ],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/video.webp', name: 'Video', type: 'video' },
      { url: '/images/actions/more.png', name: 'Liên quan', type: 'related' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: 'Trịnh Văn Quyết',
    no: 12,
    id: 'trinh-van-quyet',
    url: '/images/suquantam/12.trinhvanquyet.jpg',
    audioUrl: '/audios/anh12dong_chi_trung_tuong_trinh_van_quyet_241023215746.wav',
    videoUrl: '',
    description: 'Trịnh Văn Quyết',
    images: [],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: 'Lương Cường',
    no: 13,
    id: 'luong-cuong',
    url: '/images/suquantam/13.luongcuong.jpg',
    audioUrl: '/audios/anh12dong_chi_trung_tuong_trinh_van_quyet_241023215746.wav',
    videoUrl: '',
    description: 'Lương Cường',
    images: [],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  },
  {
    name: 'Nguyễn Tân Cương',
    no: 14,
    id: 'nguyen-tan-cuong-2',
    url: '/images/suquantam/14.nguyentancuong.jpg',
    audioUrl: '/audios/anh12dong_chi_trung_tuong_trinh_van_quyet_241023215746.wav',
    videoUrl: '',
    description: 'Nguyễn Tân Cương',
    images: [],
    actionImgs: [
      { url: '/images/actions/text.png', name: 'Văn bản', type: 'text' },
      { url: '/images/actions/audio.png', name: 'Audio', type: 'audio' },
    ]
  }
];
