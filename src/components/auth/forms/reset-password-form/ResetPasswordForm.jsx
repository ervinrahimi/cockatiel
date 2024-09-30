'use client'

import { resetPasswordSchema } from '@/security/zod/auth-schema'
import { FormError } from '@/components/forms/message/Message'
import { resetPassword } from '@/actions/auth/reset-password'
import { AUTH_ROUTES } from '@/constants/routes/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styles from './ResetPasswordForm.module.css'

export default function ResetPasswordForm({ token }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) })
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = async (data) => {
    setError('')

    return await resetPassword(data, token)
      .then((data) => {
        setError(data?.error)
        if (data?.success) return router.push(AUTH_ROUTES.LOGIN)
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <div className={styles.backgroundContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          type="password"
          placeholder="Password"
          {...register('password')}
          className={styles.input}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Confirm password"
          {...register('confirmPassword')}
          className={styles.input}
        />
        {errors.confirmPassword && (
          <p className={styles.errorMessage}>{errors.confirmPassword.message}</p>
        )}
        <FormError message={error} />
        <button type="submit" disabled={isSubmitting} className={styles.button}>
          Reset password
        </button>
      </form>
    </div>
  )
}
