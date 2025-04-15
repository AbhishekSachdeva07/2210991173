const { fetchUsers, fetchPostsByUser, fetchCommentsByPost } = require('./apiService');

const getTopUsersByComments = async () => {
  const users = await fetchUsers();
  const userCommentCounts = {};

  for (const [id, name] of Object.entries(users)) {
    const posts = await fetchPostsByUser(id);
    let totalComments = 0;

    for (const post of posts) {
      const comments = await fetchCommentsByPost(post.id);
      totalComments += comments.length;
    }

    userCommentCounts[id] = { name, commentCount: totalComments };
  }

  const sorted = Object.values(userCommentCounts).sort((a, b) => b.commentCount - a.commentCount);
  return sorted.slice(0, 5);
};

const getPopularPosts = async () => {
  const users = await fetchUsers();
  const postCommentCounts = [];

  for (const id of Object.keys(users)) {
    const posts = await fetchPostsByUser(id);

    for (const post of posts) {
      const comments = await fetchCommentsByPost(post.id);
      postCommentCounts.push({ post, commentCount: comments.length });
    }
  }

  const max = Math.max(...postCommentCounts.map(p => p.commentCount));
  return postCommentCounts.filter(p => p.commentCount === max).map(p => p.post);
};

const getLatestPosts = async () => {
  const users = await fetchUsers();
  let allPosts = [];

  for (const id of Object.keys(users)) {
    const posts = await fetchPostsByUser(id);
    allPosts = allPosts.concat(posts);
  }

  return allPosts.sort((a, b) => b.id - a.id).slice(0, 5); // Assuming 'id' as proxy for newest
};

module.exports = { getTopUsersByComments, getPopularPosts, getLatestPosts };
