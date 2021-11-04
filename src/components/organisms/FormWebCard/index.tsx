import React, { useState } from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'

// Services
import { upload, getToken, cambiarEstadoToken } from '../../../services/form'

// Components
import LayoutWebCard from '../../organisms/Layout'

// Utils
import { regexPhone, regexEmail } from '../../../utils/utils'

//style
import style from './styles.module.css'

type formData = {
    tipo: string
    token: string
    nombre?: string
    apellido?: string
    empresa?: string
    cargo?: string
    eslogan?: string
    descripcion: string
    historia: string
    colorNombre: string
    colorDescripcion: string
    pdf?: any
    btnNombre?: Array<string>
    fotoPortada: any
    fotosPerfil: any
    fotosGaleria: any
    telefono: string
    email: string
    direccion: string
    calle: number
    localidad: string
    provincia: string
    pais: string
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    wijex?: string
    youtube?: string
    tiktok?: string
    telegram?: string
}

const FormWebCard: React.FC = () => {
    const [showModal, setShowModal] = useState(false)
    const [showModalCreate, setShowModalCreate] = useState(false)
    const [message, setMessage] = useState(0)
    const [tipo, setTipo] = useState(0)
    const [btnNombre, setBtnNombre] = useState([])
    const [imagePortada, setImagePortada] = useState('/images/loadImage.jpg')
    const [imagePerfil, setImagePerfil] = useState([
        '/images/loadImage.jpg',
        '/images/loadImage.jpg',
    ])
    const [imageGaleria, setImageGaleria] = useState([
        '/images/loadImage.jpg',
        '/images/loadImage.jpg',
        '/images/loadImage.jpg',
    ])
    const [numFile, setNumFile] = useState(0)
    const [layoutContent, setLayoutContent] = useState({})
    const [initialColorName, setinitialColorName] = useState('#000000')
    const [initialColorDescripcion, setinitialColorDescripcion] =
        useState('#000000')

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        getValues,
        setValue,
    } = useForm<formData>({
        mode: 'onSubmit',
    })
    const validationObj = {
        required: 'Campo requerido',
    }
    const telefonoValidationObj = {
        required: 'Campo requerido',
        pattern: {
            value: regexPhone,
            message: 'Telefono inválido',
        },
        maxLength: {
            value: 11,
            message: 'Debe contener máximo 11 caracteres',
        },
    }
    const emailValidationObj = {
        required: 'Campo requerido',
        pattern: {
            value: regexEmail,
            message: 'Correo inválido',
        },
        maxLength: {
            value: 50,
            message: 'Debe contener máximo 50 caracteres',
        },
    }
    const loadFiles = (e) => {
        setNumFile(e.target.files.length)
    }
    const loadFoto = async (e, tipo) => {
        if (tipo === 'portada') {
            const fotos = e.target.files
            if (fotos.length > 0) {
                const objectUrl = URL.createObjectURL(fotos[0])
                setImagePortada(objectUrl)
            }
        } else if (tipo === 'perfil') {
            const fotos = e.target.files
            if (fotos.length > 0) {
                const objectUrl1 = fotos[0]
                    ? URL.createObjectURL(fotos[0])
                    : '/images/loadImage.jpg'
                const objectUrl2 = fotos[1]
                    ? URL.createObjectURL(fotos[1])
                    : '/images/loadImage.jpg'

                setImagePerfil([objectUrl1, objectUrl2])
            }
        } else if (tipo === 'galeria') {
            const fotos = e.target.files
            if (fotos.length > 0) {
                const objectUrl1 = fotos[0]
                    ? URL.createObjectURL(fotos[0])
                    : '/images/loadImage.jpg'
                const objectUrl2 = fotos[1]
                    ? URL.createObjectURL(fotos[1])
                    : '/images/loadImage.jpg'
                const objectUrl3 = fotos[2]
                    ? URL.createObjectURL(fotos[2])
                    : '/images/loadImage.jpg'

                setImageGaleria([objectUrl1, objectUrl2, objectUrl3])
            }
        }
    }
    const renderInputTextFile = () => {
        let render = []
        Array(numFile)
            .fill(null)
            .map((element, index) => {
                render.push(
                    <label key={`btnNombre${index}`} className="block">
                        <span className="font-bold uppercase text-xs">
                            Nombre del botón #{index + 1} de descarga de archivo
                        </span>
                        <input
                            type="text"
                            className={`mt-1 block w-full rounded-2xl border-none`}
                            name="btnNombre[]"
                            onChange={(e) => updateBtnNombre(e, index)}
                        />
                    </label>
                )
            })
        return <>{render}</>
    }
    const handleSend = async (data: formData) => {
        const token = await getToken(data.token)
        if (token.data.length > 0) {
            if (!token.data[0].estado) {
                data.btnNombre = btnNombre
                try {
                    const result = await upload(data)
                    if (result.status === 200) {
                        const change = await cambiarEstadoToken(
                            token.data[0].ID
                        )
                        if (change.status === 200) {
                            setMessage(0)
                            setShowModalCreate(true)
                        }
                    }
                } catch (error) {
                    setMessage(3)
                    setShowModalCreate(true)
                }
            } else {
                setMessage(2)
                setShowModalCreate(true)
            }
        } else {
            setMessage(1)
            setShowModalCreate(true)
        }
        //data.btnNombre = btnNombre
        //const result = await upload(data)
        // let formData = new FormData();
        // for (let key in data) {
        //     formData.append(key, data[key]);
        // }
        // const result = await upload(formData)
    }
    const handlePreView = async () => {
        const PERSONAL_DATA = {
            TIPO: tipo,
            NAME: getValues('nombre') + ' ' + getValues('apellido'),
            EMPRESA: getValues('empresa'),
            COLORNAME: getValues('colorNombre'),
            DESCRIPTION: getValues('descripcion'),
            ESLOGAN: getValues('eslogan'),
            CARGO: getValues('cargo'),
            COLORDESCRIPTION: getValues('colorDescripcion'),
            HISTORY: getValues('historia'),
        }
        const IMAGE_DATA = {
            BANNER: imagePortada,
            INFORMATION: imagePerfil[0],
            AVATAR: imagePerfil[1],
            GALLERY_1: imageGaleria[0],
            GALLERY_2: imageGaleria[1],
            GALLERY_3: imageGaleria[2],
        }
        const CONTACT_DATA = {
            EMAIL: getValues('email'),
            PHONE: getValues('telefono'),
            ADDRESS: getValues('direccion'),
            NUMBER: getValues('calle'),
            LOCALITY: getValues('localidad'),
            PROVINCE: getValues('provincia'),
            COUNTRY: getValues('pais'),
        }

        const SOCIALNET_DATA = {
            LINKEDIN: getValues('linkedin'),
            YOUTUBE: getValues('youtube'),
            TWITTER: getValues('twitter'),
            FACEBOOK: getValues('facebook'),
            INSTAGRAM: getValues('instagram'),
            TIKTOK: getValues('tiktok'),
            WIJEX: getValues('wijex'),
            TELEGRAM: getValues('telegram'),
        }
        const pdfs = getValues('pdf')
        let dataPdf = []
        console.log(btnNombre)
        if (btnNombre.length > 0) {
            btnNombre.map((element, index) => {
                const objectUrl1 = URL.createObjectURL(pdfs[index])
                dataPdf.push({
                    url: objectUrl1,
                    text: element,
                })
            })
        }
        const CURRICULUM_DATA = {
            CURRICULUM_VITAE: dataPdf,
        }
        setLayoutContent(
            <LayoutWebCard
                contact={CONTACT_DATA}
                curriculum={CURRICULUM_DATA}
                image={IMAGE_DATA}
                personal={PERSONAL_DATA}
                social={SOCIALNET_DATA}
            />
        )

        setShowModal(true)
    }
    const updateBtnNombre = (e, index) => {
        const value = e.target.value
        let data = btnNombre
        data[index] = value

        setBtnNombre(data)
    }
    return (
        <>
            <div className={style.contentForm}>
                <form onSubmit={handleSubmit(handleSend)}>
                    <div className="text-center">
                        <h1 className="text-d2-d font-bold">WEBCARD</h1>
                        <p className="mt-2 text-h3 font-bold">
                            LE PONEMOS CORAZÓN, AL MUNDO DIGITAL.
                        </p>
                    </div>
                    <div className="pt-12">
                        <div className="">
                            <div className="grid grid-cols-1 gap-6">
                                <label className="block text-center">
                                    <span className="font-bold uppercase text-xs uppercase">
                                        Tipo de usuario
                                    </span>
                                    <div className="grid grid-cols-2 text-center">
                                        <div className="block pl-6">
                                            <input
                                                className="form-radio mr-2"
                                                type="radio"
                                                name="tipo"
                                                value="0"
                                                required
                                                onClick={() => setTipo(0)}
                                                {...register(
                                                    'tipo',
                                                    validationObj
                                                )}
                                            />
                                            <label className="inline-block">
                                                Personal
                                            </label>
                                        </div>
                                        <div className="block pl-6">
                                            <input
                                                className="form-radio mr-2"
                                                type="radio"
                                                name="tipo"
                                                value="1"
                                                required
                                                onClick={() => setTipo(1)}
                                                {...register(
                                                    'tipo',
                                                    validationObj
                                                )}
                                            />
                                            <label className="inline-block">
                                                Empresarial
                                            </label>
                                        </div>
                                    </div>
                                </label>
                                <label
                                    className={`block ${tipo ? 'hidden' : ''}`}
                                >
                                    <span className="font-bold uppercase text-xs">
                                        Nombre
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none ${
                                            errors.nombre && 'border-red-500'
                                        }`}
                                        name="nombre"
                                        {...register('nombre')}
                                    />
                                    <span className="text-red-500 text-xs float-left">
                                        {errors.nombre?.message}
                                    </span>
                                </label>
                                <label
                                    className={`block ${tipo ? 'hidden' : ''}`}
                                >
                                    <span className="font-bold uppercase text-xs">
                                        Apellido
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none ${
                                            errors.apellido && 'border-red-500'
                                        }`}
                                        name="apellido"
                                        {...register('apellido')}
                                    />
                                    <span className="text-red-500 text-xs float-left">
                                        {errors.apellido?.message}
                                    </span>
                                </label>
                                <label
                                    className={`block ${tipo ? 'hidden' : ''}`}
                                >
                                    <span className="font-bold uppercase text-xs">
                                        Cargo
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none ${
                                            errors.cargo && 'border-red-500'
                                        }`}
                                        name="cargo"
                                        {...register('cargo')}
                                    />
                                    <span className="text-red-500 text-xs float-left">
                                        {errors.cargo?.message}
                                    </span>
                                </label>
                                <label
                                    className={`block ${!tipo ? 'hidden' : ''}`}
                                >
                                    <span className="font-bold uppercase text-xs">
                                        Nombre de la empresa
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none ${
                                            errors.empresa && 'border-red-500'
                                        }`}
                                        name="empresa"
                                        {...register('empresa')}
                                    />
                                    <span className="text-red-500 text-xs float-left">
                                        {errors.empresa?.message}
                                    </span>
                                </label>
                                <label
                                    className={`block ${!tipo ? 'hidden' : ''}`}
                                >
                                    <span className="font-bold uppercase text-xs">
                                        Eslogan
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none ${
                                            errors.eslogan && 'border-red-500'
                                        }`}
                                        name="eslogan"
                                        {...register('eslogan')}
                                    />
                                    <span className="text-red-500 text-xs float-left">
                                        {errors.eslogan?.message}
                                    </span>
                                </label>
                                <label className="block">
                                    <span className="font-bold uppercase text-xs">
                                        Descripción
                                    </span>
                                    <textarea
                                        className={`mt-1 block w-full rounded-2xl border-none ${
                                            errors.descripcion &&
                                            'border-red-500'
                                        }`}
                                        name="descripcion"
                                        {...register(
                                            'descripcion',
                                            validationObj
                                        )}
                                    ></textarea>
                                    <span className="text-red-500 text-xs float-left">
                                        {errors.descripcion?.message}
                                    </span>
                                </label>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <label className="block text-center">
                                        <span className="font-bold uppercase text-xs">
                                            Color del nombre
                                        </span>
                                        <input
                                            className="block m-auto"
                                            type="color"
                                            value={initialColorName}
                                            onInput={(e) =>
                                                setinitialColorName(
                                                    e.target.value
                                                )
                                            }
                                            name="colorName"
                                            {...register(
                                                'colorName',
                                                validationObj
                                            )}
                                        />
                                    </label>
                                    <label className="block text-center">
                                        <span className="font-bold uppercase text-xs">
                                            Color de la descripción
                                        </span>
                                        <input
                                            className="block m-auto"
                                            type="color"
                                            value={initialColorDescripcion}
                                            onInput={(e) =>
                                                setinitialColorDescripcion(
                                                    e.target.value
                                                )
                                            }
                                            name="colorDescripcion"
                                            {...register(
                                                'colorDescripcion',
                                                validationObj
                                            )}
                                        />
                                    </label>
                                </div>
                                <label className="block">
                                    <span className="font-bold uppercase text-xs">
                                        Historia
                                    </span>
                                    <textarea
                                        className={`mt-1 block w-full rounded-2xl border-none ${
                                            errors.historia && 'border-red-500'
                                        }`}
                                        name="historia"
                                        {...register('historia', validationObj)}
                                    ></textarea>
                                    <span className="text-red-500 text-xs float-left">
                                        {errors.historia?.message}
                                    </span>
                                </label>
                                <label className="block">
                                    <span className="font-bold uppercase text-xs">
                                        Subir un archivo PDF
                                    </span>
                                    <input
                                        type="file"
                                        multiple
                                        className={`mt-1 block w-full ${
                                            errors.pdf && 'border-red-500'
                                        }`}
                                        placeholder="Subir un archivo PDF"
                                        name="pdf"
                                        onInputCapture={(e) => loadFiles(e)}
                                        {...register('pdf', validationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left">
                                        {errors.pdf?.message}
                                    </span>
                                </label>
                                {numFile !== 0 && renderInputTextFile()}
                                <label className="block text-center">
                                    <span className="font-bold uppercase text-xs">
                                        Subir archivos de imágenes
                                    </span>
                                    <div className=" text-left">
                                        <label className="block text-center">
                                            <span className="font-bold uppercase text-xs float-left">
                                                Foto de portada (1)
                                            </span>
                                            <input
                                                type="file"
                                                className={`mt-1 block w-full ${
                                                    errors.pdf &&
                                                    'border-red-500'
                                                }`}
                                                placeholder="Una foto de portada"
                                                name="fotoPortada"
                                                onInputCapture={(e) =>
                                                    loadFoto(e, 'portada')
                                                }
                                                {...register(
                                                    'fotoPortada',
                                                    validationObj
                                                )}
                                            />
                                            <span className="text-red-500 text-xs float-left">
                                                {errors.nombre?.message}
                                            </span>
                                            <img
                                                className="m-auto my-2"
                                                src={imagePortada}
                                                width={150}
                                                height={150}
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="font-bold uppercase text-xs">
                                                Foto de perfil (2)
                                            </span>
                                            <input
                                                type="file"
                                                multiple
                                                className={`mt-1 block w-full ${
                                                    errors.pdf &&
                                                    'border-red-500'
                                                }`}
                                                placeholder="Dos fotos de perfil"
                                                name="fotosPerfil"
                                                onInputCapture={(e) =>
                                                    loadFoto(e, 'perfil')
                                                }
                                                {...register(
                                                    'fotosPerfil',
                                                    validationObj
                                                )}
                                            />
                                            <span className="text-red-500 text-xs float-left">
                                                {errors.nombre?.message}
                                            </span>
                                            <div className="grid grid-cols-2">
                                                <img
                                                    className="m-auto my-2"
                                                    src={imagePerfil[0]}
                                                    width={150}
                                                    height={150}
                                                />
                                                <img
                                                    className="m-auto my-2"
                                                    src={imagePerfil[1]}
                                                    width={150}
                                                    height={150}
                                                />
                                            </div>
                                        </label>
                                        <label className="block">
                                            <span className="font-bold uppercase text-xs">
                                                Foto de galeria (3)
                                            </span>
                                            <input
                                                type="file"
                                                multiple
                                                className={`mt-1 block w-full ${
                                                    errors.pdf &&
                                                    'border-red-500'
                                                }`}
                                                placeholder="Tres fotos de galreia"
                                                name="fotosGaleria"
                                                onInputCapture={(e) =>
                                                    loadFoto(e, 'galeria')
                                                }
                                                {...register(
                                                    'fotosGaleria',
                                                    validationObj
                                                )}
                                            />
                                            <span className="text-red-500 text-xs float-left">
                                                {errors.nombre?.message}
                                            </span>
                                            <div className="grid grid-cols-3">
                                                <img
                                                    className="m-auto my-2"
                                                    src={imageGaleria[0]}
                                                    width={150}
                                                    height={150}
                                                />
                                                <img
                                                    className="m-auto my-2"
                                                    src={imageGaleria[1]}
                                                    width={150}
                                                    height={150}
                                                />
                                                <img
                                                    className="m-auto my-2"
                                                    src={imageGaleria[2]}
                                                    width={150}
                                                    height={150}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </label>
                                <label className="block">
                                    <span className="font-bold uppercase text-xs">
                                        Telefono
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none ${
                                            errors.telefono && 'border-red-500'
                                        }`}
                                        placeholder="Telefono (Ej. +54 11112222)"
                                        name="telefono"
                                        {...register(
                                            'telefono',
                                            telefonoValidationObj
                                        )}
                                    />
                                    <span className="text-red-500 text-xs float-left">
                                        {errors.telefono?.message}
                                    </span>
                                </label>
                                <label className="block">
                                    <span className="font-bold uppercase text-xs">
                                        Email
                                    </span>
                                    <input
                                        type="email"
                                        className={`mt-1 block w-full rounded-2xl border-none ${
                                            errors.email && 'border-red-500'
                                        }`}
                                        placeholder="john@example.com"
                                        name="email"
                                        {...register(
                                            'email',
                                            emailValidationObj
                                        )}
                                    />
                                    <span className="text-red-500 text-xs float-left">
                                        {errors.email?.message}
                                    </span>
                                </label>
                                <label className="block">
                                    <div className="grid grid-cols-3 gap-4">
                                        <label className="block col-span-2">
                                            <span className="font-bold uppercase text-xs">
                                                Dirección
                                            </span>
                                            <input
                                                type="text"
                                                className={`mt-1 block w-full rounded-2xl border-none ${
                                                    errors.direccion &&
                                                    'border-red-500'
                                                }`}
                                                placeholder="Ej: Belgrano 240"
                                                name="direccion"
                                                {...register(
                                                    'direccion',
                                                    validationObj
                                                )}
                                            />
                                            <span className="text-red-500 text-xs float-left">
                                                {errors.direccion?.message}
                                            </span>
                                        </label>
                                        <label className="block col-span-1">
                                            <span className="font-bold uppercase text-xs">
                                                Calle
                                            </span>
                                            <input
                                                type="number"
                                                className={`mt-1 block w-full rounded-2xl border-none ${
                                                    errors.calle &&
                                                    'border-red-500'
                                                }`}
                                                placeholder="Ej: 30"
                                                name="calle"
                                                {...register(
                                                    'calle',
                                                    validationObj
                                                )}
                                            />
                                            <span className="text-red-500 text-xs float-left">
                                                {errors.calle?.message}
                                            </span>
                                        </label>
                                        <label className="block">
                                            <span className="font-bold uppercase text-xs">
                                                Localidad
                                            </span>
                                            <input
                                                type="text"
                                                className={`mt-1 block w-full rounded-2xl border-none ${
                                                    errors.localidad &&
                                                    'border-red-500'
                                                }`}
                                                placeholder="Ej: Buenos aires"
                                                name="localidad"
                                                {...register(
                                                    'localidad',
                                                    validationObj
                                                )}
                                            />
                                            <span className="text-red-500 text-xs float-left">
                                                {errors.localidad?.message}
                                            </span>
                                        </label>
                                        <label className="block">
                                            <span className="font-bold uppercase text-xs">
                                                Provincia
                                            </span>
                                            <input
                                                type="text"
                                                className={`mt-1 block w-full rounded-2xl border-none ${
                                                    errors.provincia &&
                                                    'border-red-500'
                                                }`}
                                                placeholder="Ej: Jujuy"
                                                name="provincia"
                                                {...register(
                                                    'provincia',
                                                    validationObj
                                                )}
                                            />
                                            <span className="text-red-500 text-xs float-left">
                                                {errors.provincia?.message}
                                            </span>
                                        </label>
                                        <label className="block">
                                            <span className="font-bold uppercase text-xs">
                                                Pais
                                            </span>
                                            <input
                                                type="text"
                                                className={`mt-1 block w-full rounded-2xl border-none ${
                                                    errors.pais &&
                                                    'border-red-500'
                                                }`}
                                                placeholder="Ej: Argentina"
                                                name="pais"
                                                {...register(
                                                    'pais',
                                                    validationObj
                                                )}
                                            />
                                            <span className="text-red-500 text-xs float-left">
                                                {errors.pais?.message}
                                            </span>
                                        </label>
                                    </div>
                                </label>
                                <label className="block text-center">
                                    <span className="font-bold uppercase text-xs">
                                        Redes sociales
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.facebook && 'border-red-500'
                                        }`}
                                        placeholder="Facebook"
                                        name="facebook"
                                        {...register('facebook')}
                                    />
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.twitter && 'border-red-500'
                                        }`}
                                        placeholder="Twitter"
                                        name="twitter"
                                        {...register('twitter')}
                                    />
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.instagram && 'border-red-500'
                                        }`}
                                        placeholder="Instagram"
                                        name="instagram"
                                        {...register('instagram')}
                                    />
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.linkedin && 'border-red-500'
                                        }`}
                                        placeholder="Linkedin"
                                        name="linkedin"
                                        {...register('linkedin')}
                                    />
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.wijex && 'border-red-500'
                                        }`}
                                        placeholder="Wijex"
                                        name="wijex"
                                        {...register('wijex')}
                                    />
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.youtube && 'border-red-500'
                                        }`}
                                        placeholder="Youtube"
                                        name="youtube"
                                        {...register('youtube')}
                                    />
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.tiktok && 'border-red-500'
                                        }`}
                                        placeholder="TikTok"
                                        name="tiktok"
                                        {...register('tiktok')}
                                    />
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.telegram && 'border-red-500'
                                        }`}
                                        placeholder="Telegram"
                                        name="telegram"
                                        {...register('telegram')}
                                    />
                                </label>

                                <label className="block">
                                    <span className="font-bold uppercase text-xs">
                                        Token
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none ${
                                            errors.token && 'border-red-500'
                                        }`}
                                        name="token"
                                        {...register('token', validationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left">
                                        {errors.token?.message}
                                    </span>
                                </label>
                                <div className="flex justify-between text-right">
                                    <button
                                        type="button"
                                        name="previsualizar"
                                        className={style.btnPreView}
                                        onClick={handlePreView}
                                    >
                                        Pre-visualizar
                                    </button>
                                    <button
                                        type="submit"
                                        name="form"
                                        className={style.btnEnviar}
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {showModal && (
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto mx-auto">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-screen bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-3xl font-semibold">
                                    Pre-visualizacion
                                </h3>
                                <button
                                    className="p-1 ml-auto  border-0 text-black float-right text-h4 leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className=" text-black h-6 w-6 text-h4 block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            <div className="relative flex-auto overflow-x-hidden overflow-y-auto">
                                {layoutContent}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showModalCreate && (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between rounded-t pr-2 pt-2">
                                    <button
                                        className="p-1 ml-auto  border-0 text-black float-right text-h4 leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => {
                                            if(message == 0){
                                                Router.push('/login')
                                            }else{
                                                setShowModalCreate(false)
                                            }
                                        }}
                                    >
                                        <span className=" text-black h-6 w-6 text-h4 block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative py-12 px-11 flex-auto text-center">
                                    {message === 0 && (
                                        <>
                                            <h3 className="text-h1-d">¡Felicitaciones!</h3>
                                            <h3 className="text-h2-d">Formulario creado con exito!</h3>
                                        </>
                                    )}

                                    {message === 1 && (
                                        <>
                                            <h3 className="text-h1-d">Token Invalido</h3>
                                        </>
                                    )}

                                    {message === 2 && (
                                        <>
                                            <h3 className="text-h1-d">El token ya fue utilizado</h3>
                                        </>
                                    )}

                                    {message === 3 && (
                                        <>
                                            <h3 className="text-h1-d">Error inesperado</h3>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </>
    )
}
export default FormWebCard
