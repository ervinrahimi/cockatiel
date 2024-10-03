// src/app/(root)/tickets/[id]/close/page.js

import { closeTicket } from "@/actions/ticket/close-ticket"

export default async function CloseTicketPage({ params }) {
  await closeTicket(params.id)
  return null
}
