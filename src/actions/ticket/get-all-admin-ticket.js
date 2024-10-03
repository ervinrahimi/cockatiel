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

export async function getAllAdminTicket(filters = {}) {
  const {
    date,
    status,
    departmentId,
    priority,
    orderBy,
    ticketNumber,
    keyword
  } = filters

  // تنظیم فیلترهای جستجو
  const where = {}

  if (ticketNumber) {
    where.ticketNumber = parseInt(ticketNumber) // تبدیل به عدد
  }

  if (departmentId) {
    where.departmentId = departmentId
  }

  if (status) {
    where.status = status
  }

  if (priority) {
    where.priority = priority
  }

  // اجرای کوئری Prisma
  return await prisma.ticket.findMany({
    where,
    include: {
      user: true,
    },
    orderBy: { lastUpdatedAt: 'desc' },
  })
}