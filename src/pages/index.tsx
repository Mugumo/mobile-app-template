import { login } from '@/api/methods'
import { BasicField } from '@/components/Input/BasicField'
import { Page } from '@/components/Page/Page'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import toast from 'react-hot-toast'


export default function Home() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const notification = toast.loading("Authenticating...")
    console.log("Submit these values to auth API::", email, password)
    login({
      email: email,
      password: password
    }).then(() => {
      toast.success("Login Successful", { id: notification })
    }).catch((error) => {
      console.log("Error logging in::: ", error)
      toast.success("Wrong password or email address! Please try again", { id: notification })
    })
  }
  return (
    <Page title='Login' description='Login page'>
      <div className='bg-main-background bg-no-repeat bg-cover h-screen'>
        <div className='flex justify-center px-10 py-16'>
          <p className='text-7xl font-bold'>Digital Wallet</p>
        </div>

        <div className='text-white rounded-xl shadow-card mx-10 p-5 bg-gradient-to-r from-blue-500 to-blue-600'>
          <p className='text-5xl font-medium w-full mb-10'>
            Login
          </p>

          <form className='flex flex-col gap-3' onSubmit={(e) => handleSubmit(e)}>
            <BasicField
              placeholder='john.doe@gmail.com'
              type='text'
              label='Email'
              onChange={(e) => handleEmail(e)}
            />
            <BasicField
              placeholder='**********'
              type='password'
              label='Password'
              onChange={(e) => handlePassword(e)}
            />
            <button
              type='submit'
              className='rounded-md bg-black text-white text-xl font-medium p-2 my-3'
              onClick={() => handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </Page>
  )
}
