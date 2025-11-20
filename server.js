// server.js
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import { WebSocketServer } from "ws";

const port = new SerialPort({ path: "COM3", baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

const wss = new WebSocketServer({ host: "192.168.0.123", port: 8080 });

parser.on("data", (line) => {
  try {
    const data = JSON.parse(line); 
    wss.clients.forEach(client => {
      if (client.readyState === 1) client.send(JSON.stringify(data));
    });
  } catch {}
});

console.log("WebSocket server running on ws://localhost:8080");
