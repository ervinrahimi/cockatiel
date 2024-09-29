'use client'

import { FormError, FormSuccess } from '@/components/forms/message/Message'
import { loginSchema } from '@/security/zod/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { login } from '@/actions/auth/login'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styles from './LoginForm.module.css'

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')

    return await login(data, callbackUrl)
      .then((data) => {
        if (data?.error) {
          setError(data.error)
        }

        if (data?.success) {
          reset()
          setSuccess(data.success)
        }

        if (data?.twoFactor) {
          setShowTwoFactor(true)
          setSuccess('Verification code sent to email!')
        }
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <div className={styles.backgroundContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {showTwoFactor && (
          <>
            <input
              disabled={isSubmitting}
              type="text"
              placeholder="Two Factor Code"
              {...register('code')}
              className={styles.input}
            />
            {errors.code && <p className={styles.errorMessage}>{errors.code.message}</p>}
          </>
        )}
        {!showTwoFactor && (
          <>
            <input
              disabled={isSubmitting}
              type="email"
              placeholder="Email"
              {...register('email')}
              className={styles.input}
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
            <input
              disabled={isSubmitting}
              type="password"
              placeholder="Password"
              {...register('password')}
              className={styles.input}
            />
            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
          </>
        )}
        <button type="submit" disabled={isSubmitting} className={styles.button}>
          {showTwoFactor ? 'Confirm' : 'Login'}
        </button>

        {/* دکمه گوگل زیر دکمه لاگین */}
        <button className={styles.googleButton}>Login with Google</button>
      </form>
    </div>
  )
}
