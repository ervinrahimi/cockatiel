// src/components/TicketDetails.js
import Link from 'next/link'

export default function TicketDetails({ ticket }) {
  return (
    <div>
      <h2>جزئیات تیکت</h2>
      <p>موضوع: {ticket.title}</p>
      <p>اولویت: {translatePriority(ticket.priority)}</p>
      <p>
        آخرین بروزرسانی:{' '}
        {new Date(ticket.lastUpdatedAt).toLocaleString('fa-IR')}
      </p>
      <p>وضعیت: {translateStatus(ticket.status)}</p>
      <div>
        <Link href="/tickets/new">
          <button>ساختن تیکت جدید</button>
        </Link>
        {ticket.status !== 'CLOSED' && (
          <form action={`/tickets/${ticket.id}/close`} method="POST">
            <button type="submit">بستن تیکت</button>
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
