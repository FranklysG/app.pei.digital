import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'

import Button from '../../components/button'
import Guest from '../../layouts/guest'
import Input from '../../components/input'
import Label from '../../components/label'

const PasswordReset = () => {
  const router = useRouter()
  const { resetPassword } = useAuth()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState(null)

  const submitForm = useCallback(
    async (event: any) => {
      event.preventDefault()
      resetPassword({
        email,
        password,
        password_confirmation: passwordConfirmation,
        setErrors,
        setStatus,
      })
    },
    [email, password, passwordConfirmation, setStatus, setErrors],
  )

  useEffect(() => {
    if (router.query.email === 'string') {
      setEmail(router.query.email)
    }
  }, [router.query.email])

  return (
    <Guest>
      <form onSubmit={submitForm}>
        {/* Email Address */}
        <div>
          <Label>Email</Label>

          <Input
            id="email"
            type="email"
            value={email}
            className="block mt-1 w-full"
            handleOnChange={setEmail}
            required
            autoFocus
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <Label>Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            className="block mt-1 w-full"
            handleOnChange={setPassword}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mt-4">
          <Label>Confirm Password</Label>

          <Input
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            className="block mt-1 w-full"
            handleOnChange={setPasswordConfirmation}
            required
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button>Reset Password</Button>
        </div>
      </form>
    </Guest>
  )
}

export default PasswordReset
