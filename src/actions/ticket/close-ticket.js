// src/actions/ticketActions.js
'use server'

import prisma from '@/db/client'
import { redirect } from 'next/navigation'
 

export async function closeTicket(ticketId) {
  await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: 'CLOSED',
    },
  })

  redirect(`/tickets/${ticketId}`)
}
