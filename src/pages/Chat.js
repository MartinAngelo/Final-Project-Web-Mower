import React, { useState, useEffect, useRef } from "react";
import firebase from "../utils/firebase";

import SendMessage from "../pages/SendMessage";


import Navigation from "./Navigation";
var db = firebase.firestore();
var auth = firebase.auth();

function Chat() {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  return (
    <div className="chatbox">
      <Navigation />
      <div className="containermsg">
        <div className="msgs">


          {messages.map(({ id, text, photoURL, uid }) => (
            <div>
              <div
                key={id}
                className={`msg ${uid === auth.currentUser.uid ? "sent" : "received"
                  }`}
              >
                <img src={photoURL} alt="" />
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>

        <SendMessage scroll={scroll} />
        <div ref={scroll}></div>
      </div>
    </div>
  );
}

export default Chat;
