const dummy = (blogs) => {
  return 1;
};


const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let maxLikes=0;
  let favBlog;

  blogs.forEach((blog) => {
    if (blog.likes>maxLikes) {
      maxLikes=blog.likes;
      favBlog={
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      };
    }
  });
  return favBlog;
};

const maxBlogs = (blogs) => {
  const mostBlogs = blogs.reduce((main, {author}) => {
    main[author] = main[author] || 0;
    main[author] += 1;
    if (main[author]>main.top) {
      main.top = main[author];
      main.topAuthor = author;
    }
    return main;
  }, {top: 0, topAuthor: ''});
  return {author: mostBlogs.topAuthor, blogs: mostBlogs.top};
};

const maxLikes = (blogs) => {
  const mostLikes = blogs.reduce((main, {author, likes}) => {
    main[author] = main[author] || 0;
    main[author] += likes;
    if (main[author]>main.top) {
      main.top = main[author];
      main.topAuthor = author;
    }
    return main;
  }, {top: 0, topAuthor: ''});
  console.log(mostLikes);
  return {author: mostLikes.topAuthor, likes: mostLikes.top};
};

module.exports={
  dummy,
  totalLikes,
  favoriteBlog,
  maxBlogs,
  maxLikes,
};
