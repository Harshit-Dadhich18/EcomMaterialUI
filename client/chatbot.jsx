import { useEffect, useRef } from "react";

export default function Chatbot() {
    const scriptAdded = useRef(false);

    useEffect(() => {
        // Add the Dialogflow chatbot script only once
        if (!scriptAdded.current) {
            const script = document.createElement("script");
            script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
            script.async = true;
            document.body.appendChild(script);
            scriptAdded.current = true;
        }
    }, []); // This effect only runs once to add the script

    return (
        <>
            <style>
                {`
                    /* Move the Dialogflow chatbot icon higher */
                    df-messenger div[aria-label="Open chat"] {
                        bottom: 80px !important; /* Adjust this value to move it higher or lower */
                    }
                `}
            </style>

            {/* The chatbot will always be shown */}
            <df-messenger
                intent="WELCOME"
                chat-title="Chatbot-Demo"
                agent-id="ac82dff4-1c4e-4b52-953a-2c335796e731"
                language-code="en">
            </df-messenger>
        </>
    );
}
