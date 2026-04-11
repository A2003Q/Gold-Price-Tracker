import React from 'react'

function Loading() {
    return (
        <>
            <div className='h-screen w-full bg-gray/30 flex justify-center items-center'>
                <span className='animate-spin transition rounded-full p-5 border border-dotted border-8 border-accent/70 border-t-transparent'>

                </span>
            </div>
        </>
    )
}

export default Loading
//animate-ping
//animate-spin
//animate-pulse
//animate-bounce
