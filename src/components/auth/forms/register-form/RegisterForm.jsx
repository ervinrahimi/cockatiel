'use client'

import { FormError, FormSuccess } from '@/components/forms/message/Message'
import { register as registerUser } from '@/actions/auth/register'
import { resgisterSchema } from '@/security/zod/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styles from './RegisterForm.module.css'
import Link from 'next/link'

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resgisterSchema) })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const onSubmit = async (data) => {
    setError('')
    setSuccess('')

    await registerUser(data)
      .then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
      .catch(() => setError('Something went wrong'))
  }

  return (
    <div className={styles.backgroundContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          disabled={isSubmitting}
          type="text"
          placeholder="Email"
          {...register('email')}
          className={styles.input}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
        <input
          disabled={isSubmitting}
          type="password"
          placeholder="Password (8+ characters)"
          {...register('password')}
          className={styles.input}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        <FormError message={error} />
        <FormSuccess message={success} />
        <button type="submit" disabled={isSubmitting} className={styles.button}>
          ثبت نام
        </button>
        <>
        <div>
          <Link href='login'>اکانت داری ؟ خب ورود کن</Link>
        </div>
        </>
      </form>
    </div>
  )
}
