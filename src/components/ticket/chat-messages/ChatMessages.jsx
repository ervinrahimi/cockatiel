// src/components/ChatMessages.js
import styles from './ChatMessages.module.css'

export default function ChatMessages({ messages }) {
  return (
    <div className={styles.chatContainer}>
      {messages.map((msg) => (
        <div key={msg.id} className={styles.message}>
          <p className={styles.messageSender}>
            <strong>
              {msg.sender.name || msg.sender.username}{' '}
              {msg.sender.role === 1 ? (
                <span className={styles.supportTag}>(پشتیبان)</span>
              ) : null}
            </strong>
            <span className={styles.messageTimestamp}>
              - {new Date(msg.createdAt).toLocaleString('fa-IR')}
            </span>
          </p>
          <p className={styles.messageContent}>{msg.message}</p>
          <hr className={styles.hr} />
        </div>
      ))}
    </div>
  )
}
