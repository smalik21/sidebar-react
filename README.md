# React Sidebar Chat Application
This is a React sidebar application that supports live chatting, allowing users to communicate with each other in real-time. The sidebar includes additional features such as code highlighting. This README provides an overview of the application's functionalities.

## Live Demo
You can access the live demo of the application at Demo Link.

## Getting Started
To run the React sidebar chat application locally, follow these steps:

- Clone the repository:
`git clone https://github.com/your-username/your-repo.git`
- Install dependencies:
`cd your-repo`
`npm install`
- Start the development server:
`npm start`
- Open your browser and visit http://localhost:3000 to see the application.

## Chat Feature
The chat feature enables real-time messaging between users through a WebSocket communication channel. Here's how it works:

- WebSocket Communication: The application utilizes the WebSocket protocol to establish a bi-directional communication channel between the client and the server. This allows for instant message delivery and updates without frequent HTTP requests.

- Real-Time Messaging: When a user sends a message in the chat interface, it is sent to the server using the WebSocket package. The server receives and stores the messages from all connected clients, ensuring that all clients have access to the latest chat history. The React state management handles the real-time updates on the client-side.

- Message Display: Each message in the chat is displayed with the name of the sender, the message content, and a timestamp. The user's own messages are distinguished from others using the socket ID associated with each message.

### Theme Toggle Button: A toggle button is provided within the sidebar interface, enabling users to switch between light and dark mode. When the user interacts with the toggle button, the theme state is updated accordingly.

## Code Highlighting
- The sidebar application automatically highlights code snippets shared in the chat, improving their readability. Here's an overview of the code highlighting feature:

- Syntax Highlighting Rules: The code highlighting feature relies on a mapping of language keywords and their corresponding CSS classes. These rules are defined in the syntaxHighlightingRules object, allowing for customization and support for different programming languages or syntaxes.

- Checking for Code Snippets: The application checks if a message is a code snippet by using the isCodeSnippet function. It looks for messages that start with // or triple backticks to identify code snippets.

- Highlighting Code Syntax: The highlightCode function applies syntax highlighting to code snippets. It uses regular expressions to match keywords in the code, separates comments from the code, and applies custom styling using HTML <span> elements with corresponding CSS classes. The resulting code with syntax highlighting can be rendered within the chat interface.
