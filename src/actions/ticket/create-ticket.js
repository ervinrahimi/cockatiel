// src/actions/ticketActions.js
'use server'

import prisma from '@/db/client'
import { redirect } from 'next/navigation'

async function getNextTicketNumber() {
  // Find the current counter or create if doesn't exist
  const counter = await prisma.ticketCounter.findFirst()

  if (!counter) {
    // If no counter exists, create one with the initial value of 1
    await prisma.ticketCounter.create({
      data: {
        sequence: 1,
      },
    })
    return 1
  } else {
    // Increment the current counter
    const updatedCounter = await prisma.ticketCounter.update({
      where: { id: counter.id },
      data: {
        sequence: { increment: 1 },
      },
    })
    return updatedCounter.sequence
  }
}

export async function createTicket(formData) {
  const { userId, departmentId, priority, title, message } = formData

  const ticketNumber = await getNextTicketNumber()

  const ticket = await prisma.ticket.create({
    data: {
      userId,
      departmentId,
      priority,
      title,
      ticketNumber,  // Use the custom incremented ticket number
      messages: {
        create: {
          senderId: userId,
          message,
        },
      },
    },
  })

  redirect(`/tickets/${ticket.id}`)
}