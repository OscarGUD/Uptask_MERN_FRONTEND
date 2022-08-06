import { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import ClienteAxios from "../config/ClienteAxios"
import Alerta from '../components/Alerta'


const NuevoPassword = () => {

  const [passwordMoficado, setPasswordMoficado] = useState(false)
  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState('')

  const params = useParams()
  const { token } = params

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await ClienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()

    if(password.length < 6){
      setAlerta({
        msg: 'El password debe ser minimo de 6 caracteres',
        error: true
      })
      return
    }

    try {
      const { data } = await ClienteAxios.post(`/usuarios/olvide-password/${token}`, { password })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setPasswordMoficado(true)
    } catch (error) {
      setAlerta({
        msg: error.responsed.data.msg,
        error: true
      })
    }
  }
  
  const { msg } = alerta

  return (
    <>
      <h1
        className="text-sky-600 font-black text-6xl capitalize"
      >Reestablece tu password y no pierdas acceso a tus {' '} <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      { tokenValido && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >nuevo password</label>
          <input
            type="password"
            id="password"
            placeholder="Coloca tu Password" 
             className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

          <input type="submit" value={'Reestablecer password'} className='bg-sky-700 w-full py-3 rounded text-white font-bold uppercase hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5'/>
        </form>
      )} 

      {passwordMoficado && (
        <nav>
          <Link  
            className='block text-center my-5 text-slate-500 hover:text-slate-700 uppercase text-sm transition-colors'
            to='/'
          >Inicia Sesión</Link>
        </nav>
      )}
    </>
  )
}

export default NuevoPassword