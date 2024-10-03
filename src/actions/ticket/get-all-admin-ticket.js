// src/actions/adminTicketActions.js
'use server'

import prisma from '@/db/client'

export async function getAllTickets(filters = {}) {
  return await prisma.ticket.findMany({
    where: { ...filters },
    include: {
      user: true,
    },
    orderBy: { lastUpdatedAt: 'desc' },
  })
}

export async function getDepartments() {
  return await prisma.department.findMany()
}
