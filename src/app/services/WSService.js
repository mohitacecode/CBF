export default class WSService {
  constructor(options) {
    this.socket = null;
    this.stackData = [];
    return this.connect(options);
  }

  connect({ url, uid }) {
    if (uid && this.socket) {
      return {
        socket: this.socket,
      };
    } else {
      this.socket = new WebSocket(url);
      return {
        send: data => {
          this._send({ data });
        },
        onOpen: cb => {
          this._onOpen({ cb });
        },
        onMessage: cb => {
          this._on({ cb });
        },
        offMessage: () => {
          this._off();
        },
        onClose: cb => {
          this._onclose({ cb });
        },
        close: () => {
          if (this.socket) {
            this.socket.close();
            this.socket = null;
          }
        },
        isOpen: () => {
          return this._isOpen();
        },
        isClosed: () => {
          return this._isClosed();
        },
        isConnecting: () => {
          return this._isConnecting();
        },
      };
    }
  }

  _isOpen() {
    let socketRef = this.socket;
    if (socketRef) {
      return socketRef.readyState === WebSocket.OPEN;
    } else {
      return false;
    }
  }

  _isClosed() {
    let socketRef = this.socket;
    if (socketRef) {
      return socketRef.readyState === WebSocket.CLOSED;
    } else {
      return true;
    }
  }

  _isConnecting() {
    let socketRef = this.socket;
    if (socketRef) {
      return socketRef.readyState === WebSocket.CONNECTING;
    } else {
      return false;
    }
  }

  _send({ data } = {}) {
    let socketRef = this.socket;
    if (socketRef) {
      if (this._isOpen()) {
        if (process.env.NODE_ENV === "development") {
          console.log(data);
        }
        socketRef.send(data);
      } else if (this._isConnecting()) {
        if (socketRef.onopen === null) {
          this._onOpen();
        }
        this.stackData.push(data);
      }
    }
  }

  _onOpen({ cb } = {}) {
    let socketRef = this.socket;
    if (socketRef) {
      socketRef.onopen = e => {
        if (this._isOpen() && this.stackData) {
          this.stackData.forEach(function (storedData) {
            setTimeout(() => {
              if (process.env.NODE_ENV === "development") {
                console.log(storedData);
              }
              socketRef.send(storedData);
            }, 30);
          });
          this.stackData = [];
        }
        if (cb) {
          cb(e);
        }
      };
    }
  }

  _onclose({ cb } = {}) {
    let socketRef = this.socket;
    if (socketRef) {
      socketRef.onclose = function (e) {
        if (cb) {
          cb(e);
        }
      };
    }
  }

  _on({ cb } = {}) {
    let socketRef = this.socket;
    if (socketRef) {
      socketRef.onmessage = function (e) {
        if (cb) {
          cb(e);
        }
      };
    }
  }

  _off() {
    let socketRef = this.socket;
    if (socketRef) {
      socketRef.onmessage = null;
    }
  }
}
