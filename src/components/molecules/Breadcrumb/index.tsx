import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'


const Breadcrumb: React.FC = () => {
    const [path, setPath]  = useState([])
    const router = useRouter()
    
    useEffect(() => {
        setPath(router.pathname.split("/"))
    }, [router])
    return (
        <ol className="bg-transparent leading-7 mb-0 p-0 float-right flex flex-wrap list-none rounded-bl">
            {path.map((element) => 
                <li className="" key={element}><a href="">{element}</a></li>
            )}
        </ol>
    )
}
export default Breadcrumb