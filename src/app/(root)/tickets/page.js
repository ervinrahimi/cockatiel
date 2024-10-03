// src/app/(root)/tickets/page.js
import TicketList from '@/components/ticket/ticket-list/TicketList'
import { getUserTickets } from '@/actions/ticket/get-ticket'
import { auth } from '@/security/auth'
import Link from 'next/link'

export default async function TicketsPage() {
  const session = await auth()
  const tickets = await getUserTickets(session.user.id)

  return (
    <div>
      <h1>لیست تیکت‌های من</h1>
      <button>
        <Link href='/tickets/new'>تیکت جدید</Link>
      </button>
      <TicketList tickets={tickets} />
    </div>
  )
}
