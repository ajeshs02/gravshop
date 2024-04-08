import { useForm } from 'react-hook-form'
import FormField from '../../../components/form/FormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegistrationSchema } from '../../../schema/zodSchema'
import { Link, useNavigate } from 'react-router-dom'
import { sendUserOTP } from '../../../api/auth'
import { useDispatch } from 'react-redux'
import { setFormData } from '../../../state/slices/formSlice'

const UserRegister = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(RegistrationSchema) })

  const onsubmit = async (formData) => {
    try {
      const data = await sendUserOTP(formData)
      if (data.success) {
        dispatch(setFormData(formData))
        navigate('/verify-otp')
      } else if (data.type === 'EmailInUse') {
        setError('email', {
          type: 'manual',
          message: data.message,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="px-4 w-full   flex justify-center items-center">
      <div className="w-full  flex flex-col items-center ">
        <h1 className="text-2xl lg:text-3xl text-center my-5 font-bold text-uAccent">
          Create Account
        </h1>
        <form
          className="w-full flex flex-col items-center "
          onSubmit={handleSubmit(onsubmit)}
        >
          {/* Name */}
          <FormField
            type="text"
            placeholder="Enter your name"
            name="name"
            id="name"
            label="Name"
            register={register}
            error={errors.name}
          />
          {/* email */}
          <FormField
            type="email"
            placeholder="Enter your email address"
            name="email"
            id="email"
            label="Email"
            register={register}
            error={errors.email}
          />
          {/* mobile */}
          <FormField
            type="text"
            placeholder="Enter your mobile number"
            name="mobile"
            id="mobile"
            label="Mobile number"
            register={register}
            error={errors.mobile}
          />
          {/* Password */}
          <FormField
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            label="Password"
            register={register}
            error={errors.password}
          />
          {/* Confirm Password */}
          <FormField
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
            register={register}
            error={errors.confirmPassword}
          />

          <button
            disabled={isSubmitting || isLoading}
            type="submit"
            className={`h-12 transition-all border w-full mx-2 my-4 rounded-xl hover:bg-uAccent border-uAccent font-bold text-uAccent hover:text-white ${
              isSubmitting && 'bg-gray-500 hover:bg-gray-500'
            } `}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>
        <span className="mb-5">
          Already have an account ? &nbsp;
          <Link to={'/login'} className="text-uAccent hover:underline">
            Login
          </Link>
        </span>
      </div>
    </div>
  )
}

UserRegister.displayName = 'UserRegister'
export default UserRegister
