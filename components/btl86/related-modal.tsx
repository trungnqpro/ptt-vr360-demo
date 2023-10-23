'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { LeaderMinor } from 'lib/btl86/types';
import './styles.css';

interface ModalVideoProps {
  relatedImgs: LeaderMinor[]
  modalOpenRelated: boolean;
  setModalOpenRelated: (open: boolean) => void;
}

export default function ModalRelated({
  relatedImgs,
  modalOpenRelated = false,
  setModalOpenRelated
}: ModalVideoProps) {
  //   const [modalOpen, setModalOpen] = useState<boolean>(false)
  const contentModalRef = useRef<HTMLVideoElement>(null);
  const swiperSliders = relatedImgs.map((item: LeaderMinor) => (
          <SwiperSlide key={item.id}>
            <img src={item.url} alt={item.name} />
          </SwiperSlide>
  ))

  return (
    <div>
      <Transition show={modalOpenRelated} as={Fragment}>
        <Dialog initialFocus={contentModalRef} onClose={() => setModalOpenRelated(false)}>
          {/* Modal backdrop */}
          <Transition.Child
            className="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />
          {/* End: Modal backdrop */}

          {/* Modal dialog */}
          <Transition.Child
            className="fixed inset-0 z-10 flex p-6"
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 scale-75"
            enterTo="opacity-100 scale-100"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <div className="mx-auto flex h-full max-w-5xl items-center">
              <Dialog.Panel className="aspect-video max-h-full w-full overflow-hidden rounded-3xl bg-black shadow-2xl">
                <Swiper
                  spaceBetween={30}
                  effect={'coverflow'}
                  navigation={true}
                  pagination={{
                    clickable: true
                  }}
                  modules={[EffectFade, Navigation, Pagination]}
                  className="relatedSwiper"
                >
                  {swiperSliders}
                </Swiper>
              </Dialog.Panel>
            </div>
          </Transition.Child>
          {/* End: Modal dialog */}
        </Dialog>
      </Transition>
    </div>
  );
}
