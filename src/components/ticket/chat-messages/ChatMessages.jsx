// src/components/ChatMessages.js
export default function ChatMessages({ messages }) {
  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          <p>
            <strong>
              {msg.sender.name || msg.sender.username}{' '}
              {msg.sender.role === 1 ? '(پشتیبان)' : ''}
            </strong>
            <span> - {new Date(msg.createdAt).toLocaleString('fa-IR')}</span>
          </p>
          <p>{msg.message}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}
