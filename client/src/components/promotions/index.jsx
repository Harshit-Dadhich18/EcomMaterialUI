import { useEffect, useRef, useState } from "react";
import { MessageText, PromotionsContainer } from "../../styles/promotions";
import { Box, Slide } from "@mui/material";



const messages = [
    "20% off on your first order! ",
    "Summer sale starts now, visit any store.",
    "Upto 25% off on purchase of 05 items.",
];

export default function Promotions(){
    const containerRef = useRef(); //its used for the slide effect to not be affected by the parent container
    const [messageIndex,setMessageIndex] = useState(0);
    const [show,setShow] = useState(true);

    useEffect(()=> {

        setTimeout(()=> {
            setShow(false)
        }, 3000)

        const intervalId = setInterval(()=> {
            setMessageIndex(i => (i + 1) % messages.length);

            setShow(true);

            setTimeout(()=> {
                setShow(false)
            }, 3000)
        }, 4000);

        return ()=>{
            clearInterval(intervalId);
        }
    }, []);
    return(
        <PromotionsContainer>
            <Slide
            container={containerRef.current}
            direction={show ? "left" : "right" }
            in={show}
            timeout={{
                enter: 500,
                exit: 100
            }}
            >
                <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                    <MessageText>
                        {messages[messageIndex]}
                    </MessageText>
                </Box>
            </Slide>
        </PromotionsContainer>
    )
}