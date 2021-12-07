export const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
export const regexPhone = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/
export const regexAlfabetico = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
export const regexFacebook = /(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/
export const regexTwitter = /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/
export const regexInstagram = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/
export const regexLinkedin = /((http(s?):\/\/)*([a-zA-Z0-9\-])*\.|[linkedin])[linkedin\/~\-]+\.[a-zA-Z0-9\/~\-_,&=\?\.;]+[^\.,\s<]/
export const regexWijex = /((http(s?):\/\/)*([a-zA-Z0-9\-])*\.|[wijex])[wijex\/~\-]+\.[a-zA-Z0-9\/~\-_,&=\?\.;]+[^\.,\s<]/
export const regexYoutube = /((http|https):\/\/|)(www\.|)youtube\.com\/(channel\/|user\/)[a-zA-Z0-9_-]{1,}/
export const regexTiktok = /((http(s?):\/\/)*([a-zA-Z0-9\-])*\.|[tiktok])[tiktok\/~\-]+\.[a-zA-Z0-9\/~\-_,&=\?\.;]+[^\.,\s<]/
export const regexTelegram = /(https?:\/\/)?(www[.])?(telegram|t)\.me\/([a-zA-Z0-9_-]*)\/?$/
export const regexToken =  /(CW[0-9])/

