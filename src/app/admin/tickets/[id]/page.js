// src/app/admin/tickets/[id]/page.js
import { auth } from '@/security/auth'
import { getTicketDetails, sendAdminMessage } from '@/actions/ticket/get-admin-ticket-details'
import TicketDetails from '@/components/TicketDetails'
import ChatMessages from '@/components/ChatMessages'
import MessageForm from '@/components/ticket/admin-message-form'

export default async function AdminTicketChatPage({ params }) {
  const session = await auth()
  if (session.user.role !== 1) {
    redirect('/auth/signin')
  }

  const ticket = await getTicketDetails(params.id)

  // Update ticket status to 'UNDER_REVIEW' if it's 'WAITING_FOR_SUPPORT'
  if (ticket.status === 'WAITING_FOR_SUPPORT') {
    await updateTicketStatus(ticket.id, 'UNDER_REVIEW')
  }

  return (
    <div>
      <TicketDetails ticket={ticket} />
      <ChatMessages messages={ticket.messages} />
      <MessageForm ticketId={ticket.id} onSubmit={sendAdminMessage} />
    </div>
  )
}
