import React from 'react'


const Footer: React.FC = () => {
    return (
        <div className="bg-white px-8 py-4 border border-gray-200">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <span className="text-gray-500">Copyright © 2021 <a className="text-sky-600" href="https://www.wijex.com/">Wijex.com</a>. All rights reserved.</span>
                </div>
                <div className="text-right">
                    <span className="text-gray-500"><strong>Version</strong> 1.0</span>
                </div>
            </div>
        </div>
    )
}
export default Footer