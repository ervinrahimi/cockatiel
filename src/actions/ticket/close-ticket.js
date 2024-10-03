// src/actions/ticketActions.js
export async function closeTicket(ticketId) {
  await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: 'CLOSED',
    },
  })

  redirect(`/tickets/${ticketId}`)
}
