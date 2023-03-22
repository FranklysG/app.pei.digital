import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Logo from '../assets/svg/Logo'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/button'
import Input from '../components/input'
import Label from '../components/label'
import GuestLayout from '../layouts/guest'

export default function SignUp() {
  const { register, setMiddleware, setRedirectIfAuthenticated } = useAuth()

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
            <a>
              <Logo className="w-20 h-20 fill-current text-gray-500" />
            </a>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Registre-se com sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link href="signin">
              <a className="font-medium text-pink-600 hover:text-pink-500">
                Entrar
              </a>
            </Link>
          </p>
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
                <span className="px-2 bg-white text-gray-500">
                  Ou continue com
                </span>
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

              <div className="flex items-center justify-end mt-4">
                <Button>Registrar</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GuestLayout>
  )
}
