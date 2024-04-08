const FormTextArea = ({
  user = 'user',
  placeholder,
  name,
  register,
  error,
  id,
  label,
  row,
}) => (
  <div className="flex flex-col w-full mb-2">
    <label htmlFor={id} className="capitalize">
      {label}
    </label>
    <textarea
      placeholder={placeholder}
      {...register(name)}
      id={id}
      rows={row}
      className={`${
        user === 'user' ? 'focus:outline-uAccent' : 'focus:outline-sAccent'
      }`}
    />
    {error && (
      <span className="text-sm font-medium text-red-500 leading-1 italic ">
        {error.message}
      </span>
    )}
  </div>
)
export default FormTextArea
