import React, { useEffect, useState, useRef } from 'react'
import Router from 'next/router'
import { useForm } from 'react-hook-form'

// Services
import { upload, getToken, cambiarEstadoToken } from '../../../services/form'
import { storage } from '../../../services/firebase'
import { getPosition } from '../../../services/maps'

// Components
import Template1 from '../../templates/WebCards/template1'
import Template2 from '../../templates/WebCards/template2'
import Template3 from '../../templates/WebCards/template3'
import Template4 from '../../templates/WebCards/template4'
import GoogleMap from '../../molecules/map'

// Utils
import { regexPhone, regexEmail, regexAlfabetico, regexFacebook, regexInstagram, regexLinkedin, regexTelegram, regexTiktok, regexTwitter, regexWijex, regexYoutube, regexToken } from '../../../utils/utils'
import { getCountries, getStates, getCities } from '../../../utils/address'

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
    historia: string
    colorNombre: string
    colorDescripcion: string
    themeColor1: string
    pdf?: any
    fotoPortada: any
    fotosPerfil?: Array<string>
    fotosPerfil1: any
    fotosPerfil2: any
    fotosGaleria?: Array<string>
    fotosGaleria1: any
    fotosGaleria2: any
    fotosGaleria3: any
    telefono: string
    email: string
    direccion: string
    calle: string
    localidad: string
    provincia: string
    pais: string
    latitud?: string
    longitud?: string
    template?: string
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
    const [errorPdf, setErrorPdf] = useState(false)
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
    const [initialColorTheme1, setinitialColorTheme1] = useState('#000000')
    const [initialColorName, setinitialColorName] = useState('#000000')
    const [initialColorDescripcion, setinitialColorDescripcion] =
        useState('#000000')
    const [paises, setPaises] = useState([])
    const [provincias, setProvincias] = useState([])
    const [localidades, setLocalidades] = useState([])
    const [latitud, setLatitud] = useState(-34.5874941)
    const [longitud, setLongitud] = useState(-58.4569339)
    const [zoom, setZoom] = useState(8)
    const [template, setTemplate] = useState(1)
    const [selectTemplate, setSelectTemplate] = useState([
        'opacity-25',
        '',
        '',
        '',
    ])

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
        trigger,
        setError
    } = useForm<formData>({
        mode: 'onSubmit',
    })
    const refPdf = useRef(null)

    useEffect(() => {
        getCountriesExternal()
    })

    const getCountriesExternal = () => {
        const countries = getCountries()
        setPaises(countries)
    }

    const getStatesExternal = (event) => {
        const idCountry = event.target[event.target.selectedIndex].id
        const states = getStates(idCountry)
        setProvincias(states)
        setLocalidades([])
    }

    const getCitiesExternal = (event) => {
        const idState = event.target[event.target.selectedIndex].id
        const cities = getCities(idState)
        setLocalidades(cities)
    }
    const validationObj = {
        required: 'Campo requerido',
    }
    const apellidoValidationObj = {
        pattern: {
            value: regexAlfabetico,
            message: 'Apellido inválido. Solo se permite letras',
        },
        required: tipo === 0?'El Apellido es un campo requerido':false,
    }
    const nombreValidationObj = {
        pattern: {
            value: regexAlfabetico,
            message: 'Nombre inválido. Solo se permite letras',
        },
        required: tipo === 0 ? 'El Nombre es un campo requerido':false,
    }
    const empresaValidationObj = {
        pattern: {
            value: regexAlfabetico,
            message: 'Nombre empresa inválido. Solo se permite letras',
        },
        required: tipo === 1?'El Nombre de empresa es un campo requerido':false,
    }
    const esloganValidationObj = {
        required: tipo === 1?'El Eslogan es un campo requerido':false,
    }
    const cargoValidationObj = {
        pattern: {
            value: regexAlfabetico,
            message: 'Cargo inválido. Solo se permite letras',
        },
        required: tipo === 0?'El Cargo es un campo requerido':false,
    }
    const telefonoValidationObj = {
        required: 'Campo requerido',
        pattern: {
            value: regexPhone,
            message: 'Telefono inválido',
        },
    }
    const facebookValidationObj = {
        pattern: {
            value: regexFacebook,
            message: 'Facebook inválido',
        },
    }
    const twitterValidationObj = {
        pattern: {
            value: regexTwitter,
            message: 'Twitter inválido',
        },
    }
    const instagramValidationObj = {
        pattern: {
            value: regexInstagram,
            message: 'Instagram inválido',
        },
    }
    const linkedinValidationObj = {
        pattern: {
            value: regexLinkedin,
            message: 'Linkedin inválido',
        },
    }
    const wijexValidationObj = {
        pattern: {
            value: regexWijex,
            message: 'Wijex inválido',
        },
    }
    const youtubeValidationObj = {
        pattern: {
            value: regexYoutube,
            message: 'Youtube inválido',
        },
    }
    const tiktokValidationObj = {
        pattern: {
            value: regexTiktok,
            message: 'Tiktok inválido',
        },
    }
    const telegramValidationObj = {
        pattern: {
            value: regexTelegram,
            message: 'Telegram inválido',
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
    const imageValidationObj = {
        required: 'Campo requerido y la resolución minima es de 1280x720',
    }
    const tipoValidationObj = {
        required: 'Debe seleccionar un tipo de usuario',
    }
    const tokenValidationObj = {
        required: 'El token es requerido',
        pattern: {
            value: regexToken,
            message: 'Token inválido',
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

                let img = new Image()
                img.src = objectUrl
                img.onload = async () => {
                    const ancho = img.width
                    const alto = img.height
                    if (ancho < 1280 || alto < 720) {
                        setValue('fotoPortada', null)
                        setImagePortada('/images/loadImage.jpg')
                        await trigger("fotoPortada")
                    }
                }
                setImagePortada(objectUrl)
            }else{
                setImagePortada('/images/loadImage.jpg')
            }
        } else if (tipo === 'perfil1') {
            const fotos = e.target.files
            if (fotos.length > 0) {
                const objectUrl1 = fotos[0]
                    ? URL.createObjectURL(fotos[0])
                    : '/images/loadImage.jpg'
                let img1 = new Image()
                img1.src = objectUrl1
                img1.onload = async () => {
                    const ancho = img1.width
                    const alto = img1.height
                    
                    if (ancho < 1280 || alto < 720) {
                        setValue('fotosPerfil1', null)
                        if (imagePerfil[1]) {
                            setImagePerfil(['/images/loadImage.jpg', imagePerfil[1]])
                        }else{
                            setImagePerfil(['/images/loadImage.jpg'])
                        }
                        await trigger("fotosPerfil1")
                    }else {
                        
                        if (imagePerfil[1]) {
                            setImagePerfil([objectUrl1, imagePerfil[1]])
                        } else {
                            setImagePerfil([objectUrl1])
                        }
                    }
                }
            }
        } else if (tipo === 'perfil2') {
            const fotos = e.target.files
            if (fotos.length > 0) {

                const objectUrl2 = fotos[0]
                    ? URL.createObjectURL(fotos[0])
                    : '/images/loadImage.jpg'
                let img1 = new Image()
                img1.src = objectUrl2
                img1.onload = async () => {
                    const ancho = img1.width
                    const alto = img1.height
                    if (ancho < 1280 || alto < 720) {
                        setValue('fotosPerfil2', null)
                        if (imagePerfil[0]) {
                            setImagePerfil([imagePerfil[0], '/images/loadImage.jpg'])
                        } else {
                            setImagePerfil(['/images/loadImage.jpg', '/images/loadImage.jpg'])
                        }
                        await trigger("fotosPerfil2")
                    }else{
                        if (imagePerfil[0]) {
                            setImagePerfil([imagePerfil[0], objectUrl2])
                        } else {
                            setImagePerfil(['/images/loadImage.jpg', objectUrl2])
                        }
                    }
                }

            }
        } else if (tipo === 'galeria1') {
            const fotos = e.target.files
            if (fotos.length > 0) {

                const objectUrl1 = fotos[0]
                    ? URL.createObjectURL(fotos[0])
                    : '/images/loadImage.jpg'
                let img1 = new Image()
                img1.src = objectUrl1
                img1.onload = async () => {
                    const ancho = img1.width
                    const alto = img1.height
                    if (ancho < 1280 || alto < 720) {
                        setValue('fotosGaleria1', null)
    
                        let data = JSON.parse(JSON.stringify(imageGaleria))
                        data[0] = '/images/loadImage.jpg'
    
                        setImageGaleria(data)
                        await trigger("fotosGaleria1")
                    }else {
                        let data = JSON.parse(JSON.stringify(imageGaleria))
                        data[0] = objectUrl1
        
                        setImageGaleria(data)
                    }
                }
            }
        } else if (tipo === 'galeria2') {
            const fotos = e.target.files
            if (fotos.length > 0) {

                const objectUrl2 = fotos[0]
                    ? URL.createObjectURL(fotos[0])
                    : '/images/loadImage.jpg'
                let img1 = new Image()
                img1.src = objectUrl2
                img1.onload = async () => {
                    const ancho = img1.width
                    const alto = img1.height
                    if (ancho < 1280 || alto < 720) {
                        setValue('fotosGaleria2', null)
    
                        let data = JSON.parse(JSON.stringify(imageGaleria))
                        data[1] = '/images/loadImage.jpg'
        
                        setImageGaleria(data)
                        await trigger("fotosGaleria2")
                    }else {
                        let data = JSON.parse(JSON.stringify(imageGaleria))
                        data[1] = objectUrl2
        
                        setImageGaleria(data)

                    }
                }
            }
        } else if (tipo === 'galeria3') {
            const fotos = e.target.files
            if (fotos.length > 0) {
                const objectUrl3 = fotos[0]
                    ? URL.createObjectURL(fotos[0])
                    : '/images/loadImage.jpg'
                let img1 = new Image()
                img1.src = objectUrl3
                img1.onload = async () => {
                    const ancho = img1.width
                    const alto = img1.height
                    if (ancho < 1280 || alto < 720) {
                        setValue('fotosGaleria3', null)
    
                        let data = JSON.parse(JSON.stringify(imageGaleria))
                        data[2] = '/images/loadImage.jpg'
        
                        setImageGaleria(data)
                        await trigger("fotosGaleria3")
                    }else {
                        let data = JSON.parse(JSON.stringify(imageGaleria))
                        data[2] = objectUrl3
        
                        setImageGaleria(data)
                    }
                }

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
        setMessage(4)
        setShowModalCreate(true)

        const token = await getToken(data.token)
        if (token.data.length > 0) {
            if (!token.data[0].estado) {
                try {
                    if (data.pdf) {
                        let pdfData = []
                        for (let i = 0; i < data.pdf.length; i++) {
                            const uploadTask = await storage
                                .ref(`/files/${data.pdf[i].name}`)
                                .put(data.pdf[i])
                            const url = await uploadTask.ref.getDownloadURL()
                            pdfData.push({
                                url,
                                btnNombre: btnNombre[i] ? btnNombre[i] : '',
                            })
                        }
                        data.pdf = pdfData
                    }

                    if (data.fotoPortada) {
                        const uploadTask = await storage
                            .ref(`/images/${data.fotoPortada[0].name}`)
                            .put(data.fotoPortada[0])
                        const url = await uploadTask.ref.getDownloadURL()
                        data.fotoPortada = url
                    }

                    let fPerfil = []
                    if (data.fotosPerfil1) {
                        const uploadTask1 = await storage
                            .ref(`/images/${data.fotosPerfil1[0].name}`)
                            .put(data.fotosPerfil1[0])
                        const url = await uploadTask1.ref.getDownloadURL()
                        fPerfil[0] = url
                        delete data.fotosPerfil1
                    }

                    if (data.fotosPerfil2) {
                        const uploadTask1 = await storage
                            .ref(`/images/${data.fotosPerfil2[0].name}`)
                            .put(data.fotosPerfil2[0])
                        const url = await uploadTask1.ref.getDownloadURL()

                        fPerfil[1] = url
                        delete data.fotosPerfil2
                    }

                    data.fotosPerfil = fPerfil

                    let fGaleria = []
                    if (data.fotosGaleria1) {
                        const uploadTask1 = await storage
                            .ref(`/images/${data.fotosGaleria1[0].name}`)
                            .put(data.fotosGaleria1[0])
                        const url = await uploadTask1.ref.getDownloadURL()

                        fGaleria[0] = url
                        delete data.fotosGaleria1
                    }

                    if (data.fotosGaleria2) {
                        const uploadTask1 = await storage
                            .ref(`/images/${data.fotosGaleria2[0].name}`)
                            .put(data.fotosGaleria2[0])
                        const url = await uploadTask1.ref.getDownloadURL()

                        fGaleria[1] = url
                        delete data.fotosGaleria2
                    }

                    if (data.fotosGaleria3) {
                        const uploadTask1 = await storage
                            .ref(`/images/${data.fotosGaleria3[0].name}`)
                            .put(data.fotosGaleria3[0])
                        const url = await uploadTask1.ref.getDownloadURL()

                        fGaleria[2] = url
                        delete data.fotosGaleria3
                    }

                    data.fotosGaleria = fGaleria

                    data.latitud = latitud.toString()
                    data.longitud = longitud.toString()
                    data.template = template.toString()

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
                    console.log(error)
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
    }
    const handlePreView = async () => {
        const result = await trigger()
        if (result) {
            console.log(validateBtnNombre())
            if(validateBtnNombre()){
                const PERSONAL_DATA = {
                    TIPO: tipo,
                    NAME: getValues('nombre') + ' ' + getValues('apellido'),
                    EMPRESA: getValues('empresa'),
                    COLORNAME: getValues('colorNombre'),
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
                    LATITUD: latitud,
                    LONGITUD: longitud,
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
                if(template === 1){
                    setLayoutContent(
                        <Template1
                            contact={CONTACT_DATA}
                            curriculum={CURRICULUM_DATA}
                            image={IMAGE_DATA}
                            personal={PERSONAL_DATA}
                            social={SOCIALNET_DATA}
                            color1={getValues('themeColor1')}
                        />
                    )
                }else if(template === 2){
                    setLayoutContent(
                        <Template2
                            contact={CONTACT_DATA}
                            curriculum={CURRICULUM_DATA}
                            image={IMAGE_DATA}
                            personal={PERSONAL_DATA}
                            social={SOCIALNET_DATA}
                            color1={getValues('themeColor1')}
                        />
                    )
                }else if(template === 3){
                    setLayoutContent(
                        <Template3
                            contact={CONTACT_DATA}
                            curriculum={CURRICULUM_DATA}
                            image={IMAGE_DATA}
                            personal={PERSONAL_DATA}
                            social={SOCIALNET_DATA}
                            color1={getValues('themeColor1')}
                        />
                    )
                }else if(template === 4){
                    setLayoutContent(
                        <Template4
                            contact={CONTACT_DATA}
                            curriculum={CURRICULUM_DATA}
                            image={IMAGE_DATA}
                            personal={PERSONAL_DATA}
                            social={SOCIALNET_DATA}
                            color1={getValues('themeColor1')}
                        />
                    )
                }
                setShowModal(true)
            }else{
                setErrorPdf(true)
                refPdf.current.scrollIntoView({ behavior: 'smooth' })
            }
        }else{
            const errorsvalues = Object.values(errors)
            errorsvalues[0].ref.scrollIntoView({ behavior: 'smooth' })
        }
    }
    const updateBtnNombre = (e, index) => {
        const value = e.target.value
        let data = btnNombre
        data[index] = value

        setBtnNombre(data)

        if(validateBtnNombre()){
            setErrorPdf(false)
        }else{
            setErrorPdf(true)
        }
    }
    const validateBtnNombre = () => {
        let retorno = true
        if(numFile !== btnNombre.length){
            retorno = false
        }

        btnNombre.forEach(element => {
            if(element === ''){
                retorno = false
            }
        })

        return retorno
    }
    const setPositionMap = async () => {
        if (
            getValues('direccion') !== '' &&
            getValues('calle') !== '' &&
            getValues('localidad') !== '' &&
            getValues('provincia') !== '' &&
            getValues('pais') !== ''
        ) {
            const address =
                ' Calle ' +
                getValues('calle') +
                ' ' +
                getValues('direccion') +
                ' ' +
                getValues('localidad') +
                ' ' +
                getValues('provincia') +
                ' ' +
                getValues('pais')
            const { data } = await getPosition(address)
            if (data.results[0]) {
                setZoom(16)
                setLatitud(data.results[0].geometry.location.lat)
                setLongitud(data.results[0].geometry.location.lng)
            }
        }
    }
    const clickTemplate = (id) => {
        if(id===1){
            setTemplate(1)
            setSelectTemplate([
                'opacity-25',
                '',
                '',
                '',
            ])
        }else if(id===2){
            setTemplate(2)
            setSelectTemplate([
                '',
                'opacity-25',
                '',
                '',
            ])
        }else if(id===3){
            setTemplate(3)
            setSelectTemplate([
                '',
                '',
                'opacity-25',
                '',
            ])
        }else if(id===4){
            setTemplate(4)
            setSelectTemplate([
                '',
                '',
                '',
                'opacity-25',
            ])
        }
    }
    return (
        <>
            <div className={`${style.contentForm} md:p-20 p-10`}>
                <form onSubmit={handleSubmit(handleSend)}>
                    <div className="text-center">
                        <h1 className="text-d3-m md:text-d2-d font-bold">
                            WEBCARD
                        </h1>
                        <p className="mt-2 text-h6 md:text-h3 font-bold">
                            LE PONEMOS CORAZÓN, AL MUNDO DIGITAL.
                        </p>
                    </div>
                    <div className="pt-6 md:pt-12">
                        <div className="">
                            <div className="grid grid-cols-1 gap-6">
                                <label className="block text-center">
                                    <span className="font-bold uppercase text-xs">
                                        Tipo de usuario
                                    </span>
                                    <div className="grid grid-cols-2 md:text-center text-inherit">
                                        <div className="block md:pl-6 ">
                                            <input
                                                className="form-radio mr-2"
                                                type="radio"
                                                name="tipo"
                                                value="0"
                                                required
                                                onInput={async () => {
                                                    await trigger("tipo")
                                                }}
                                                onClick={() => setTipo(0)}
                                                {...register(
                                                    'tipo',
                                                    tipoValidationObj
                                                )}
                                            />
                                            <label className="inline-block">
                                                Personal
                                            </label>
                                        </div>
                                        <div className="block md:pl-6">
                                            <input
                                                className="form-radio mr-2"
                                                type="radio"
                                                name="tipo"
                                                value="1"
                                                required
                                                onInput={async () => {
                                                    await trigger("tipo")
                                                }}
                                                onClick={() => setTipo(1)}
                                                {...register(
                                                    'tipo',
                                                    tipoValidationObj
                                                )}
                                            />
                                            <label className="inline-block">
                                                Empresarial
                                            </label>
                                        </div>
                                    </div>
                                    <span className="text-red-500 text-xs margin-auto">
                                        {errors.tipo?.message}
                                    </span>
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
                                        onInput={async () => {
                                            await trigger("nombre")
                                        }}
                                        required={tipo === 0}
                                        {...register('nombre', nombreValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
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
                                        onInput={async () => {
                                            await trigger("apellido")
                                        }}
                                        required={tipo === 0}
                                        {...register('apellido', apellidoValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
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
                                        onInput={async () => {
                                            await trigger("cargo")
                                        }}
                                        required={tipo === 0}
                                        placeholder="Ingreso de cargo pretendido"
                                        {...register('cargo', cargoValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
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
                                        onInput={async () => {
                                            await trigger("empresa")
                                        }}
                                        required={tipo === 1}
                                        {...register('empresa', empresaValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
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
                                        onInput={async () => {
                                            await trigger("eslogan")
                                        }}
                                        required={tipo === 1}
                                        {...register('eslogan', esloganValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {errors.eslogan?.message}
                                    </span>
                                </label>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <label className="block text-center">
                                        <span className="font-bold uppercase text-xs">
                                            Color del nombre y apellido
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
                                            name="colorNombre"
                                            {...register(
                                                'colorNombre',
                                                validationObj
                                            )}
                                        />
                                    </label>
                                    <label className="block text-center">
                                        <span className="font-bold uppercase text-xs">
                                            Color del {tipo === 0? 'cargo': 'eslogan'}
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
                                        {tipo === 0? 'Historia personal o profesional (en menos de 100 caracteres)': 'Historia de la empresa (en menos de 100 caracteres)'}
                                    </span>
                                    <textarea
                                        className={`mt-1 block w-full rounded-2xl border-none ${
                                            errors.historia && 'border-red-500'
                                        }`}
                                        name="historia"
                                        onInput={async () => {
                                            await trigger("historia")
                                        }}
                                        placeholder={tipo === 0?'Comentarios acerca de la carreran profesional del usuario o trayectoria empresarial':'Comentarios acerca de la carrera profesional del usuario o trayectoria empresarial'}
                                        {...register('historia', validationObj)}
                                    ></textarea>
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {errors.historia?.message}
                                    </span>
                                </label>
                                <label className="block">
                                    <span className="font-bold uppercase text-xs">
                                        {tipo === 0? 'Adjuntar CV/Catálogo u otro en formato pdf': 'Adjuntar catálogos/especificaciones de productos u otro en formato pdf'}
                                    </span>
                                    <input
                                        type="file"
                                        multiple
                                        className={`mt-1 block w-full ${
                                            errors.pdf && 'border-red-500'
                                        }`}
                                        placeholder="Subir un archivo PDF"
                                        name="pdf"
                                        onInputCapture={async (e) => {
                                            loadFiles(e)
                                        }}
                                        {...register('pdf', validationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {numFile === 0 && errors.pdf?.message}
                                    </span>
                                    <span ref={refPdf} className="text-red-500 text-xs float-left mt-2">
                                        {errorPdf && 'Parece que falta por rellenar algún nombre de los botones'}
                                    </span>
                                </label>
                                {numFile !== 0 && renderInputTextFile()}
                                <label className="block text-center">
                                    <span className="font-bold uppercase text-xs">
                                        Subir archivos de imágenes (Admite formato jpg y png)
                                    </span>
                                    <div className=" text-left">
                                        <label className="block text-center">
                                            <span className="font-bold uppercase text-xs float-left">
                                                Foto de portada (1)
                                            </span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className={`mt-1 block w-full ${
                                                    errors.pdf &&
                                                    'border-red-500'
                                                }`}
                                                placeholder="Una foto de portada"
                                                name="fotoPortada"
                                                onInputCapture={(e) =>
                                                    loadFoto(e, 'portada')
                                                }
                                                onClickCapture={() => setImagePortada('/images/loadImage.jpg')}
                                                {...register(
                                                    'fotoPortada',
                                                    imageValidationObj
                                                )}
                                            />
                                            <span className="text-red-500 text-xs float-left contents">
                                                {imagePortada === '/images/loadImage.jpg' && errors.fotoPortada?.message}
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
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <img
                                                        className="m-auto my-2"
                                                        src={imagePerfil[0]}
                                                        width={150}
                                                        height={150}
                                                    />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className={`mt-1 block w-full ${
                                                            errors.pdf &&
                                                            'border-red-500'
                                                        }`}
                                                        name="fotosPerfil1"
                                                        onInputCapture={(e) =>
                                                            loadFoto(
                                                                e,
                                                                'perfil1'
                                                            )
                                                        }
                                                        onClickCapture={() =>{ 
                                                            if (imagePerfil[1]) {
                                                                setImagePerfil(['/images/loadImage.jpg', imagePerfil[1]])
                                                            } else {
                                                                setImagePerfil(['/images/loadImage.jpg'])
                                                            }
                                                        }}
                                                        {...register(
                                                            'fotosPerfil1',
                                                            imageValidationObj
                                                        )}
                                                    />
                                                    <span className="text-red-500 text-xs float-left contents">
                                                        {imagePerfil[0] === '/images/loadImage.jpg' && errors.fotosPerfil1?.message}
                                                    </span>
                                                </div>
                                                <div>
                                                    <img
                                                        className="m-auto my-2"
                                                        src={imagePerfil[1]}
                                                        width={150}
                                                        height={150}
                                                    />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className={`mt-1 block w-full ${
                                                            errors.pdf &&
                                                            'border-red-500'
                                                        }`}
                                                        name="fotosPerfil2"
                                                        onInputCapture={(e) =>
                                                            loadFoto(
                                                                e,
                                                                'perfil2'
                                                            )
                                                        }
                                                        onClickCapture={() =>{ 
                                                            if (imagePerfil[0]) {
                                                                setImagePerfil([imagePerfil[0], '/images/loadImage.jpg'])
                                                            } else {
                                                                setImagePerfil(['/images/loadImage.jpg', '/images/loadImage.jpg'])
                                                            }
                                                        }}
                                                        {...register(
                                                            'fotosPerfil2',
                                                            imageValidationObj
                                                        )}
                                                    />
                                                    <span className="text-red-500 text-xs float-left contents">
                                                        {imagePerfil[1] === '/images/loadImage.jpg' && errors.fotosPerfil2?.message}
                                                    </span>
                                                </div>
                                            </div>
                                        </label>
                                        <label className="block">
                                            <span className="font-bold uppercase text-xs">
                                                Foto de galeria (3)
                                            </span>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <img
                                                        className="m-auto my-2"
                                                        src={imageGaleria[0]}
                                                        width={150}
                                                        height={150}
                                                    />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className={`mt-1 block w-full ${
                                                            errors.pdf &&
                                                            'border-red-500'
                                                        }`}
                                                        onInputCapture={(e) =>
                                                            loadFoto(
                                                                e,
                                                                'galeria1'
                                                            )
                                                        }
                                                        onClickCapture={() =>{ 
                                                            let data = JSON.parse(JSON.stringify(imageGaleria))
                                                            data[0] = '/images/loadImage.jpg'

                                                            setImageGaleria(data)
                                                        }}
                                                        {...register(
                                                            'fotosGaleria1',
                                                            imageValidationObj
                                                        )}
                                                    />
                                                    <span className="text-red-500 text-xs float-left contents">
                                                        {imageGaleria[0] === '/images/loadImage.jpg' && errors.fotosGaleria1?.message}
                                                    </span>
                                                </div>
                                                <div>
                                                    <img
                                                        className="m-auto my-2"
                                                        src={imageGaleria[1]}
                                                        width={150}
                                                        height={150}
                                                    />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className={`mt-1 block w-full ${
                                                            errors.pdf &&
                                                            'border-red-500'
                                                        }`}
                                                        onInputCapture={(e) =>
                                                            loadFoto(
                                                                e,
                                                                'galeria2'
                                                            )
                                                        }
                                                        onClickCapture={() =>{ 
                                                            let data = JSON.parse(JSON.stringify(imageGaleria))
                                                            data[1] = '/images/loadImage.jpg'

                                                            setImageGaleria(data)
                                                        }}
                                                        {...register(
                                                            'fotosGaleria2',
                                                            imageValidationObj
                                                        )}
                                                    />
                                                    <span className="text-red-500 text-xs float-left contents">
                                                        {imageGaleria[1] === '/images/loadImage.jpg' && errors.fotosGaleria2?.message}
                                                    </span>
                                                </div>
                                                <div>
                                                    <img
                                                        className="m-auto my-2"
                                                        src={imageGaleria[2]}
                                                        width={150}
                                                        height={150}
                                                    />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className={`mt-1 block w-full ${
                                                            errors.pdf &&
                                                            'border-red-500'
                                                        }`}
                                                        onInputCapture={(e) =>
                                                            loadFoto(
                                                                e,
                                                                'galeria3'
                                                            )
                                                        }
                                                        onClickCapture={() =>{ 
                                                            let data = JSON.parse(JSON.stringify(imageGaleria))
                                                            data[2] = '/images/loadImage.jpg'

                                                            setImageGaleria(data)
                                                        }}
                                                        {...register(
                                                            'fotosGaleria3',
                                                            imageValidationObj
                                                        )}
                                                    />
                                                    <span className="text-red-500 text-xs float-left contents">
                                                        {imageGaleria[2] === '/images/loadImage.jpg' && errors.fotosGaleria3?.message}
                                                    </span>
                                                </div>
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
                                        onInput={async () => {
                                            await trigger("telefono")
                                        }}
                                        {...register(
                                            'telefono',
                                            telefonoValidationObj
                                        )}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
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
                                        onInput={async () => {
                                            await trigger("email")
                                        }}
                                        {...register(
                                            'email',
                                            emailValidationObj
                                        )}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {errors.email?.message}
                                    </span>
                                </label>
                                <label className="block">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <label className="block">
                                            <span className="font-bold uppercase text-xs">
                                                Pais
                                            </span>
                                            <select 
                                                name="pais" 
                                                className={`mt-1 block w-full rounded-2xl border-none ${
                                                    errors.pais &&
                                                    'border-red-500'
                                                }`}
                                                onChangeCapture={async (e) => {
                                                    getStatesExternal(e)
                                                }}
                                                {...register(
                                                    'pais',
                                                    validationObj
                                                )}
                                            >
                                                {paises.map((element, index) => <option key={index} value={element.name} id={element.id} >{element.name}</option>)}
                                            </select>
                                            <span className="text-red-500 text-xs float-left mt-2">
                                                {errors.pais?.message}
                                            </span>
                                        </label>
                                        <label className="block">
                                            <span className="font-bold uppercase text-xs">
                                                Provincia
                                            </span>
                                            <select 
                                                name="provincia" 
                                                className={`mt-1 block w-full rounded-2xl border-none ${
                                                    errors.provincia &&
                                                    'border-red-500'
                                                }`}
                                                onChangeCapture={async (e) => {
                                                    getCitiesExternal(e)
                                                }}
                                                {...register(
                                                    'provincia',
                                                    validationObj
                                                )}
                                            >
                                                {provincias.map((element, index) => <option key={index} value={element.name} id={element.id}>{element.name}</option>)}
                                            </select>
                                            <span className="text-red-500 text-xs float-left mt-2">
                                                {errors.provincia?.message}
                                            </span>
                                        </label>
                                        <label className="block">
                                            <span className="font-bold uppercase text-xs">
                                                Localidad
                                            </span>
                                            <select 
                                                name="localidad" 
                                                className={`mt-1 block w-full rounded-2xl border-none ${
                                                    errors.localidad &&
                                                    'border-red-500'
                                                }`}
                                                {...register(
                                                    'localidad',
                                                    validationObj
                                                )}
                                            >
                                                {localidades.map((element, index) => <option key={index} value={element.name} id={element.id}>{element.name}</option>)}
                                            </select>
                                            <span className="text-red-500 text-xs float-left mt-2">
                                                {errors.localidad?.message}
                                            </span>
                                        </label>
                                        <label className="block col-span-1 md:col-span-2">
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
                                                onInput={async (e) =>{
                                                    await trigger("direccion")
                                                    setPositionMap(e)
                                                }}
                                                {...register(
                                                    'direccion',
                                                    validationObj
                                                )}
                                            />
                                            <span className="text-red-500 text-xs float-left mt-2">
                                                {errors.direccion?.message}
                                            </span>
                                        </label>
                                        <label className="block col-span-1">
                                            <span className="font-bold uppercase text-xs">
                                                Número
                                            </span>
                                            <input
                                                type="number"
                                                className={`mt-1 block w-full rounded-2xl border-none ${
                                                    errors.calle &&
                                                    'border-red-500'
                                                }`}
                                                placeholder="Ingresar número del domicilio"
                                                name="calle"
                                                onInput={async (e) => {
                                                    await trigger("calle")
                                                    setPositionMap(e)
                                                }}
                                                {...register(
                                                    'calle',
                                                    validationObj
                                                )}
                                            />
                                            <span className="text-red-500 text-xs float-left mt-2">
                                                {errors.calle?.message}
                                            </span>
                                        </label>
                                    </div>
                                </label>
                                <label className="block">
                                    <GoogleMap
                                        latitud={latitud}
                                        longitud={longitud}
                                        zoom={zoom}
                                        setLat={setLatitud}
                                        setLng={setLongitud}
                                        setZoom={setZoom}
                                        disabled={false}
                                    />
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
                                        onInput={async () => {
                                            await trigger("facebook")
                                        }}
                                        onPointerUp={async () => {
                                            await trigger("facebook")
                                        }}
                                        onPointerOut={async () => {
                                            await trigger("facebook")
                                        }}
                                        placeholder="Facebook (Ej. https://www.facebook.com/wijexcompany)"
                                        name="facebook"
                                        {...register('facebook', facebookValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {errors.facebook?.message}
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.twitter && 'border-red-500'
                                        }`}
                                        placeholder="Twitter (Ej. https://twitter.com/elonmusk)"
                                        name="twitter"
                                        onInput={async () => {
                                            await trigger("twitter")
                                        }}
                                        onPointerUp={async () => {
                                            await trigger("twitter")
                                        }}
                                        onPointerOut={async () => {
                                            await trigger("twitter")
                                        }}
                                        {...register('twitter', twitterValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {errors.twitter?.message}
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.instagram && 'border-red-500'
                                        }`}
                                        onInput={async () => {
                                            await trigger("instagram")
                                        }}
                                        onPointerUp={async () => {
                                            await trigger("instagram")
                                        }}
                                        onPointerOut={async () => {
                                            await trigger("instagram")
                                        }}
                                        placeholder="Instagram (Ej. https://www.instagram.com/ceowijex/)"
                                        name="instagram"
                                        {...register('instagram', instagramValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {errors.instagram?.message}
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.linkedin && 'border-red-500'
                                        }`}
                                        onInput={async () => {
                                            await trigger("linkedin")
                                        }}
                                        onPointerUp={async () => {
                                            await trigger("linkedin")
                                        }}
                                        onPointerOut={async () => {
                                            await trigger("linkedin")
                                        }}
                                        placeholder="Linkedin (Ej. https://www.linkedin.com/company/wijex/)"
                                        name="linkedin"
                                        {...register('linkedin', linkedinValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {errors.linkedin?.message}
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.wijex && 'border-red-500'
                                        }`}
                                        onInput={async () => {
                                            await trigger("wijex")
                                        }}
                                        onPointerUp={async () => {
                                            await trigger("wijex")
                                        }}
                                        onPointerOut={async () => {
                                            await trigger("wijex")
                                        }}
                                        placeholder="Wijex (Ej. https://wijex.com/index.php?a=profile&u=alvaroramirez5457)"
                                        name="wijex"
                                        {...register('wijex', wijexValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {errors.wijex?.message}
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.youtube && 'border-red-500'
                                        }`}
                                        onInput={async () => {
                                            await trigger("youtube")
                                        }}
                                        onPointerUp={async () => {
                                            await trigger("youtube")
                                        }}
                                        onPointerOut={async () => {
                                            await trigger("youtube")
                                        }}
                                        placeholder="Youtube (Ej. https://www.youtube.com/channel/UCoUM-UJ7rirJYP8CQ0EIaHA)"
                                        name="youtube"
                                        {...register('youtube', youtubeValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {errors.youtube?.message}
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.tiktok && 'border-red-500'
                                        }`}
                                        onInput={async () => {
                                            await trigger("tiktok")
                                        }}
                                        onPointerUp={async () => {
                                            await trigger("tiktok")
                                        }}
                                        onPointerOut={async () => {
                                            await trigger("tiktok")
                                        }}
                                        placeholder="TikTok (Ej. https://www.tiktok.com/@kikakiim?)"
                                        name="tiktok"
                                        {...register('tiktok', tiktokValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {errors.tiktok?.message}
                                    </span>
                                    <input
                                        type="text"
                                        className={`mt-1 block w-full rounded-2xl border-none text-center ${
                                            errors.telegram && 'border-red-500'
                                        }`}
                                        onInput={async () => {
                                            await trigger("telegram")
                                        }}
                                        onPointerUp={async () => {
                                            await trigger("telegram")
                                        }}
                                        onPointerOut={async () => {
                                            await trigger("telegram")
                                        }}
                                        placeholder="Telegram (Ej. https://t.me/Amirhamini)"
                                        name="telegram"
                                        {...register('telegram', telegramValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {errors.telegram?.message}
                                    </span>
                                </label>
                                <div className="grid grid-cols-4 gap-4 text-center">
                                    <label className="block text-center">
                                        <span className="font-bold uppercase text-xs">
                                            Template #1
                                        </span>
                                        <img
                                            src="/images/template1.png"
                                            width="100"
                                            className={`m-auto cursor-pointer hover:opacity-50 ${selectTemplate[0]}`}
                                            onClick={() => clickTemplate(1)}
                                        />
                                    </label>
                                    <label className="block text-center">
                                        <span className="font-bold uppercase text-xs">
                                            Template #2
                                        </span>
                                        <img
                                            src="/images/template2.png"
                                            width="100"
                                            className={`m-auto cursor-pointer hover:opacity-50 ${selectTemplate[1]}`}
                                            onClick={() => clickTemplate(2)}
                                        />
                                    </label>
                                    <label className="block text-center">
                                        <span className="font-bold uppercase text-xs">
                                            Template #3
                                        </span>
                                        <img
                                            src="/images/template3.png"
                                            width="100"
                                            className={`m-auto cursor-pointer hover:opacity-50 ${selectTemplate[2]}`}
                                            onClick={() => clickTemplate(3)}
                                        />
                                    </label>
                                    <label className="block text-center">
                                        <span className="font-bold uppercase text-xs">
                                            Template #4
                                        </span>
                                        <img
                                            src="/images/template4.png"
                                            width="100"
                                            className={`m-auto cursor-pointer hover:opacity-50 ${selectTemplate[3]}`}
                                            onClick={() => clickTemplate(4)}
                                        />
                                    </label>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <label className="block col-span-2 text-center">
                                        <span className="font-bold uppercase text-xs">
                                            Color de template
                                        </span>
                                        <input
                                            className="block m-auto"
                                            type="color"
                                            value={initialColorTheme1}
                                            onInput={(e) =>
                                                setinitialColorTheme1(
                                                    e.target.value
                                                )
                                            }
                                            name="themeColor1"
                                            {...register(
                                                'themeColor1',
                                                validationObj
                                            )}
                                        />
                                    </label>
                                    {/* <label className="block text-center">
                                        <span className="font-bold uppercase text-xs">
                                            Color del theme #2
                                        </span>
                                        <input
                                            className="block m-auto"
                                            type="color"
                                            value={initialColorTheme2}
                                            onInput={(e) =>
                                                setinitialColorTheme2(
                                                    e.target.value
                                                )
                                            }
                                            name="themeColor2"
                                            {...register(
                                                'themeColor2',
                                                validationObj
                                            )}
                                        />
                                    </label> */}
                                </div>
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
                                        onInput={async () => {
                                            await trigger("token")
                                        }}
                                        {...register('token', tokenValidationObj)}
                                    />
                                    <span className="text-red-500 text-xs float-left mt-2">
                                        {errors.token?.message}
                                    </span>
                                </label>
                                <div className="block md:flex justify-between md:text-right text-center">
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
                                        className={`${style.btnEnviar} md:mt-0 mt-4`}
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
                                    {message !== 4 && (
                                        <button
                                            className="p-1 ml-auto  border-0 text-black float-right text-h4 leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => {
                                                if (message == 0) {
                                                    window.location.href = '/formulario'
                                                } else {
                                                    setShowModalCreate(false)
                                                }
                                            }}
                                        >
                                            <span className=" text-black h-6 w-6 text-h4 block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    )}
                                </div>
                                {/*body*/}
                                <div className="relative py-12 px-11 flex-auto text-center">
                                    {message === 0 && (
                                        <>
                                            <h3 className="text-h1-d">
                                                ¡Felicitaciones!
                                            </h3>
                                            <h3 className="text-h2-d">
                                                Formulario creado con exito!
                                            </h3>
                                        </>
                                    )}

                                    {message === 1 && (
                                        <>
                                            <h3 className="text-h1-d">
                                                Token Invalido
                                            </h3>
                                        </>
                                    )}

                                    {message === 2 && (
                                        <>
                                            <h3 className="text-h1-d">
                                                El token ya fue utilizado
                                            </h3>
                                        </>
                                    )}

                                    {message === 3 && (
                                        <>
                                            <h3 className="text-h1-d">
                                                Error inesperado
                                            </h3>
                                        </>
                                    )}

                                    {message === 4 && (
                                        <>
                                            <div className="flex items-center justify-center ">
                                                <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                                            </div>
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
