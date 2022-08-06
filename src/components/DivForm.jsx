const DivForm = ({id,label,input,place,value,fn}) => {
  return (
    <div className="mb-5">
        <label
          htmlFor={id}
          className="text-gray-700 uppercase font-bold text-sm"
        >{label}</label>
        <input
          type={input}
          placeholder={place}
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id={id} 
          value={value}
          onChange={e => fn(e.target.value)}
        />
      </div>
  )
}

export default DivForm