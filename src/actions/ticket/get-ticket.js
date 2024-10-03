// src/actions/ticketActions.js
'use server'

import prisma from "@/db/client"

// Server Action to fetch all departments
export async function getDepartments() {
  return await prisma.department.findMany()
}


export async function getUserTickets(userId) {
  return await prisma.ticket.findMany({
    where: { userId },
    include: {
      department: true,
    },
    orderBy: { lastUpdatedAt: 'desc' },
  })
}

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

export async function sendMessage({ ticketId, userId, message }) {
  await prisma.ticketMessage.create({
    data: {
      ticketId,
      senderId: userId,
      message,
    },
  })

  // Update ticket status and lastUpdatedAt
  await prisma.ticket.update({
    where: { id: ticketId },
    data: {
      status: 'WAITING_FOR_SUPPORT',
      lastUpdatedAt: new Date(),
    },
  })

  revalidatePath(`/tickets/${ticketId}`)
}
