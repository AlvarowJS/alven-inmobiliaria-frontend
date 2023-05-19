import { useState, Fragment } from 'react'

// Librerias alert
import toast from 'react-hot-toast'
import Avatar from '@components/avatar'
import { Check } from 'react-feather'

import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem, Input, Label, Col, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import axios from 'axios'
// const URL = 'https://notify.grupogenera.pe/api/v1/xml'
const URL = 'https://notify.grupogenera.pe/api/v1/xml'

const Xml = () => {


    const { handleSubmit, control, register, reset, setError, formState: { errors }} = useForm()
    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({

        onDrop: acceptedFiles => {


            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
        }
    })

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
    }

    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>{renderFilePreview(file)}</div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ))

    const handleRemoveAllFiles = () => {
        setFiles([])
    }
    const handleReset = () => {
        reset({
          carpeta: '',
         
        })
      }

    const createDir = newDir => {

        axios.post(URL, newDir)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

    }
    const submit = data => {
        
        if (data.carpeta.length > 0 && files.length > 0) {
            const f = new FormData()
            
            for (let i = 0; i < files.length; i++) {
                f.append("files[]", files[i])
            }
            
            f.append("carpeta", data.carpeta)
            console.log(f, "data")
            createDir(f)
            
            toast(
                <div className='d-flex'>
                    <div className='me-1'>
                        <Avatar size='sm' color='success' icon={<Check size={12} />} />
                    </div>
                    <div className='d-flex flex-column'>
                        <h6>Archivos XML subidos con exito!</h6>
                        <ul className='list-unstyled mb-0'>
                            <li>
                                <strong>Nombre del directorio</strong>: {data.carpeta}
                            </li>
                        </ul>
                    </div>
                </div>
            )
            handleRemoveAllFiles()
            handleReset()

        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }


    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Subir Archivos XML</CardTitle>
            </CardHeader>

            <CardBody>
                <form onSubmit={handleSubmit(submit)}>
                    <Row>
                        <Col className='mb-1' xl='4' md='6' sm='12'>
                            <Label className='form-label' for='carpeta'>
                                Ingrese el nombre donde se almacenaran todos los archivos
                            </Label>
                            <Controller
                                defaultValue=''
                                control={control}
                                id='carpeta'
                                name='carpeta'
                                render={({ field }) => (
                                    <Input
                                        placeholder='Ingrese el nombre donde se almacenaran todos los archivos'
                                        invalid={errors.carpeta && true}
                                        {...field}
                                    />
                                )}
                            />
                            {/* <input className='Input' type='text' id='carpeta' placeholder='Ingrese el nombre de identificacion' {...register('carpeta')} /> */}
                        </Col>
                    </Row>
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <div className='d-flex align-items-center justify-content-center flex-column'>
                            <DownloadCloud size={64} />
                            <h5>Sube tus archivos aqui</h5>
                            <p className='text-secondary'>
                                Dale click aqui para{' '}
                                <a href='/' onClick={e => e.preventDefault()}>
                                    buscar
                                </a>{' '}
                                los xml de tu maquina
                            </p>
                        </div>
                    </div>
                    {files.length ? (
                        <Fragment>
                            <ListGroup className='my-2'>{fileList}</ListGroup>
                            <div className='d-flex justify-content-end'>
                                <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                                    Remover todo
                                </Button>
                                {/* <Button color='primary' onClick={sendFile}>Upload Files</Button> */}
                                <Button color='primary'>Subir Archivos</Button>
                            </div>
                        </Fragment>
                    ) : null}

                </form>
            </CardBody>
        </Card>
    )
}

export default Xml