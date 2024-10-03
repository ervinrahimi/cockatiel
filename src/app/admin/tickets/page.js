// src/app/admin/tickets/page.js
import { auth } from '@/security/auth'
import { getAllTickets } from '@/actions/ticket/adminTicketActions'
import AdminTicketList from '@/components/AdminTicketList'
import TicketFilters from '@/components/TicketFilters'

export default async function AdminTicketsPage() {
  const session = await auth()
  if (session.user.role !== 1) {
    redirect('/auth/signin')
  }

  const tickets = await getAllTickets()
  const departments = await getDepartments()

  return (
    <div>
      <h1>تیکت‌های کاربران</h1>
      <TicketFilters departments={departments} />
      <AdminTicketList tickets={tickets} />
    </div>
  )
}