import { IoIosAddCircle } from 'react-icons/io'
import { useState } from 'react'

const StoreProducts = () => {
  const [modal, setModal] = useState(false)
  return (
    <div className="w-full   h-auto">
      {/* {modal && <AddProductModal setModal={() => setModal(false)} />} */}
      StoreProducts
      <button
        className="fixed right-10 bottom-10 flex-center  rounded-full p-0 drop-shadow-lg hover:drop-shadow-xl  w-12 h-12 bg-sAccent text-white font-extrabold text-4xl hover:scale-105 transition-all z-10"
        onClick={() => setModal(true)}
      >
        +
      </button>
    </div>
  )
}
export default StoreProducts
