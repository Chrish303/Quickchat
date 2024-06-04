import React from "react";
import styles from "./Home.module.css";  // Corrected the import statement
import chatImg from "../../assets/chat.jpg";
import messageImg from "../../assets/message.webp";
// import { useMutation } from "@apollo/client";

const Home = ({ userName, setUserName, setStartChat, userId }) => {
    const startChat = () => {
        if (!userName) {
            alert('Please enter your name');
            return;
        }
        const data = {
            userName,
            id: userId
        };
        sessionStorage.setItem("user", JSON.stringify(data));
        setStartChat(true);
    };

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <h3>Chrish</h3>
            </nav>
            <div className={styles.home}>
                <div className={styles.left}>
                    <h3>Chatting for Community</h3>
                    <p>
                        A chat application using GraphQL subscriptions and WebSockets for real-time chat. One click and chat within our telechat community.
                    </p>
                    <div className={styles.inputContainer}>
                        <input 
                            type="text" 
                            value={userName} 
                            placeholder="Enter your name" 
                            onChange={(e) => setUserName(e.target.value)} 
                        />
                        <button onClick={startChat}>
                            <img src={chatImg} alt="Start chat" />
                        </button>
                    </div>
                </div>
                <div className={styles.right}>
                    <img src={messageImg} alt="Chat illustration" />
                </div>
            </div>
        </div>
    );
};

export default Home;
