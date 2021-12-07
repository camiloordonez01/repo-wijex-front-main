import React, {useEffect, useState} from 'react'

// Services
import { actualizarImagenes } from '../../../services/form'

interface Props {
    idForm: string,
    imagen: number,
}

const ImagenesForm: React.FC<Props> = ({
    idForm,
    imagen
}) => {
    const [response, setResponse] = useState({ color: "", msg: "" })
    const [checked, setChecked] = useState(false)
    const changeImagenes = async () => {
        setChecked(!checked)

        const value = !checked ? 1 : 0
        console.log(value)
        const { data } = await actualizarImagenes(idForm, value)
        if (data.statusCode === 200) {
            setResponse({
                color: 'green-400',
                msg: 'Ok'
            })
        }
    }
    useEffect(() => {
        setChecked(imagen === 1)
    },[imagen])
    return (
        <div className="m-auto">
            {response.msg && (
                <div className={`bg-${response.color} px-3 py-2 text-white mb-3 flex justify-between w-auto`}>
                    {response.msg}
                    <label className="font-bold cursor-pointer" onClick={() => setResponse({ color: "", msg: "" })}>X</label>
                </div>
            )}
            <input type="checkbox" checked={checked} onChange={changeImagenes}/>
        </div>
    )
}
export default ImagenesForm