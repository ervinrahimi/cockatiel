// src/components/MessageForm.js
'use client'

import { useState } from 'react'

export default function MessageForm({ ticketId, onSubmit }) {
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({ ticketId, message })
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button type="submit">ارسال پیام</button>
    </form>
  )
}
