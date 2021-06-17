import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { DropZoneContainer } from "./Style";

function DropImage ({ onFileUploaded }) 
{
    const onDrop = useCallback((acceptedFiles) => 
    {
        const file = acceptedFiles[0];

        onFileUploaded(file);
    }, [onFileUploaded]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <DropZoneContainer>
            <div {...getRootProps()}>
                <input {...getInputProps()} />

                <p className="dropzone-message">
                    <FiUpload size={18} />
            Selecione ou arraste uma foto do seu pet
                </p>
            </div>
        </DropZoneContainer>
    );
}

export default DropImage;
