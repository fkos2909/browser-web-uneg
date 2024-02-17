import React from 'react'
import { newtonsCradle } from 'ldrs'

export const Loader = () => {
    newtonsCradle.register();
    return (
        <div className="container-loader">
            <l-newtons-cradle
            size="78"
            speed="1.4" 
            color="black" 
            >
            </l-newtons-cradle>
        </div>
    )
}
