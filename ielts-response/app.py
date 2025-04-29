from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def home():
    return "IELTS Real-Time Updates Backend Running!"

@socketio.on('connect')
def handle_connect():
    print("Client connected")
    emit('message', {'user': 'System', 'text': 'Connected to server'})

@socketio.on('send_message')
def handle_message(data):
    print(f"Message from {data}")
    emit('message', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
