# React Web Messenger

A simple web messenger implemented with React.

# Live Demo

Check out the live demo at
[https://chat-vercel-snowy.vercel.app](https://chat-vercel-snowy.vercel.app)

# Developing

- I am currently developing a Progressive Web Application (PWA) with support for
  offline notifications using service workers. The test demo version includes
  the following features:
- Send/Receive FCM Notifications: You can send and receive Firebase Cloud
  Messaging (FCM) notifications on the last authenticated device where you
  logged into your account.
- Offline Notification Support: You will receive notifications even when you are
  offline, thanks to the service worker.
- FCM Delivery Disclaimer: Please note that FCM does not guarantee that
  notifications will always be delivered to your device.
- Browser Permissions: You will not receive notifications if you block access to
  notifications in your browser settings.
- Text Messages Only (Temporary): Currently, only text messages are handled by FCM.

## Overview

React Web Messenger is a lightweight tool for real-time messaging built on the
React library, with Firebase used as the backend (free version). The chat
provides a convenient interface for user interaction and includes basic
messenger functionalities.

## Main Features

- **Real-time interaction:** Engage with other users in real-time.
- **Simple and intuitive interface:** User-friendly and easy-to-use interface.
- **React:** Implemented using the React library for efficient state management
  of components.

### Messenger Features:

- Registration using a phone number (Firebase phone authentication).
- Ability to replace the profile photo; by default, an avatar with your initials
  will be automatically generated.
- Ability to change the profile name.
- Change chat theme (Light/Dark).
- Change chat language (English/Ukrainian/Russian).
- Interaction with other users in real-time.
- Convenient and intuitive user interface.
- Search for already registered users to create a chat.
- User status (online/offline, typing status in the current chat).
- Message sending (also indicating whether a message has been read or unread,
  both in the sidebar and in the chat).
- The count of unread messages is displayed in the sidebar of the chat.
- Ability to send files and photos in the chat.
- View photos in each message separately in a slider (using
  yet-another-react-lightbox).
- Record audio messages.
- Ability to select multiple messages using a context menu for copying text
  content and deleting messages.
- Search for messages in the chat (case-sensitive).
- Emoji support for text messages in the chat.
- Reactions to messages.
- Modify the Browser Tab Title and Icon upon Receiving a New Unread Message.
- Cloud Messaging Notifications: Develop notifications using service workers for
  offline notification delivery (currently in development).

## Requirements

Before getting started, make sure you have:

- Node.js
- npm or Yarn

## Installation:

1. Clone the project repository.
2. Run the command `npm install` to install the necessary dependencies.
3. Create a .env.local file in the root directory of the project and define the
   environment variables following the descriptions provided in .env.example.
4. Execute `npm run dev` to start the project.
5. Open a web browser and go to
   [http://localhost:5173/react-web-messenger](http://localhost:5173/react-web-messenger)
   to view the application.
