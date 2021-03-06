import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useDropzone } from 'react-dropzone'
import OriginalImage from './original-image'
import { useLanguage } from '../contexts/language.context'
import Button from './button'
import Text from '../data/text.json'

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

const ImageUpload = ({ image, setImage }) => {
    const [lang] = useLanguage()
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

    const onClearPreview = () => {
        setPreview(null)
        setImage && setImage(null)
    }

    useEffect(() => {
        if (image) {
            setPreview(image)
        }
    }, [image])

    return (
        <>
            <Box>
                {!preview && <DropBox {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>{isDragActive
                            ? Text.dropActive[lang]
                            : Text.dropDefault[lang]}</p>
                </DropBox>}
                {preview && <OriginalImage src={preview.preview} />}
            </Box>
            {preview && <Button onClick={onClearPreview} text={Text.clearImage[lang]} />}
        </>
    )
}

ImageUpload.propTypes = {
    setImage: PropTypes.func,
}

export default ImageUpload
