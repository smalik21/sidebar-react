import { useState, useEffect } from "react";

export default function Message(props) {
    const [self, setSelf] = useState("other");
    const [name, setName] = useState("You");

    useEffect(() => {
        if (props.self) {
            setSelf("self");
            setName("You");
        }
        else {
            setSelf("other");
            setName(props.name);
        }
        // setName(props.name);
    }, [props]);

    // Define a mapping of language keywords and their corresponding CSS classes
    const syntaxHighlightingRules = {
        function: 'keyword',
        if: 'keyword',
        else: 'keyword',
        // Add more keywords and CSS classes as needed
    };

    // Function to check if a message is a code snippet
    function isCodeSnippet(message) {
        return message.startsWith('//') || message.startsWith('```');
    }

    // Function to highlight code syntax
    function highlightCode(code) {
        const keywords = Object.keys(syntaxHighlightingRules).join('|');
        const regex = new RegExp(`\\b(${keywords})\\b`, 'g');

        // Separate comments into a separate line
        code = code.replace(/\/\/(.*)/g, '\n$&');

        // Highlight keywords and place them on a new line
        code = code.replace(regex, match => `<br><span class="${syntaxHighlightingRules[match]}">${match}</span>`);

        // Add "Code: " at the start of the code
        code = `CODE:<br>${code}`;
        return code;
    }

    return (
        <div className="Message">
            <div className={self} >
                <div className="title-name">{name}</div>
                <div className="message">
                    {isCodeSnippet(props.message) ? (
                        <code dangerouslySetInnerHTML={{ __html: highlightCode(props.message) }} />
                    ) : (
                        props.message
                    )}
                </div>
                <div className="time-stamp">{props.timeStamp}</div>
            </div>
        </div>
    );
}