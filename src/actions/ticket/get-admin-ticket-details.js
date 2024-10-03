// src/actions/adminTicketActions.js
'use server'

import prisma from '@/db/client'
import { revalidatePath } from 'next/cache'

export async function getTicketDetails(ticketId) {
  return await prisma.ticket.findUnique({
    where: { id: ticketId },
    include: {
      messages: {
        include: {
          sender: true,
        },
        orderBy: { createdAt: 'asc' },
      },
      department: true,
      user: true,
    },
  })
}

export async function sendAdminMessage({ ticketId, adminId, message }) {
  await prisma.ticketMessage.create({
    data: {
      ticketId,
      senderId: adminId,
      message,
    },
  })

  // Update ticket status and lastUpdatedAt
  await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: 'WAITING_FOR_USER',
      lastUpdatedAt: new Date(),
    },
  })

  revalidatePath(`/admin/tickets/${ticketId}`)
}

export async function updateTicketStatus(ticketId, status) {
  await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status,
    },
  })
}
