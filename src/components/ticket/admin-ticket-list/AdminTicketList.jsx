// src/components/AdminTicketList.js
import Link from 'next/link'
import styles from './AdminTicketList.module.css'

export default function AdminTicketList({ tickets = [] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>شماره تیکت</th>
          <th className={styles.th}>عنوان تیکت</th>
          <th className={styles.th}>ایمیل کاربر</th>
          <th className={styles.th}>اولویت کاربر</th>
          <th className={styles.th}>آخرین بروزرسانی</th>
          <th className={styles.th}>اقدامات</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id} className={styles.tr}>
            <td className={styles.td}>{ticket.ticketNumber}</td>
            <td className={styles.td}>{ticket.title}</td>
            <td className={styles.td}>{ticket.user.email}</td>
            <td className={styles.td}>{ticket.priority}</td>
            <td className={styles.td}>
              {new Date(ticket.lastUpdatedAt).toLocaleString('fa-IR')}
            </td>
            <td className={styles.td}>
              <Link href={`/admin/tickets/${ticket.id}`}>
                <button className={styles.button}>نمایش تیکت</button>
              </Link>
              <Link href={`/admin/tickets/${ticket.id}/details`}>
                <button className={styles.button}>جزئیات تیکت</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
