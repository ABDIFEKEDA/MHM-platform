// services/websocketService.ts
export class WebSocketService {
  private socket: WebSocket | null = null;
  private messageHandlers: ((message: any) => void)[] = [];

  connect(token: string) {
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001'}/ws?token=${token}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.messageHandlers.forEach(handler => handler(message));
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  sendMessage(message: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  onMessage(handler: (message: any) => void) {
    this.messageHandlers.push(handler);
  }

  offMessage(handler: (message: any) => void) {
    this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
  }
}

export const websocketService = new WebSocketService();