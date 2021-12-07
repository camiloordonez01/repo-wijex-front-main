import React, {useState, useRef, useEffect} from 'react'

// Services
import { actualizarResponsable } from '../../../services/form'

interface Props {
    idForm: string,
    responsable: string,
}

const ResponsableForm: React.FC<Props> = ({
    idForm,
    responsable
}) => {
    const [before, setBefore] = useState('')
    const [resp, setResp] = useState('')
    const [response, setResponse] = useState({ color: "", msg: "" })
    
    useEffect(() => {
        setResp(responsable)
        setBefore(responsable)
    },[responsable])

    const changeResponsable = async () => {
        if(before !== resp){
            const { data } = await actualizarResponsable(idForm, resp)
            if (data.statusCode === 200) {
                setBefore(resp)
                setResponse({
                    color: 'green-400',
                    msg: 'Ok'
                })
            }

        }
    }
    return (
        <div className="p-2">
            {response.msg && (
                <div className={`bg-${response.color} px-3 py-2 text-white mb-3 flex justify-between w-auto`}>
                    {response.msg}
                    <label className="font-bold cursor-pointer" onClick={() => setResponse({ color: "", msg: "" })}>X</label>
                </div>
            )}
            <input className="w-44" type="text" value={resp} onChange={(e) => setResp(e.target.value)} onBlur={changeResponsable} />
        </div>
    )
}
export default ResponsableForm