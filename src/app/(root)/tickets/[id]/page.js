// src/app/(root)/tickets/[id]/page.js
import { getTicketDetails, sendMessage } from '@/actions/ticket/get-ticket'
import ChatMessages from '@/components/ticket/chat-messages/ChatMessages'
import MessageForm from '@/components/ticket/message-form/MessageForm'
import TicketDetails from '@/components/ticket/ticket-details/TicketDetails'
import { auth } from '@/security/auth'

export default async function TicketChatPage({ params }) {
  const session = await auth()
  const ticket = await getTicketDetails(params.id)

  return (
    <div>
      <TicketDetails ticket={ticket} />
      <ChatMessages messages={ticket.messages} />
      <MessageForm ticketId={ticket.id} onSubmit={sendMessage} userId={session.user.id} />
    </div>
  )
}
