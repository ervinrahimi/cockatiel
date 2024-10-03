// src/components/TicketDetails.js
import Link from 'next/link'
import styles from './TicketDetails.module.css'

export default function TicketDetails({ ticket }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>جزئیات تیکت</h2>
      <p className={styles.detailItem}>موضوع: {ticket.title}</p>
      <p className={styles.detailItem}>
        اولویت: {translatePriority(ticket.priority)}
      </p>
      <p className={styles.detailItem}>
        آخرین بروزرسانی: {new Date(ticket.lastUpdatedAt).toLocaleString('fa-IR')}
      </p>
      <p className={styles.detailItem}>وضعیت: {translateStatus(ticket.status)}</p>
      <div className={styles.buttonContainer}>
        <Link href="/tickets/new">
          <button className={styles.button}>ساختن تیکت جدید</button>
        </Link>
        {ticket.status !== 'CLOSED' && (
          <form action={`/tickets/${ticket.id}/close`} method="POST">
            <button className={styles.button} type="submit">
              بستن تیکت
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function translatePriority(priority) {
  switch (priority) {
    case 'HIGH':
      return 'زیاد'
    case 'MEDIUM':
      return 'متوسط'
    case 'LOW':
      return 'کم'
    default:
      return priority
  }
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
