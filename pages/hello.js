import React, { useState } from 'react';
import ReactImageMagnify from 'react-image-magnify';
import product from '../public/main.jpg'

const Hello = () => {

    // const imageProps = {
    //     smallImage: {
    //         alt: 'Phasellus laoreet',
    //         isFluidWidth: true,
    //         src: '../public/main.jpg'
    //     },
    //     largeImage: {
    //         src: '../public/main.jpg',
    //         width: 1200,
    //         height: 1800
    //     },
    //     enlargedImageContainerStyle: { background: '#fff', zIndex: 9 }
    // };

    return (
        <div>
            <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Wristwatch by Ted Baker London',
                    isFluidWidth: true,
                    src: product,
                },
                largeImage: {
                    src: product,
                    width: 1200,
                    height: 1800
                }
            }} />
        </div>
    );
}
 
export default Hello;