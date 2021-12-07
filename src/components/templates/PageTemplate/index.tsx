import React from 'react'

// Components
import Breadcrumb from '../../molecules/Breadcrumb'

// Styles
import styles from './styles.module.scss'

interface Props {
    title: string
}

const PageTemplate: React.FC<Props> = ({
    children,
    title
}) => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h2 className="text-h3">{title}</h2>
                </div>
                <div className="hidden">
                    <Breadcrumb/>
                </div>
            </div>
            <div className={`pt-7 ${styles.body}`}>
                {children}
            </div>
        </div>
    )
}
export default PageTemplate