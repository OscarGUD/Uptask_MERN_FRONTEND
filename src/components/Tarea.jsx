import { formatearFecha } from "../helpers/formatearFecha"
import useProyecto from "../hooks/useProyecto"
import useAdmin from "../hooks/useAdmin"

const Tarea = ({tarea}) => {

  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyecto()

  const admin = useAdmin()

  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea

  return (
    <div className="border-b p-5 flex justify-between item-center">

      <div className="flex flex-col items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500 uppercase">{descripcion}</p>
        <p className="mb-1 text-sm">{formatearFecha(fechaEntrega)}</p>
        <p className="mb-1 text-gray-600mb- ">Prioridad: {prioridad}</p>
        {estado && <p className='text-xs bg-green-600 uppercase rounded-lg text-white p-1'>Completada por: {tarea.completado.nombre}</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
          <button
            type="button"
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => handleModalEditarTarea(tarea)}
          >
            Editar
          </button>
        )}

        <button
          type="button"
          className={`${estado ? 'bg-sky-600 hover:bg-sky-70' : 'bg-gray-600 hover:bg-gray-700'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-sky-700 transition-colors`}
          onClick={() => completarTarea(_id)}
        >
            {estado ? 'Completa' : 'Incompleta'}
        </button>
        
        {admin && (
          <button
            type="button"
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-700 transition-colors"
            onClick={() => handleModalEliminarTarea(tarea)}
          >
              Eliminar
          </button>
        )}
      </div>

    </div>
  )
}

export default Tarea