# Final Project Proposal

## description
- My final project will be a twitter-style app where users can post public messages and private messages, and upload content.

## basic features
- Public messaging
  - users can post public messages with text and content. These posts can be seen by any other user and can be commented on and liked
- private messaging
  - only the recipient(s) of a private message can see and participate in a conversation. Conversations can be left at any time, and anyone can invite another user to the conversation. Current conversations will be listed under a tab viewable only by that user in the user's profile
- uploading content
  - content will be able to be included in the user's messages

## APIs
- I do not anticipate using third-party APIs, but do expect to use built-in browser functionalities such as file uploading

## Data Modeling
- User
  - {
    "username": "aNewUser",
    "password": "mypassword",
    "likedPosts": "[someOtherId, aThirdId]"
  }
  - a user's credentials will be verified with Kinvey. Signing up will therefore be required first
- Users
  - a collection of users that are stored in the Kinvey endpoint
- Message
  - {
    "author": "aNewUser",
    "text": "this is a new post I made. Here are a few photos",
    "content": "[image1, image2, image3]",
    "privacy": "public",
    "likes": "20",
    "id": "someId"
  }
  - a message will be attributed to the author, and contains text/other content. It keeps track of how many likes it has, and has an id for the user to add to its "likedPosts" to limit to 1 like from a user
- Messages
  - a collection of messages

## Routes
- login
  - the starting point of the application
- feed
  - after signing up/logging in, the user is taken to a page where they see a feed of public posts
- profile/:id
  - a specific user's profile to view
  - from a user's own profile, they can access the public feed and their private conversations
- convo/:group
  - specifies what conversation the user is participating in
  - can return to public feed or own profile
  - clicking on another user's name in the conversation takes user to their profile
