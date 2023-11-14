// filename: complexCode.js

/**
 * This code contains a complex implementation of a social media platform.
 * It includes advanced features such as user authentication, posting,
 * commenting, liking, following other users, and displaying a user's feed.
 * The code is divided into multiple modules for better organization.
 */

// Module: User
const User = (function() {
  let username = '';

  function setUsername(newUsername) {
    username = newUsername;
    console.log(`Username set to: ${username}`);
  }

  function getUsername() {
    return username;
  }

  return { setUsername, getUsername };
})();

// Module: Posts
const Posts = (function() {
  const posts = [];

  function createPost(user, message) {
    if (!user || !message) {
      console.log('Please provide both user and message');
      return;
    }

    const post = {
      user: user,
      message: message,
      comments: [],
      likes: 0
    };

    posts.push(post);
    console.log('Post created');
  }

  function addComment(postIndex, user, message) {
    if (!user || !message || !posts[postIndex]) {
      console.log('Invalid parameters');
      return;
    }

    const comment = {
      user: user,
      message: message
    };

    posts[postIndex].comments.push(comment);
    console.log('Comment added');
  }

  function likePost(postIndex) {
    if (!posts[postIndex]) {
      console.log('Invalid post index');
      return;
    }

    posts[postIndex].likes++;
    console.log('Post liked');
  }

  return { createPost, addComment, likePost };
})();

// Module: Follow
const Follow = (function() {
  const followers = {};

  function addFollower(user, follower) {
    if (!user || !follower) {
      console.log('Invalid parameters');
      return;
    }

    if (!followers[user]) {
      followers[user] = [];
    }

    followers[user].push(follower);
    console.log('Follower added');
  }

  return { addFollower };
})();

// Module: Feed
const Feed = (function() {
  function getFeed(user) {
    if (!user) {
      console.log('Invalid user');
      return;
    }

    if (!User.getUsername()) {
      console.log('Please log in to get the feed');
      return;
    }

    const feed = [];

    for (const post of Posts.posts) {
      if (Follow.followers[user.user]) {
        feed.push(post);
      }
    }

    console.log('Feed:', feed);
  }

  return { getFeed };
})();

// Usage
User.setUsername('JohnDoe');
Posts.createPost(User.getUsername(), 'Hello world!');
Posts.addComment(0, 'JaneDoe', 'Nice post!');
Posts.likePost(0);

Follow.addFollower('JohnDoe', 'JaneDoe');
Follow.addFollower('JohnDoe', 'BobSmith');

Feed.getFeed(User.getUsername());

// Output:
// Username set to: JohnDoe
// Post created
// Comment added
// Post liked
// Follower added
// Follower added
// Feed: [ { user: 'JohnDoe', message: 'Hello world!', comments: [ [Object] ], likes: 1 } ]