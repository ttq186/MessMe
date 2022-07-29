# <img src="https://user-images.githubusercontent.com/73225256/179389251-128d4555-52bc-48b3-8d54-b720963e4597.png" width='40px'> **MessMe**

### **A full-featured chat app, built with FastAPI/Strawberry and ReactJS/ApolloClient**

### Click here for [live demo](https://messme.ttq186.dev)
https://user-images.githubusercontent.com/73225256/179389289-92c0ef8a-92c1-4502-910c-2c84b229a31e.mp4

## Description
- **MessMe** is an opportunity for me to enhance my programming skills and experiment with some new technologies that I've learnt recently (e.g. Strawberry, Apollo Client, Redis, WebSocket, WebRTC) as well.

## Features
- [x] Authentication by normal approach or via Google (JWT token is stored in HttpOnly cookie)
- [x] One-to-one chat
- [x] Friend adding
- [x] Notifications for new messages, friend requests
- [x] Users suggestions
- [x] User's profile update
- [ ] File attaching
- [ ] Audio calling
- [ ] Video calling
- [ ] Typing indicator
- [ ] Online/Offline indicator
- [ ] Group chat

## Tech stack
- **Front-end**
    - **ReactJS**
    - **Apollo Client** - GraphQL client & state management
    - **TailwindCSS**
- **Back-end**
    - **FastAPI**
    - **Strawberry** - builds GraphQL server
    - **Async SQLAlchemy**
- **Databases**
    - **PostgreSQL** - stores main data
    - **MongoDB** - stores messages
    - **Redis** - caching & pub/sub

## Disclaimer
- **MessMe** is designed to work well with laptop screens, so the UI may not be suitable on other screens.

## Credits
- The UI design is inspired by [ChatVia](http://chatvia-dark.react.themesbrand.com/)
