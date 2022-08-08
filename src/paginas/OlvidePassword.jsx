import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import Alerta from '../components/Alerta'
import { isValidEmail } from "../helpers/emailRegularExpresion"

const OlvidePassword = () => {

  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if(!isValidEmail(email) || email.length < 6){
      setAlerta({
        msg: 'El email no es valído',
        error: true
      })
      return
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`, { email })
      setAlerta({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  } 

  const { msg } = alerta

  return (
    <>
      <h1
        className="text-sky-600 font-black text-6xl capitalize"
      >Recupera tu acceso y no pierdas tus {' '} <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >Email</label>
          <input
            type="email"
            id="email"
            placeholder="Coloca tu Email" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input type="submit" value={'Enviar Email'} className='bg-sky-700 w-full py-3 rounded text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5'/>
      </form> 

      <nav className="lg:flex lg:justify-between">
        <Link  
          className='block text-center my-5 text-slate-500 hover:text-slate-700 uppercase text-sm transition-colors'
          to='/'
        >¿Ya tienes una cuenta? Inicia Sesión</Link>

        <Link  
          className='block text-center my-5 text-slate-500 hover:text-slate-700 uppercase text-sm transition-colors'
          to='/registrar'
        >¿No tienes una cuenta? Registrate</Link>
      </nav>
    </>
  )
}

export default OlvidePassword