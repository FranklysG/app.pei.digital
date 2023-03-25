import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Logo from '../assets/svg/Logo'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/button'
import Input from '../components/input'
import Label from '../components/label'
import GuestLayout from '../layouts/guest'
import { TailSpin } from 'react-loader-spinner'

export default function SignUp() {
  const {
    loading,
    register,
    setMiddleware,
    setRedirectIfAuthenticated,
  } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  const submitForm = useCallback(
    async (event: any) => {
      event.preventDefault()
      setMiddleware('guest'),
        setRedirectIfAuthenticated('/dashboard'),
        register({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
          setErrors,
        })
    },
    [name, email, password, passwordConfirmation, setErrors],
  )

  return (
    <GuestLayout>
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <Link href="/">
            <a className="flex justify-center">
              <Logo />
            </a>
          </Link>
        </div>

        <div className="mt-8">
          <div>
            <div className="mt-5 relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500"></span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <form onSubmit={submitForm} className="space-y-6">
              {/* Name */}
              <div>
                <Label>Nome</Label>

                <Input
                  id="name"
                  type="text"
                  className="block mt-1 w-full"
                  handleOnChange={(value) => setName(value)}
                  required
                />
              </div>

              {/* Email Address */}
              <div className="mt-4">
                <Label>Email</Label>

                <Input
                  id="email"
                  type="email"
                  className="block mt-1 w-full"
                  handleOnChange={(value) => setEmail(value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="mt-4">
                <Label>Senha</Label>

                <Input
                  id="password"
                  type="password"
                  className="block mt-1 w-full"
                  handleOnChange={(value) => setPassword(value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              {/* Confirm Password */}
              <div className="mt-4">
                <Label>Confirmar senha</Label>

                <Input
                  id="passwordConfirmation"
                  type="password"
                  className="block mt-1 w-full"
                  handleOnChange={(value) => setPasswordConfirmation(value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Button
                  type="submit"
                  className="w-full flex gap-4 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Registrar
                  {loading && (
                    <TailSpin color="#ffffff" height={20} width={20} />
                  )}
                </Button>
                <Link href="signin">
                  <a className="font-medium text-pink-600 hover:text-pink-500">
                    <Button className="w-full flex gap-4 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                      Entrar
                    </Button>
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  )
}
