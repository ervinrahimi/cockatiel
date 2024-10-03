// src/components/TicketFilters.js
'use client'

import { useState, useEffect } from 'react'
import styles from './TicketFilters.module.css'
import { getAllAdminTicket } from '@/actions/ticket/get-all-admin-ticket'
import AdminTicketList from '../admin-ticket-list/AdminTicketList'

export default function TicketFilters({ departments, initialTickets }) {
  const [filters, setFilters] = useState({
    date: '',
    status: '',
    departmentId: '',
    priority: '',
    orderBy: '',
    pageSize: 10,
    keyword: '',
    ticketNumber: '',
  })

  const [tickets, setTickets] = useState(initialTickets) // ذخیره تیکت‌ها

  // لود کردن تمام تیکت‌ها زمانی که کامپوننت بارگذاری می‌شود
  useEffect(() => {
    const loadTickets = async () => {
      const result = await getAllAdminTicket() // گرفتن تمام تیکت‌ها
      setTickets(result) // ذخیره نتایج
    }
    loadTickets()
  }, []) // این قسمت تنها یک بار در بارگذاری اولیه اجرا می‌شود

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSearch = async () => {
    // ارسال فیلترها به سرور و گرفتن تیکت‌های فیلتر شده
    const result = await getAllAdminTicket(filters)
    setTickets(result) // ذخیره نتایج در حالت (state)
  }

  return (
    <div>
      <div className={styles.filtersContainer}>
        <h2 className={styles.filtersTitle}>فیلترها</h2>
        <div className={styles.filterInputs}>
          <input
            className={styles.filterInput}
            type="text"
            name="ticketNumber"
            value={filters.ticketNumber}
            onChange={handleChange}
            placeholder="شماره تیکت"
          />
          {/* سایر فیلترها */}
        </div>
        <div className={styles.filterButtons}>
          <button className={styles.button} onClick={handleSearch}>
            جستجو
          </button>
        </div>
      </div>
      
      {/* نمایش لیست تیکت‌ها */}
      <AdminTicketList tickets={tickets} />
    </div>
  )
}