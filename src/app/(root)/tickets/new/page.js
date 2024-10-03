// src/app/(root)/tickets/new/page.js
import { createTicket } from '@/actions/ticket/create-ticket'
import { auth } from '@/security/auth'
import { getDepartments } from '@/actions/ticket/get-ticket'
import TicketForm from '@/components/ticket/ticket-form/TicketForm'

export default async function NewTicketPage() {
  const session = await auth()
  const departments = await getDepartments()

  return (
    <div>
      <h1>ایجاد تیکت جدید</h1>
      <TicketForm departments={departments} onSubmit={createTicket} userId={session.user.id} />
    </div>
  )
}