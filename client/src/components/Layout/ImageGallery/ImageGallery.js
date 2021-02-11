import React from 'react'

import imageGalleryCss from './imageGallery.module.scss'

const ImageGallery = ({ children }) => <div className={imageGalleryCss.container}>{children}</div>

export default ImageGallery
