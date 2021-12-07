import React from 'react'
import Head from 'next/head'
import Layout from './Layout'
import { CoverPage } from './Coverpage'
import { Gallery } from './Gallery/gallery'
import { SocialMedia } from './Socialmedia'
import FormContact from './Form/form'
import { ContactProfile } from './Contact'
import { InformationProfile } from './Information'
import { PlinthTitle } from './Plinthtitle'
import { Plinth } from './Plinth'

interface Props {
    contact: object,
    curriculum: object,
    image: object,
    personal: object,
    social: object,
    color1: string
}

const Home: React.FC<Props> = ({
    contact,
    curriculum,
    image,
    personal,
    social,
    color1
}) => {
    return (
        <div className="pointer-events-none font-sans">
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1.0 ,width=device-width"
                />
                <meta
                    key="description"
                    name="description"
                    content="nombre de la app"
                />
                <title>{personal.TIPO ? personal.EMPRESA:personal.NAME}</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
                    rel="stylesheet"
                />
            </Head>
            <Layout>
                <CoverPage
                    name={personal.TIPO ? personal.EMPRESA:personal.NAME}
                    description={personal.TIPO ? personal.ESLOGAN:personal.CARGO}
                    colorName={personal.COLORNAME}
                    colorDescription={personal.COLORDESCRIPTION}
                    coverPageUrl={image.BANNER}
                />
                <Plinth color={color1}/>
                <InformationProfile
                    name={personal.NAME}
                    description={personal.HISTORY}
                    pdf={curriculum.CURRICULUM_VITAE}
                    imgInformation={image.INFORMATION}
                />
                <PlinthTitle title={'Galería'} />
                <Gallery
                    gallery_1={image.GALLERY_1}
                    gallery_2={image.GALLERY_2}
                    gallery_3={image.GALLERY_3}
                />
                <PlinthTitle title={'Contacto'} />
                <ContactProfile
                    name={personal.NAME}
                    email={contact.EMAIL}
                    phone={contact.PHONE}
                    address={contact.ADDRESS}
                    number={contact.NUMBER}
                    locality={contact.LOCALITY}
                    province={contact.PROVINCE}
                    country={contact.COUNTRY}
                    avatar={image.AVATAR}
                    url={''}
                    longitud={contact.LONGITUD}
                    latitud={contact.LATITUD}
                />
                <PlinthTitle title={'Quiero más información'} />
                <FormContact
                    name={personal.NAME}
                    email={contact.EMAIL}
                />
                <SocialMedia
                    name={personal.NAME}
                    linkedin={social.LINKEDIN}
                    youtube={social.YOUTUBE}
                    twitter={social.TWITTER}
                    facebook={social.FACEBOOK}
                    instagram={social.INSTAGRAM}
                    tiktok={social.TIKTOK}
                    telegram={social.TELEGRAM}
                    wijex={social.WIJEX}
                />
            </Layout>
        </div>
    )
}

export default Home
