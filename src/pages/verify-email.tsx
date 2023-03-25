import Logo from '../assets/svg/Logo'
import Button from '../components/button'
import GuestLayout from '../layouts/guest'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

const VerifyEmail = () => {
  const { logout, resendEmailVerification } = useAuth()

  const [status, setStatus] = useState(null)

  return (
    <GuestLayout>
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <Link href="/">
          <a>
            <Logo className="w-20 h-20 fill-current text-gray-500" />
          </a>
        </Link>
        <div className="mt-4 mb-4 text-sm text-gray-600">
          Thanks for signing up! Before getting started, could you verify your
          email address by clicking on the link we just emailed to you? If you
          didn't receive the email, we will gladly send you another.
        </div>

        {status === 'verification-link-sent' && (
          <div className="mb-4 font-medium text-sm text-green-600">
            A new verification link has been sent to the email address you
            provided during registration.
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <Button handleOnClick={() => resendEmailVerification({ setStatus })}>
            Resend Verification Email
          </Button>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <button
            type="button"
            className="underline text-sm text-gray-600 hover:text-gray-900"
            onClick={() => {
              logout()
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </GuestLayout>
  )
}

export default VerifyEmail
