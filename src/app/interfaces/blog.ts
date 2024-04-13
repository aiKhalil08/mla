interface BlogItem {
    heading: string,
    content: string,
    image_url: string,
    author: string,
    created_at: string,
};

interface Blog {
    heading: string,
    content: string,
    image_url: string,
    author: string,
    created_at: string,
}

interface BlogPost {
    blog: Blog,
    recent_posts: {heading: string}[]
}

interface GetBlogResponse {
    status: string;
    message?: string;
    blog: Blog;
}

interface GetBlogPostResponse {
    status: string;
    message?: string;
    blog: Blog,
    recent_posts: {heading: string}[]
}


export { BlogItem, Blog, BlogPost, GetBlogResponse, GetBlogPostResponse}