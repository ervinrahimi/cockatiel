// src/actions/ticketActions.js
'use server'

import prisma from '@/db/client'
import { redirect } from 'next/navigation'

export async function createTicket(formData) {
  const { userId, departmentId, priority, title, message } = formData

  const ticket = await prisma.ticket.create({
    data: {
      userId,
      departmentId,
      priority,
      title,
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
