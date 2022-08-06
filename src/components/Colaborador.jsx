import useProyecto from '../hooks/useProyecto'


const Colaborador = ({colaborador}) => {

  const { handleModalEliminarColaborador } = useProyecto()

  const { nombre, email} = colaborador

  return (
    <div className="border-b p-5 flex justify-between item-center">
      <div>
        <p>{nombre}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>

      <div>
        <button
          type="button"
          className="bg-red-600 px-4 py-3 text-white text-sm rounded-lg hover:bg-red-700 uppercase font-bold"
          onClick={() => handleModalEliminarColaborador(colaborador)}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default Colaborador