
import PreviewProyecto from "../components/PreviewProyecto"
import useProyecto from "../hooks/useProyecto"
import Alerta from "../components/Alerta"

let socket

const Proyectos = () => {

  const { proyectos, alerta } = useProyecto() 
  const { msg } = alerta

  return (
    <>
      <h1 className='text-4xl font-black'>Proyectos</h1>

      {msg && <Alerta alerta={alerta} />}

      <div className='bg-white shadow mt-10 rounded-lg '>
        {proyectos.length ? 
          proyectos.map(proyecto => (
            <PreviewProyecto 
              key={proyecto._id}
              proyecto={proyecto}
            />
          ))
        : <p className="p-5 text-center text-gray-600 uppercase">No hay Proyectos aún</p>}
      </div>
    </>
  )
}

export default Proyectos