import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import DivForm from "./DivForm"
import useProyecto from "../hooks/useProyecto"
import Alerta from "./Alerta"

const FormularioProyecto = () => {

  const [id, setId] = useState(null)
  const [nombre, setNombre] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [fechaEntrega, setFechaEntrega] = useState('')
  const [cliente, setCliente] = useState('')

  const params = useParams()
  const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyecto()

  useEffect(() => {
    if(params.id){
      setId(proyecto._id)
      setNombre(proyecto.nombre)
      setDescripcion(proyecto.descripcion)
      setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
      setCliente(proyecto.cliente)
    }
  },[params])


  const handleSubmit = async e => {
    e.preventDefault()

    // Confirmar que todos los campos esten llenos
    if([nombre, descripcion, fechaEntrega, cliente].includes('')){
      mostrarAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    // Pasar los datos hacia el provider
    await submitProyecto({
      nombre,
      descripcion, 
      fechaEntrega,
      cliente,
      id
    })

    setId(null)
    setNombre('')
    setDescripcion('')
    setFechaEntrega('')
    setCliente('')
  }

  const { msg } = alerta

  return (
      <form
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
        >

        {msg && <Alerta alerta={alerta} />}

        <DivForm 
          id={'nombre'}
          label={'Nombre Proyecto'}
          input={'text'}
          place={'Coloca el nombre de tu Proyecto'}
          value={nombre}
          fn={setNombre}
        />

        <DivForm 
          id={'descripcion'}
          label={'Descripcion'}
          input={'text'}
          place={'Descripcion del Proyecto'}
          value={descripcion}
          fn={setDescripcion}
        />

        <DivForm 
          id={'fechaEntrega'}
          label={'Fecha Entrega'}
          input={'date'}
          value={fechaEntrega}
          fn={setFechaEntrega}
        />

        <DivForm 
          id={'nombreCliente'}
          label={'Nombre del Cliente'}
          input={'text'}
          place={'Coloca el nombre de tu Cliente'}
          value={cliente}
          fn={setCliente}
        />

        <input type="submit" value={id ? 'Actualizar Proyecto' : 'Crear Proyecto'} className='bg-sky-600 w-full rounded p-3 uppercase font-bold text-white cursor-pointer hover:bg-sky-800 transition-colors'/>
      </form>
  )
}

export default FormularioProyecto