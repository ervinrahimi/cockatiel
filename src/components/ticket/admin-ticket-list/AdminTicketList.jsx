// src/components/AdminTicketList.js
import Link from 'next/link'

export default function AdminTicketList({ tickets }) {
  return (
    <table>
      <thead>
        <tr>
          <th>شماره تیکت</th>
          <th>عنوان تیکت</th>
          <th>نام کاربر</th>
          <th>نام کاربری</th>
          <th>آخرین بروزرسانی</th>
          <th>اقدامات</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id}>
            <td>{ticket.ticketNumber}</td>
            <td>{ticket.title}</td>
            <td>{ticket.user.name} {ticket.user.family}</td>
            <td>{ticket.user.username}</td>
            <td>{new Date(ticket.lastUpdatedAt).toLocaleString('fa-IR')}</td>
            <td>
              <Link href={`/admin/tickets/${ticket.id}`}>
                <button>نمایش تیکت</button>
              </Link>
              <Link href={`/admin/tickets/${ticket.id}/details`}>
                <button>جزئیات تیکت</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}