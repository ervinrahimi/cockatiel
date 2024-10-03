// src/components/TicketList.js
import Link from 'next/link'
import styles from './TicketList.module.css'

export default function TicketList({ tickets }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>شماره تیکت</th>
          <th className={styles.th}>عنوان تیکت</th>
          <th className={styles.th}>وضعیت تیکت</th>
          <th className={styles.th}>آخرین بروزرسانی</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id} className={styles.tr}>
            <td className={styles.td}>{ticket.ticketNumber}</td>
            <td className={styles.td}>
              <Link href={`/tickets/${ticket.id}`}>
                <span className={styles.link}>{ticket.title}</span>
              </Link>
            </td>
            <td className={styles.td}>{translateStatus(ticket.status)}</td>
            <td className={styles.td}>
              {new Date(ticket.lastUpdatedAt).toLocaleString('fa-IR')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function translateStatus(status) {
  switch (status) {
    case 'WAITING_FOR_SUPPORT':
      return 'منتظر پشتیبان'
    case 'UNDER_REVIEW':
      return 'درحال بررسی'
    case 'WAITING_FOR_USER':
      return 'منتظر کاربر'
    case 'CLOSED':
      return 'بسته شده'
    default:
      return status
  }
}
