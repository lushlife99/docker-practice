import * as StompJs from "@stomp/stompjs";

export const client = new StompJs.Client({
  brokerURL: "ws://localhost:8080/backend/ws",
  forceBinaryWSFrames: true,
  appendMissingNULLonIncoming: true,

  debug: function (str) {
    console.log(str);
  },
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

client.onStompError = function (frame) {
  console.log("STOMP 에러", frame);
};
