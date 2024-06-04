import React, { useState, useEffect } from "react";
import styles from "./Chat.module.css";
import { useMutation, gql } from '@apollo/client';
import chatMessageApp from '../../assets/chat-message.webp';
import Messages from '../../components/Messages'

const POST_MESSAGE = gql`
  mutation($userId: String!, $user: String!, $content: String!) {
    postMessage(userId: $userId, user: $user, content: $content)
  }
`;

const Chat = ({userName,userId}) => {
  const [state, setState] = useState({
    userId: userId,
    user: userName,
    content: ""
  });

  const [postMessage] = useMutation(POST_MESSAGE);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setState((prevState) => ({
        ...prevState,
        userId: user.id,
        user: user.userName
      }));
    }
  }, []);

  const onSend = () => {
    if (state.content.length > 0) {
      postMessage({
        variables: state
      });
      setState((prevState) => ({
        ...prevState,
        content: ""
      }));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <button>Leave as this user</button>
        <div className={styles.title}>
          <h1>Quick Chat</h1>
          <p>The one-time chat app to chat with our community</p>
        </div>
        <button type="submit">Hidden button</button>
      </div>
      <Messages uId={state.userId}/>
      <div className={styles.chatContainer}>
        <div className={styles.chatInput}>
          <input
            type="text"
            name="content"
            placeholder="Type your message..."
            onChange={(e) => {
              setState((prevState) => ({
                ...prevState,
                content: e.target.value
              }));
            }}
            value={state.content}
            onKeyUp={(e) => {
              if(e.key ===13) {
                onSend();
              }
            }}
          />
          <img src={chatMessageApp} alt="" onClick={onSend} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
