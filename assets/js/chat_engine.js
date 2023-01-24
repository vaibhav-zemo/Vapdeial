class ChatEngine {
  constructor(chatBoxId, userEmail, name) {
    this.chatBox = $(`#${chatBoxId}`);
    this.userEmail = userEmail;
    this.name = name;

    // this io.connect fires the event in the chat_socket .on('connection')
    this.socket = io.connect("http://localhost:5000");
    // this io variable comes form the cdn of socket and this is global

    if (this.userEmail) {
      this.connectionHandler();
    }
  }

  connectionHandler() {
    let self = this;
    this.socket.on("connect", function () {
      console.log("connection established using sockets...!");

      self.socket.emit("join_room", {
        // join_room is the name of the event it is decided by us
        user_email: self.userEmail,
        chatroom: "codeial",
      });

      self.socket.on("user_joined", function (data) {
        console.log("a user joined", data);
      });

      $("#send-btu").click(function () {
        let msg = $("#chat-message-input").val();

        if (msg != "") {
          self.socket.emit("send_message", {
            message: msg,
            user_email: self.userEmail,
            chatroom: "codeial",
            name: self.name,
          });
        }
      });

      self.socket.on("receive_message", function (data) {
        let newMessage = $("<li>");

        let messageType = "other-message";

        if (data.user_email == self.userEmail) {
          messageType = "self-message";
        }

        newMessage.append(
          $("<p>", {
            html: data.message,
          })
        );
        newMessage.append(
          $("<sub>", {
            html: data.name,
          })
        );

        newMessage.addClass(messageType);

        $("#chat").append(newMessage);
        console.log(newMessage);
      });
    });
  }
}
