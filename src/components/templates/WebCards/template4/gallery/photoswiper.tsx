import React from "react";
import Image from "next/image";
import { useRouter } from 'next/router';


type ModalProps = {
    showModal: boolean;
    onCloseModal: any;
    photos: string[];
    selected: number;

};
export default function Modal(props: ModalProps) {
    const router = useRouter();
    const [indexC, setIndexC] = React.useState<number>(props.selected)

    const onClickPrev = () => {
        if (indexC === 0) {
            setIndexC(2);
        } else {
            setIndexC(indexC - 1)
        }
    }

    const onClickNext = () => {
        if (indexC === 2) {
            setIndexC(0);
        } else {
            setIndexC(indexC + 1)
        }
    }
    React.useEffect(() => {
        console.log('props.selected', props.selected)
        const loadIndex = () => {
            setIndexC(props.selected)
        }
        loadIndex();
    }, [props.selected]);
    return (
        <>
            {props.showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-whitecolor">
                        <div className="relative mx-auto">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none bg-whitecolor">
                                <div className="flex items-center justify-end rounded-t pt-5">
                                    <button
                                        className="bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-primary z-55"
                                        type="button"
                                        onClick={() => props.onCloseModal()}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                                <div style={{ display: 'flex', position: 'absolute', width: '100%', top: '50%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', zIndex: 56 }}>
                                    <button
                                        onClick={() => onClickPrev()}
                                    >
                                        <img
                                            src={`${router.basePath}/assert/icons/prev.svg`}
                                            width={18}
                                            height={31}
                                            
                                            alt="logo-wijex"
                                        />
                                    </button>
                                    <button
                                        onClick={() => onClickNext()}
                                    >
                                        <img
                                            src={`${router.basePath}/assert/icons/next.svg`}
                                            width={18}
                                            height={31}
                                            
                                            alt="logo-wijex"
                                        />
                                    </button>
                                </div>
                                <div className="flex w-full h-full items-center justify-center">
                                    {
                                        props.photos && props.photos.map((element: string, index: number) => {
                                            return (
                                                <div key={index} >
                                                    <div className={`${index === indexC ? 'flex' : 'hidden'}`}>
                                                        <img
                                                            src={`${router.basePath + element}`}
                                                            width={900}
                                                            height={540}
                                                            
                                                            alt="logo-wijex"
                                                            className="rounded shadow-md w-full object-contain"
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }
                                </div>
                                <div className="flex items-center justify-end rounded-t pt-5">
                                    <button
                                        className="bg-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 z-55"
                                        type="button"
                                        onClick={() => console.log('Hola')}
                                    >
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                </>
            ) : null}
        </>
    );
}
