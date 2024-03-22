import React from "react";
import { Link } from "react-router-dom";
import {
  Panel,
  PanelHeader,
  PanelBody,
  PanelFooter,
} from "./../../components/panel/panel.jsx";
import PerfectScrollbar from "react-perfect-scrollbar";
import { PageSettings } from "./../../config/page-settings.js";
import { io } from "socket.io-client";
import Peer from "peerjs";
import { connect } from "react-redux";
import { loadCurrentUser } from "../../store/users";
import auth from "../../services/authservice";
//

import Button from "@material-ui/core/Button";

import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import Alert from "react-bootstrap/Alert";
//
import "./messenger.css";
import Conversation from "./../../components/messenger/Conversation";
import Message from "./../../components/messenger/Message";
import ChatOnline from "./../../components/messenger/ChatOnline";
import { getConversations } from "./../../services/conversations";
import {
  getMessagesByConversation,
  saveMessage,
} from "./../../services/messages";
import Loader from "./../../common/loader";
import { apiUrl } from "../../config/config.json";

const peer = new Peer({
  //host: "192.168.0.125",
  //host: "localhost",
  host: apiUrl.replace("https://", "").replace("/api", ""),
  port: 9000,
  path: "/peer",
  key: "string",
});

class Messenger extends React.Component {
  static contextType = PageSettings;

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scrollRef = React.createRef(null);
    this.socketRef = React.createRef();
    this.myVideo = React.createRef();
    this.userVideo = React.createRef();
    this.connectionRef = React.createRef();
    this.state = {
      conversations: [],
      currentChat: null,
      messages: [],
      newMessage: "",
      arrivalMessage: null,
      socket: null,
      currentUser: {},
      stream: null,
      callAccepted: false,
      callEnded: false,
      receivingCall: false,
      fromPeer: "",
      fromSocket: "",
      modal: false,
      loading: true,
      errors: {},
    };

