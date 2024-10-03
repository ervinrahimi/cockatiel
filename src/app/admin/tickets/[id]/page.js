// src/app/admin/tickets/[id]/page.js
import { sendAdminMessage, updateTicketStatus } from '@/actions/ticket/get-admin-ticket-details'
import { getTicketDetails } from '@/actions/ticket/get-ticket'
import AdminMessageForm from '@/components/ticket/admin-message-form/AdminMessageForm'
import ChatMessages from '@/components/ticket/chat-messages/ChatMessages'
import TicketDetails from '@/components/ticket/ticket-details/TicketDetails'
import { auth } from '@/security/auth'

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
      <AdminMessageForm ticketId={ticket.id} onSubmit={sendAdminMessage} adminId={session.user.id} />
    </div>
  )
}
