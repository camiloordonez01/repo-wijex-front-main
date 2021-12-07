import React, {useEffect, useState} from 'react'

// Services
import { actualizarEstado } from '../../../services/form'

interface Props {
    idForm: string,
    estado: number,
}

const EstadoForm: React.FC<Props> = ({
    idForm,
    estado
}) => {
    const [resp, setResp] = useState(0)
    const [response, setResponse] = useState({ color: "", msg: "" })
    
    useEffect(() => {
        setResp(estado)
    },[estado])

    const changeEstado = async (value) => {
        const { data } = await actualizarEstado(idForm, value)
        if (data.statusCode === 200) {
            setResp(value)
            setResponse({
                color: 'green-400',
                msg: 'Ok'
            })
        }
    }
    return (
        <div>
            {response.msg && (
                <div className={`bg-${response.color} px-3 py-2 text-white mb-3 flex justify-between w-auto`}>
                    {response.msg}
                    <label className="font-bold cursor-pointer" onClick={() => setResponse({ color: "", msg: "" })}>X</label>
                </div>
            )}
            <select value={resp} onChange={(e) => changeEstado(e.target.value)}>
                <option value="0" key={`${idForm}1`}>En espera</option>
                <option value="1" key={`${idForm}2`}>Procesando</option>
                <option value="2" key={`${idForm}3`}>Completado</option>
            </select>
        </div>
    )
}
export default EstadoForm