    this.callVideo = this.callVideo.bind(this);
  }

  async populateConversations() {
    const { data: conversations } = await getConversations();
    this.setState({ conversations });
  }

  async populateMessages(conversationId) {
    const { data: messages } = await getMessagesByConversation(conversationId);
    this.setState({ messages });
  }

  async componentDidMount() {
    //this.setState({ socket: io(apiUrl.replace('/api','')) });
    //const socket = io(apiUrl.replace('/api',''));

    //{transports: ['websocket', 'polling', 'flashsocket']}
    this.socketRef.current = io(apiUrl.replace("/api", ""), {
      transports: ["websocket"],
    });

    //this.socketRef.current = io(apiUrl.replace('/api',''));
    //this.setState({ socket:  this.socketRef.current });
    this.socketRef.current.on("connection", () => {
      this.setState({ socket: this.socketRef.current });
      console.log("connected");
    });

    this.socketRef.current.on("getMessage", (data) => {
      this.setState({ arrivalMessage: data });
      console.log("arival message", data);
    });

    this.socketRef.current.on("end call", () => {
      this.setState({ modal: false });
      this.setState({ callEnded: true });
      this.state.stream.getTracks().forEach(function (track) {
        track.stop();
      });
      this.setState({
        fromPeer: "",
        fromSocket: "",
      });
      this.myVideo.current.srcObject = null;
      this.userVideo.current.srcObject = null;
      peer.destroy();
    });

    this.socketRef.current.on("callAccepted", ({ fromSocket, fromPeer }) => {
      this.setState({
        fromSocket,
        fromPeer,
      });
      const call = peer.call(fromPeer, this.state.stream);
      call.on("stream", (stream) => {
        this.userVideo.current.srcObject = stream;
      });
    });

    peer.on("call", (call) => {
      console.log(this.state.stream);
      call.answer(this.state.stream);
      call.on("stream", (stream) => {
        this.userVideo.current.srcObject = stream;
      });
    });

    this.socketRef.current.on("callUser", (data) => {
      this.setState({
        receivingCall: true,
        fromPeer: data.fromPeer,
        fromSocket: data.fromSocket,
        // callerSignal: data.signal,
      });
      //console.log("someone is calling",data.from);
    });

    const user = auth.getProfile();

    await this.props.loadCurrentUser(user._id);
    const currentUser = await this.props.currentUser;
    //online users
    // this.socketRef.current.on("getUsers", (users) => {
    //  this.setState({onlineUsers:currentUser.contacts.filter((contact) => users.some((u) => u.userId === contact))});
    // });
    this.setState({ currentUser: this.mapToViewModel(currentUser) });
    await this.populateConversations();

    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    //const {socket} = this.state;
    if (this.state.currentChat === null) return;
    if (prevState.socket !== this.state.socket) {
      try {
        const data1 = {
          userId: this.state.currentUser._id,
        };
        console.log("data", data1);
        this.socketRef.current.emit("addUser1", data1);
      } catch (error) {
        console.log(error);
      }
    }

    if (prevState.currentChat !== this.state.currentChat) {
      try {
        this.socketRef.current.emit(
          "get-messages-history",
          this.state.currentChat._id
        );
        this.socketRef.current.on("output-messages", (messages) => {
          this.setState({ messages });
        });
        //await this.populateMessages(this.state.currentChat._id);
        console.log("messages", this.state.messages);
        const data = {
          userId: this.state.currentUser._id,
          conversationId: this.state.currentChat._id,
        };
        console.log("data", data);
        this.socketRef.current.emit("addUser", data);

        //
        if (!this.scrollRef.current) return;
        this.scrollRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "end",
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (prevState.arrivalMessage !== this.state.arrivalMessage) {
      const newMessages = [...this.state.messages, this.state.arrivalMessage];
      this.setState({ messages: newMessages });
      if (!this.scrollRef.current) return;
      this.scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "end",
      });
    }
  }

  callVideo() {
    //this.setState({ modal: !this.state.modal });
    this.callUser();
    this.setState({ modal: true });
  }

  endVideoCall() {
    this.setState({ modal: false });
    this.setState({ callEnded: true });
    this.state.stream.getTracks().forEach(function (track) {
      track.stop();
    });
    this.socketRef.current.emit("end call", this.state.fromSocket);
    this.setState({
      fromPeer: "",
      fromSocket: "",
    });
    this.myVideo.current.srcObject = null;
    this.userVideo.current.srcObject = null;
    peer.destroy();
  }

  callUser = async () => {
    if (!peer.id) return;
    // await navigator.mediaDevices.getUserMedia({ video: true , audio: true }).then((stream) => {
    //   this.setState({stream});
    //   try {
    //     this.myVideo.current.srcObject = stream;
    //     }catch (err) {
    //       console.log(err);
    //     }
    // });
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    this.setState({ stream });
    try {
      this.myVideo.current.srcObject = this.state.stream;
    } catch (err) {
      console.log(err);
    }

    const receiver = this.state.currentChat.members.find(
      (member) => member._id !== this.state.currentUser._id
    );
    this.socketRef.current.emit("callUser", {
      userToCall: receiver._id,
      fromPeer: peer.id,
      fromSocket: this.socketRef.current.id,
    });
    // });

    // peer.on("stream", (stream) => {
    //   this.userVideo.current.srcObject = stream;
    // });

    this.socketRef.current.on("callAccepted", (signal) => {
      console.log("call accepted");
      this.setState({ callAccepted: true });
      // peer.signal(signal);
    });

    // this.connectionRef.current = peer;
  };

  answerCall = () => {
    window.navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.myVideo.current.srcObject = this.state.stream;
        this.setState({ stream });
        this.setState({ callAccepted: true });
        // const peer = new Peer({
        //   initiator: false,
        //   answerConstraints: {
        //     offerToReceiveAudio: false,
        //     offerToReceiveVideo: false,
        //   },
        //   stream: this.state.stream,
        // });
        // peer.on("signal", (data) => {
        //   console.log("signal");
        console.log(peer.id, this.state.fromSocket);
        this.socketRef.current.emit("answerCall", {
          myPeer: peer.id,
          to: this.state.fromSocket,
        });

        this.setState({ modal: true });
      })
      .catch((error) => console.warn(error));
    // await navigator.mediaDevices.getUserMedia({ video: true , audio: true }).then((stream) => {
    //   this.setState({stream});
    //   try {
    //     this.myVideo.current.srcObject = stream;
    //     }catch (err) {
    //       console.log(err);
    //     }
    // });
    this.setState({ callAccepted: true });
    // const peer = new Peer({
    //   initiator: false,
    //   answerConstraints: {
    //     offerToReceiveAudio: false,
    //     offerToReceiveVideo: false,
    //   },
    //   stream: this.state.stream,
    // });
    // peer.on("signal", (data) => {
    //   console.log("signal");
    console.log(peer.id, this.state.fromSocket);
    this.socketRef.current.emit("answerCall", {
      myPeer: peer.id,
      to: this.state.fromSocket,
    });

    this.setState({ modal: true });
    // });
    //   peer.on("stream", (stream) => {
    //     console.log("stream", stream);
    //     this.userVideo.current.srcObject = stream;
    //   });

    //   peer.signal(this.state.callerSignal);
    //   this.connectionRef.current = peer;
    //   this.setState({ modal: true });
  };

  handleChange({ currentTarget: input }) {
    this.setState({ newMessage: input.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      //    const data={
      //     message:this.state.newMessage,
      //     sender:this.state.currentUser._id,
      //     conversationId: this.state.currentChat._id
      //    };

      const receiverId = this.state.currentChat.members.find(
        (member) => member._id !== this.state.currentUser._id
      );

      const data = {
        receiver: receiverId._id,
        message: this.state.newMessage,
        sender: this.state.currentUser._id,
        conversationId: this.state.currentChat._id,
      };

      this.socketRef.current.emit("sendMessage", data);

      this.socketRef.current.on("sentMessage", (message) => {
        const messages = [...this.state.messages, message];
        this.setState({ messages });
      });

      //await saveMessage(data);
      //const messages = [...this.state.messages,data];
      //this.setState({messages});

      this.setState({ newMessage: "" });
    } catch (ex) {
      if (ex.response) {
        const errors = { ...this.state.errors };
        errors.newMessage = ex.response.data;
        this.setState({ errors });
        console.log(this.state.errors);
      }
    }
  }

  mapToViewModel(user) {
    return {
      _id: user._id,
      username: user.username,
      profile: user.profile,
      email: user.email,
      dateBirth: new Date(user.dateBirth),
      firstName: user.contactName.first,
      lastName: user.contactName.last,
      initials: user.contactName.initials,
      prefix: user.prefix,
      imageSrc: user.imageSrc,
      address1: user.Address.address1,
      address2: user.Address.address2,
      address3: user.Address.address3,
      city: user.Address.city,
      state: user.Address.state,
      zip: user.Address.zip,
      country: user.Address.country,
      gender: user.gender,
    };
  }

  render() {
    const {
      currentUser,
      conversations,
      messages,
      currentChat,
      newMessage,
      callAccepted,
      callEnded,
      receivingCall,
      stream,
      caller,
    } = this.state;
    this.date = new Date();
    if (this.state.loading === true) return <Loader />;
    return (
      <div>
        <ol className="breadcrumb float-xl-end">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Messenger</li>
        </ol>
        <h1 className="page-header">
          Messenger <small>...</small>
        </h1>

        <div className="row">
          <div className="col-xl-12">
            <Panel>
              <PanelHeader>Message</PanelHeader>
              <PanelBody>
                <div className="messenger">
                  <div className="chatMenu">
                    <div className="chatMenuWrapper">
                      <input
                        placeholder="Search for contacts"
                        className="chatMenuInput"
                      />
                      {conversations.map((conversation) => (
                        <div
                          onClick={() =>
                            this.setState({ currentChat: conversation })
                          }
                        >
                          <Conversation
                            data={conversation}
                            currentUser={currentUser._id}
                            key={conversation._id}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="chatBox">
                    <div className="chatBoxWrapper">
                      {currentChat ? (
                        <>
                          <div
                            style={{ fontSize: "24px" }}
                            onClick={this.callVideo}
                          >
                            <i className="fa fa-video fa-lg"></i>
                          </div>

                          {receivingCall && !callAccepted && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              {/* <h1>{caller.name} is calling:</h1> */}
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={this.answerCall}
                              >
                                Answer
                              </Button>
                            </div>
                          )}

                          <div className="chatBoxTop">
                            {messages.map((message) => (
                              <div ref={this.scrollRef}>
                                <Message
                                  data={message}
                                  own={message.sender === currentUser._id}
                                />
                              </div>
                            ))}
                          </div>
                          <div className="chatBoxButtom">
                            <textarea
                              onChange={this.handleChange}
                              value={newMessage}
                              className="chatMessage"
                              placeholder="say something ...... !"
                            ></textarea>
                            <button
                              className="submitButton"
                              onClick={this.handleSubmit}
                            >
                              Send
                            </button>
                          </div>
                        </>
                      ) : (
                        <span className="msg">
                          Select a conversation to start a chat
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                      <ChatOnline />
                    </div>
                  </div>
                </div>

                <Modal
                  show={this.state.modal}
                  onHide={() => this.endVideoCall}
                  size="xl"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header toggle={() => this.endVideoCall}>
                    Video Call
                  </Modal.Header>
                  <Modal.Body>
                    <div className="container">
                      <div className="video-container">
                        <div className="video">
                          <h1>my video</h1>
                          {stream && (
                            <video
                              playsInline
                              muted
                              ref={this.myVideo}
                              autoPlay
                              style={{ width: "300px", transform: `rotateY(180deg)` }}
                            />
                          )}
                        </div>
                        <div className="video">
                          <h1>user video</h1>
                          {callAccepted && !callEnded ? (
                            <video
                              playsInline
                              ref={this.userVideo}
                              autoPlay
                              style={{ width: "300px", transform: `rotateY(180deg)` }}
                            />
                          ) : null}
                        </div>
                      </div>

                      <div>
                        {receivingCall && !callAccepted ? (
                          <div className="caller">
                            {/* <h1>{caller.username} is calling...</h1> */}
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={this.answerCall}
                            >
                              Answer
                            </Button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    {/* <button className="btn btn-white" onClick={() => this.toggleModal()}>Close</button> */}

                    <button
                      className="btn btn-red"
                      title="Close"
                      onClick={() => this.endVideoCall()}
                    >
                      <i className="ion md-close"></i>Cancel
                    </button>
                    {/* <button
                  className="btn btn-green"
                  type="submit"
                  title="Save the Appointment"
                  onClick={this.handleSubmit}
                >
                  <i className="far fa-save"></i>
                </button> */}
                  </Modal.Footer>
                </Modal>
              </PanelBody>
              <PanelFooter></PanelFooter>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.entities.users.currentUser,
});
const mapDispatchToProps = (dispatch) => ({
  loadCurrentUser: (id) => dispatch(loadCurrentUser(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
