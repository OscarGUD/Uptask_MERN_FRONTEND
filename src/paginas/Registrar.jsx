import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from '../components/Alerta'
import axios from "axios"

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    /*
     *  Revisando que los campos se llenen correctamente
     */
    if([nombre,email,password,repetirPassword].includes('')){
      setAlerta({
        msg:'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    if(password !== repetirPassword){
      setAlerta({
        msg:'Los passwords no son iguales',
        error: true
      })
      return
    }

    if(password.length < 6){
      setAlerta({
        msg:'El password es muy corto, agrega minimo 6 caracteres',
        error: true
      })
      return
    }

    setAlerta({})

    /*
    * Guardando los datos en la API
    */
    
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,{
        nombre,
        email,
        password
      })
      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')
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
      >Crea tu Cuenta y administra tus {' '} <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta}/>}

      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10"
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block text-xl font-bold"
          >nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Coloca tu Nombre" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

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

        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >password</label>
          <input
            type="password"
            id="password"
            placeholder="Coloca tu Password" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block text-xl font-bold"
          >repetir password</label>
          <input
            type="password"
            id="password2"
            placeholder="Repite tu password" 
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>

        <input type="submit" value={'Crear Cuenta'} className='bg-sky-700 w-full py-3 rounded text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5'/>
      </form> 

      <nav className="lg:flex lg:justify-between">
        <Link  
          className='block text-center my-5 text-slate-500 hover:text-slate-700 uppercase text-sm transition-colors'
          to='/'
        >¿Ya tienes una cuenta? Inicia Sesión</Link>

        <Link  
          className='block text-center my-5 text-slate-500 hover:text-slate-700 uppercase text-sm'
          to='/olvide-password'
        >¿Olvidaste tu password? Recuperalo Aquí</Link>
      </nav>
    </>
  )
}

export default Registrar