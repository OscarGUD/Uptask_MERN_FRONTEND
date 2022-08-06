import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import FormularioColaborador from "../components/FormularioColaborador"
import Spinner from '../components/Spinner'
import useProyecto from "../hooks/useProyecto"

const NuevoColaborador = () => {

  const { obtenerProyecto, proyecto, cargando, colaborador, agregarColaborador, alerta } = useProyecto()

  const params = useParams()

  useEffect(() => {
    obtenerProyecto(params.id)
  },[])

  console.log(colaborador)

  if(cargando) return <Spinner />

  if(!proyecto._id) return <Alerta alerta={alerta}/>
  
  return (
    <>
      <h1 className="text-4xl font-black">Añadir Colaborador(a) al Proyecto: {proyecto.nombre}</h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>

      {cargando ? <Spinner /> : colaborador?._id && (
        <div className="flex justify-center mt-10">
          <div className="md:w-1/2 w-full bg-white py-10 px-5 shadow rounded">
            <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>

            <div className="flex justify-between item-center">
              <p>{colaborador.nombre}</p>

              <button
                type="button"
                className="bg-slate-500 hover:bg-slate-600 transition-colors px-5 py-2 rounded uppercase text-white font-bold text-sm"
                onClick={() => agregarColaborador({email: colaborador.email})}
              >
                Agregar al Proyecto
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NuevoColaborador