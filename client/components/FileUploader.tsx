'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, FileIcon, UploadCloudIcon } from 'lucide-react'
import { cn, convertFileToUrl, getFileType } from '@/lib/utils'
import { Button } from './ui/button'
import Thumbnail from './Thumbnail'

interface FileUploaderProps {
  ownerId?: string
  accountId?: string
  className?: string
}

const FileUploader = ({ ownerId, accountId, className }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Upload files
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  })

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn('uploader-button', className)}>
        <UploadCloudIcon className="text-2xl" />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">Uploading ...</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name)

            return (
              <li key={`${file.name}-${index}`} className="uploader-preview-item">
                <div className="flex items-center gap-3">
                  <Thumbnail type={type} extension={extension} url={convertFileToUrl(file)}/>
                </div>
              </li>
            )
          })}
        </ul>
      )}
      {isDragActive ? (
        <p className="text-blue-500">Drop the files here...</p>
      ) : (
        <div>
          <p className="text-gray-700 font-medium mb-2">
            Drag & drop files here, or click to select
          </p>
          <p className="text-gray-500 text-sm">Support for multiple files</p>
        </div>
      )}
    </div>
  )
}

export default FileUploader
