import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import OriginalImage from './original-image'

const Box = styled.div``
const DropBox = styled.div`
    height: 300px;
    width: 600px;
    border: 2px dashed green;
    color: green;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin: 0 auto;
`

const ImageUpload = ({ setImage }) => {
    const [preview, setPreview] = useState(null)
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            const image = acceptedFiles[0]
            if (!image) {
                return
            }
            Object.assign(image, { preview: URL.createObjectURL(image) })
            setPreview(image)
            setImage && setImage(image)
        }
    })

    return (
        <Box>
            {!preview && <DropBox {...getRootProps()}>
                <input {...getInputProps()} />
                <p>{isDragActive
                        ? 'Drop here!'
                        : 'Drop an image here'}</p>
            </DropBox>}
            {preview && <OriginalImage src={preview.preview} />}
        </Box>
    )
}

ImageUpload.propTypes = {
    setImage: PropTypes.func,
}

export default ImageUpload
