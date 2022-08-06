import { useState } from "react"
import DivForm from "./DivForm"
import Alerta from '../components/Alerta'
import useProyecto from '../hooks/useProyecto'


const FormularioColaborador = () => {

  const [email, setEmail] = useState('')

  const { mostrarAlerta, alerta, submitColaborador } = useProyecto()


  const handleSubmit = e => {
    e.preventDefault()

    if(email === ''){
      mostrarAlerta({
        msg: 'El email es Obligatorio',
        error: true
      })
      return
    }

    submitColaborador(email)
  }

  const { msg } = alerta


  return (
    <form 
      className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    > 

      {msg && <Alerta alerta={alerta}/>}

      <DivForm 
        id={'email'}
        input={'email'}
        label={'Email colaborador'}
        place={'Ingrese el correo del colaborador'}
        value={email}
        fn={setEmail}
      />

      <input 
      type="submit" 
      value={'Buscar Colaborador'} 
      className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm'/>
    </form>
  )
}

export default FormularioColaborador