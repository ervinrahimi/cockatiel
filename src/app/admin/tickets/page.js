// src/app/admin/tickets/page.js
import { getAllTickets } from '@/actions/ticket/get-all-admin-ticket'
import { getDepartments } from '@/actions/ticket/get-ticket'
import AdminTicketList from '@/components/ticket/admin-ticket-list/AdminTicketList'
import TicketFilters from '@/components/ticket/ticket-filter/TicketFilters'
import { ROUTES } from '@/constants/routes'
import { auth } from '@/security/auth'
import { redirect } from 'next/navigation'

export default async function AdminTicketsPage() {
  const session = await auth()
  if (session.user.role !== 1) {
    redirect(ROUTES.AUTH.LOGIN)
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