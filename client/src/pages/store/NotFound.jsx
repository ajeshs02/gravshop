import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="w-full h-full mt-36 flex flex-col flex-center">
    <h1 className="text-3xl mb-6">404 - Not Found!</h1>
    <Link to="/store" className="text-blue-500 hover:underline">
      Go Home
    </Link>
  </div>
)

export default NotFound
