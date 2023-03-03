import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

import Logo from '../assets/svg/Logo'
import Button from '../components/button'
import GuestLayout from '../layouts/guest'
import Input from '../components/input'
import Label from '../components/label'
import Link from 'next/link'

const ForgotPassword = () => {
  const { forgotPassword, setMiddleware } = useAuth()

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    errors.length > 0 && errors.map((error) => toast.error(error))
  }, [errors])

  useEffect(() => {
    status && toast.success(status)
  }, [status])

  const submitForm = useCallback((event: any) => {
    event.preventDefault()
    setMiddleware('auth')
    forgotPassword({ email, setErrors, setStatus })
  }, [])

  return (
    <GuestLayout>
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <Link href="/">
          <a>
            {/* <Logo className="w-20 h-20 fill-current text-gray-500" /> */}
          </a>
        </Link>

        <div className="mt-6 mb-4 text-sm text-gray-600">
          Esqueceu sua senha? Sem problemas. Basta nos informar seu endereço de
          e-mail e enviaremos um e-mail com um link de redefinição de senha que
          permitirá que você escolha um novo..
        </div>

        <form onSubmit={submitForm}>
          {/* Email Address */}
          <div>
            <Label>E-mail</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={email}
              placeholder="Digite aqui"
              className="block mt-1 w-full"
              handleOnChange={setEmail}
              required
              autoFocus
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button>Recuperar senha pelo e-mail</Button>
          </div>
        </form>
      </div>
    </GuestLayout>
  )
}

export default ForgotPassword
