import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

interface Message {
  user: string;
  text: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('message', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const msg = { user: 'You', text: input };
    socket.emit('send_message', msg);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>IELTS Real-Time Updates</h2>
      <div style={{ border: '1px solid #aaa', height: '300px', overflowY: 'auto', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            textAlign: msg.user === 'You' ? 'right' : 'left',
            color: msg.user === 'System' ? 'gray' : 'black'
          }}>
            <strong>[{msg.user}]</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        style={{ width: '80%', marginTop: '10px', padding: '5px' }}
      />
      <button onClick={sendMessage} style={{ padding: '5px 10px', marginLeft: '5px' }}>
        Send
      </button>
    </div>
  );
}

export default App;
