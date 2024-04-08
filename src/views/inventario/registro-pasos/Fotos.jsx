import { useState, Fragment, useEffect } from 'react'
import toast from 'react-hot-toast'
import Avatar from '@components/avatar'
import { Check } from 'react-feather'
import { Card, CardHeader, CardTitle, CardBody, Button, ListGroup, ListGroupItem, Input, Label, Col, Row } from 'reactstrap'
import { useForm, Controller } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import './../style/style.css'
const URL_FOTOS = '/v1/fotos'
const URL_ORDER = '/v1/ordernar-fotos'
const URL_PROPIEDADES = '/v1/propiedades'
import FotoCard from '../fotos/FotoCard'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import alvenApi from '../../../api/alvenApi'
const Fotos = ({ idPropiedad, stepper }) => {

  const token = localStorage.getItem('token');
  const role = localStorage?.getItem('role');
  const [fotos, setFotos] = useState()
  const { handleSubmit, control, register, reset, setError, formState: { errors } } = useForm()
  const [files, setFiles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [estado, setEstado] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({

    onDrop: acceptedFiles => {


      setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
    }
  })

  const pasarSiguiente = () => {
    stepper.next()
  }
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


    })
  }

  const createDir = newDir => {
    setIsLoading(true)
    alvenApi.post(URL_FOTOS, newDir, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        setIsLoading(false)
        setEstado(false)
      })
      .catch(err => null)

  }
  const submit = data => {
    setEstado(true)
    if (files.length > 0) {
      const f = new FormData()
      for (let i = 0; i < files.length; i++) {
        f.append("fotos[]", files[i])
      }
      f.append('propiedad_id', idPropiedad)
      createDir(f)
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Fotos subidas con exito!</h6>

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

  useEffect(() => {
    setEstado(true)
    alvenApi.get(`${URL_FOTOS}/${idPropiedad}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        setFotos(res?.data)

      })
      .catch(err => null)
  }, [estado])

  const handleDragEnd = (event) => {
    const { active, over } = event
    const oldIndex = fotos.findIndex(foto => foto.id === active.id)
    const newIndex = fotos.findIndex(foto => foto.id === over.id)

    const newOrder = arrayMove(fotos, oldIndex, newIndex)

    setFotos(newOrder)
  }

  const ordernar = () => {
    let datosOrden = []
    for (let i = 0; i < fotos.length; i++) {
      datosOrden.push({
        id: fotos[i].id,
        orden: i
      })
    }
    alvenApi.post(URL_ORDER, datosOrden, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => {
        setFotos(res?.data)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Imagenes Ordenadas',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err => null)
  }


  return (
    <>
      {
        role == "1" ?
          <Card>
            <CardHeader>
              Subir Fotos

            </CardHeader>

            <CardBody className='border_upload'>
              <form onSubmit={handleSubmit(submit)} className='local_upload'>

                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />


                  <div className='d-flex align-items-center align-content-center flex-column'>
                    <DownloadCloud size={64} />
                    <h5 className='text_local'>Arrastra los archivos aquí o haga clic en cargar</h5>

                  </div>
                  <div className="cuadrar__spinner">
                    {isLoading ? <div className='spinner'></div> : null}

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

            <Button className='w-25 mb-5 mx-5' color='primary' onClick={pasarSiguiente}>
              Siguiente
            </Button>
          </Card>
          : null
      }
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fotos || []}
        >
          {
            fotos && fotos?.map(foto => (
              <FotoCard
                key={foto?.id}
                foto={foto}
                setEstado={setEstado}
              />
            ))
          }
        </SortableContext>
      </DndContext>

      {
        role == "1" ?
          <Button onClick={ordernar}>Ordenar</Button>
          : null
      }

    </>
  )
}

export default Fotos