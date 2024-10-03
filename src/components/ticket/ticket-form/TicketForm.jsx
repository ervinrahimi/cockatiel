// src/components/TicketForm.js
'use client'

import { useState } from 'react'
import styles from './TicketForm.module.css'

export default function TicketForm({ departments, onSubmit, userId }) {
  const [formData, setFormData] = useState({
    departmentId: '',
    priority: 'MEDIUM',
    title: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onSubmit({ ...formData, userId })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <label className={styles.label}>دپارتمان</label>
        <select
          className={styles.select}
          name="departmentId"
          onChange={handleChange}
          required
        >
          <option value="">انتخاب کنید</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={styles.label}>اولویت</label>
        <select
          className={styles.select}
          name="priority"
          onChange={handleChange}
          required
        >
          <option value="HIGH">زیاد</option>
          <option value="MEDIUM">متوسط</option>
          <option value="LOW">کم</option>
        </select>
      </div>
      <div>
        <label className={styles.label}>عنوان</label>
        <input
          className={styles.input}
          type="text"
          name="title"
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className={styles.label}>متن تیکت</label>
        <textarea
          className={styles.textarea}
          name="message"
          onChange={handleChange}
          required
        />
      </div>
      <button className={styles.button} type="submit">
        ارسال
      </button>
    </form>
  )
}
