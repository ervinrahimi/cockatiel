// src/components/TicketForm.js
'use client'

import { useState } from 'react'

export default function TicketForm({ departments, onSubmit }) {
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
    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>دپارتمان</label>
        <select name="departmentId" onChange={handleChange} required>
          <option value="">انتخاب کنید</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>اولویت</label>
        <select name="priority" onChange={handleChange} required>
          <option value="HIGH">زیاد</option>
          <option value="MEDIUM">متوسط</option>
          <option value="LOW">کم</option>
        </select>
      </div>
      <div>
        <label>عنوان</label>
        <input type="text" name="title" onChange={handleChange} required />
      </div>
      <div>
        <label>متن تیکت</label>
        <textarea name="message" onChange={handleChange} required />
      </div>
      <button type="submit">ارسال</button>
    </form>
  )
}
