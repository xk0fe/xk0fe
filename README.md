# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Blog System

This website includes a dynamic blog system that reads from markdown files.

### Adding New Blog Posts

1. Create a new `.md` file in `src/posts/`
2. Add frontmatter with required fields:

```markdown
---
title: "Your Post Title"
description: "Brief description of the post"
date: "2024-12-15"
category: "Game Development"
timeToRead: "5 min read"
tags: ["Tag1", "Tag2", "Tag3"]
slug: "your-post-slug"
---

# Your Post Title

Your markdown content goes here...
```

3. Run `npm run generate-blog-data` to update the blog data
4. Your post will be available at `/blog/your-post-slug`

### Blog Post Structure

- **Frontmatter**: YAML metadata at the top of each `.md` file
- **Content**: Standard markdown with support for code blocks, links, images
- **Images**: Place in `src/assets/images/` and reference with relative paths

### Build Process

The blog system uses a build-time generation approach:
- Markdown files in `src/posts/` are the source of truth
- `scripts/generate-blog-data.js` reads these files and generates `src/data/blogPosts.ts`
- The generated file is automatically created during the build process

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
**Note**: This automatically runs `npm run generate-blog-data` first to ensure blog posts are up to date.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run generate-blog-data`

Reads all markdown files from `src/posts/` and generates `src/data/blogPosts.ts` with the blog post data.\
Run this after adding or modifying blog posts in development.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
