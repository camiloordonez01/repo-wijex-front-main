import React from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import Modal from './photoswiper';

type GalleryProps = {
    gallery_1: string;
    gallery_2: string;
    gallery_3: string;
};

const Gallery = (props: GalleryProps) => {
    
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [seleted, setSelected] = React.useState<number>(0);
    const router = useRouter();
    const onOpenModal = (index: number) => {
        console.log('index===>', index)
        setSelected(index);
        setShowModal(true);
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    return (
        <section className="conteiner py-12">
            <div className="flex flex-wrap mx-4 justify-center">
                <div className="md:block md:w-1/2 px-4 sm:px-0 cursor-pointer" onClick={() => onOpenModal(0)}>
                    <Image
                        src={`${router.basePath + props.gallery_1}`}
                        width={900}
                        height={540}
                        priority
                        alt="logo-wijex"
                        className="rounded shadow-md"
                    />
                </div>
                <div className="md:w-1/4 h-auto px-4">
                    <div className="mb-8 mt-8 md:mt-0 cursor-pointer" onClick={() => onOpenModal(1)}>
                        <Image
                            src={`${router.basePath + props.gallery_2}`}
                            width={450}
                            height={270}
                            priority
                            alt="logo-wijex"
                            className="rounded shadow-md"
                        />
                    </div>
                    <div className="cursor-pointer" onClick={() => onOpenModal(2)}>
                        <Image
                            src={`${router.basePath + props.gallery_3}`}
                            width={450}
                            height={270}
                            priority
                            alt="logo-wijex"
                            className="rounded shadow-md"
                        />
                    </div>
                </div>
            </div>
            <Modal
                showModal={showModal}
                onCloseModal={() => onCloseModal()}
                photos={[props.gallery_1, props.gallery_2, props.gallery_3]}
                selected={seleted}
            />

        </section>
    );
}

export { Gallery };