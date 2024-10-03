// src/components/AdminMessageForm.js
'use client'

import { useState } from 'react'
import styles from './AdminMessageForm.module.css'

export default function AdminMessageForm({ ticketId, onSubmit, adminId }) {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({ ticketId, message, adminId })
    setMessage('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button className={styles.button} type="submit">ارسال پاسخ</button>
    </form>
  )
}
