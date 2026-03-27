import React from "react";
import { WS_EVENTS } from "chat-shared";

export default function Chat() {
  return <div>chat: {WS_EVENTS.MESSAGE_ACK}</div>;
}
