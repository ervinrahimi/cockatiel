// src/components/TicketList.js
import Link from 'next/link'

export default function TicketList({ tickets }) {
  return (
    <table>
      <thead>
        <tr>
          <th>شماره تیکت</th>
          <th>عنوان تیکت</th>
          <th>وضعیت تیکت</th>
          <th>آخرین بروزرسانی</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td>{ticket.ticketNumber}</td>
            <td>
              <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
            </td>
            <td>{translateStatus(ticket.status)}</td>
            <td>{new Date(ticket.lastUpdatedAt).toLocaleString('fa-IR')}</td>
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
