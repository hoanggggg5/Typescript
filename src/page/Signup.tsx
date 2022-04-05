import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { login } from '../features/user/userSlice'
import { authenticated } from '../utils/localstorage'

type Props = {}
type SignupType = {
  name: string,
  email: string,
  password: string,
}

const Signup = (props: Props) => {
  const { register, handleSubmit, formState: {errors} } = useForm<SignupType>()
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onSubmit: SubmitHandler<SignupType> = async (dataInput) => {
      try {
        const {data} = await axios.post("http://localhost:8000/api/signup", dataInput)
        console.log(data)
        authenticated(data, () => {
          dispatch(login(data))
          navigate("/")
        })
      } catch (error) {
        console.log(error)        
      }
    } 
   
  return (
    <div className="min-h-full bg-[url('https://random.imagecdn.app/1400/800')] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="p-10 rounded bg-[#fff] shadow max-w-[540px] w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            <a href="#/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Or start your 14-day free trial
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-4 py-2 bg-white space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" {...register("name", {required: true })} className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
                <div className="text-red-600">{errors.name?.type === 'required' && "This field is required"}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="text" {...register("email", {required: true })} className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
                <div className="text-red-600">{errors.email?.type === 'required' && "This field is required"}</div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-3 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="text" {...register("password", {required: true })} className="py-2 px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" />
                <div className="text-red-600">{errors.password?.type === 'required' && "This field is required"}</div>
                </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                <label className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
            <div className="text-sm text-center">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Back
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup