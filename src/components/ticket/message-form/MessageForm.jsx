// src/components/MessageForm.js
'use client'

import { useState } from 'react'
import styles from './MessageForm.module.css'

export default function MessageForm({ ticketId, onSubmit, userId }) {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({ ticketId, message, userId })
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
      <button className={styles.button} type="submit">ارسال پیام</button>
    </form>
  )
}
