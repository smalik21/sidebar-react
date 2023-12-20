import { useState, useEffect, useRef } from "react";
import io from 'socket.io-client';
import Message from "./Message";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import SendIcon from '@mui/icons-material/Send';
import Brightness4Icon from '@mui/icons-material/Brightness4';

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("User");
    const [input, setInput] = useState("");
    const [socketId, setSocketId] = useState("");
    const [socket, setSocket] = useState(null);
    const [chat, setChat] = useState([]);
    const [theme, setTheme] = useState("Dark");
    const containerRef = useRef(null);
    const textareaRef = useRef(null);

    const backendURL = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const container = containerRef.current;
        container.scrollTop = container.scrollHeight;
    }, [chat]);

    useEffect(() => {

        const socket = io(backendURL);
        setSocket(socket);

        socket.on('message', (messages) => {
            setSocketId(socket.id);
            setChat(messages);
        });

        return () => {
            // Disconnect from the WebSocket server on component unmount
            socket.disconnect();
        };

    }, [backendURL]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    function handleChange(event) {
        setInput(event.target.value);
    }

    function nameChange(event) {
        setName(event.target.value);
    }

    function handleToggle() {
        if (theme === "Dark") {
            setTheme("Light");
        }
        else {
            setTheme("Dark");
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
            moveCaretToStart();
        }
    }

    const moveCaretToStart = () => {
        if (textareaRef.current) {
            textareaRef.current.setSelectionRange(0, 0);
        }
    };

    const sendMessage = () => {
        if (socket && input.trim() !== '') {
            socket.emit('message', { name, input });
        }
        else {
            console.log("Failed");
        }
        setInput("");
    };

    return (
        <div className={`Sidebar ${theme} ${isOpen ? 'open' : 'close'}`}>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isOpen ? (
                    <KeyboardDoubleArrowLeftIcon />
                ) : (
                    <DoubleArrowIcon />
                )}
            </button>

            <div className="chat-header">
                <input
                    className="name"
                    type="text"
                    value={name}
                    onChange={nameChange}
                />

                <button onClick={handleToggle}>
                    <Brightness4Icon />
                </button>
            </div>

            <div className="chat-messages" ref={containerRef}>
                {chat.map((msg, index) => {
                    return (
                        <Message
                            self={msg.clientId === socketId}
                            key={index}
                            index={index}
                            clientId={msg.clientId}
                            name={msg.name}
                            message={msg.message}
                            timeStamp={msg.timeStamp}
                        />
                    );
                })}
            </div>

            <div className="input">
                <textarea
                    placeholder="enter your message..."
                    value={input}
                    ref={textareaRef}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={sendMessage} >
                    <SendIcon className="send-icon" />
                </button>
            </div>

        </div>
    );
}