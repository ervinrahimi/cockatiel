// src/components/TicketFilters.js
'use client'

import { useState } from 'react'
import styles from './TicketFilters.module.css'

export default function TicketFilters({ departments }) {
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

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSearch = () => {
    // Implement search functionality (e.g., update URL parameters)
  }

  return (
    <div className={styles.filtersContainer}>
      <h2 className={styles.filtersTitle}>فیلترها</h2>
      <div className={styles.filterInputs}>
        {/* Implement filter inputs based on filters state */}
        {/* For brevity, the code for each input is omitted */}
        <input
          className={styles.filterInput}
          type="text"
          name="ticketNumber"
          value={filters.ticketNumber}
          onChange={handleChange}
          placeholder="شماره تیکت"
        />
        {/* Similar inputs for other filters */}
      </div>
      <div className={styles.filterButtons}>
        <button className={styles.button} onClick={handleSearch}>
          جستجو
        </button>
        <button className={styles.button}>خروجی اکسل</button>
        <button className={styles.button}>خروجی PDF</button>
      </div>
    </div>
  )
}
