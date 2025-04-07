import { useEffect, useRef, useState } from "react";

export default function Chatbot({ isAuthenticated }) {
    const scriptAdded = useRef(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
            const script = document.createElement("script");
            script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
            script.async = true;
            document.body.appendChild(script);
            scriptAdded.current = true;
    }, []);


    return (
        <>
            <style>
                {`
                /* Hide default Dialogflow floating button */
                df-messenger div[aria-label="Open chat"] {
                    display: none !important;
                }

                /* Custom chatbot button */
                .custom-chat-button {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #ff5733;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                /* Custom chatbot icon */
                .custom-chat-button img {
                    width: 40px;
                    height: 40px;
                }
                `}
            </style>

            {/* Custom chatbot button */}
            <div className="custom-chat-button" onClick={() => setIsChatOpen(!isChatOpen)}>
                <img src="/chatbot-icon.png" alt="Chat" /> {/* Replace with your icon */}
            </div>

            {/* Show chatbot only when isChatOpen is true */}
            {isChatOpen && (
                <df-messenger
                    intent="WELCOME"
                    chat-title="Chatbot-Demo"
                    agent-id="ac82dff4-1c4e-4b52-953a-2c335796e731"
                    language-code="en">
                </df-messenger>
            )}
        </>
    );
}
