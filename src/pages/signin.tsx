import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'

import Button from '../components/button'
import Input from '../components/input'
import Label from '../components/label'
import Guest from '../layouts/guest'

export default function SignIn() {
  const router = useRouter()

  const { login, setMiddleware, setRedirectIfAuthenticated } = useAuth()

  const [email, setEmail] = useState('admin@pei.com')
  const [password, setPassword] = useState('password')
  const [checkbox, setCheckbox] = useState(false)
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState<string | string[]>('')

  useEffect(() => {
    if (router.query.reset?.length > 0 && errors.length === 0) {
      setStatus(router?.query.reset)
    } else {
      setStatus(null)
    }
  })

  useEffect(() => {
    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  useEffect(() => {
    status && toast.success(status)
  }, [status])

  const submitForm = useCallback(
    async (event: any) => {
      event.preventDefault()
      setMiddleware('guest')
      setRedirectIfAuthenticated('/dashboard')
      login({ email, password, setErrors, setStatus })
    },
    [email, password, setErrors, setStatus],
  )

  return (
    <Guest>
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <Link href="/">
            <a>
              {/* <Logo className="w-20 h-20 fill-current text-pink-500" /> */}
            </a>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Acesso ao Pei digital
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{' '}
            <Link href="signup">
              <a className="font-medium text-pink-600 hover:text-pink-500">
                Registre-se
              </a>
            </Link>
          </p>
        </div>
        <div className="mt-8">
          <div>
            <div className="mt-6 relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Acesse sua conta
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <form onSubmit={submitForm} className="space-y-6">
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Digite seu email
                </Label>
                <div className="mt-1">
                  <Input
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Seu email"
                    className="appearance-none block w-full px-3 py-2"
                    handleOnChange={(value) => setEmail(value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Digite sua senha
                </Label>
                <div className="mt-1">
                  <Input
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Sua senha"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                    handleOnChange={(value) => setPassword(value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <Label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Lembre-me
                  </Label>
                </div>

                <div className="text-sm">
                  <Link
                    href="forgot-password"
                    className="font-medium text-pink-600 hover:text-pink-500"
                  >
                    <a>Esqueci a senha?</a>
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Entrar
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Guest>
  )
}
