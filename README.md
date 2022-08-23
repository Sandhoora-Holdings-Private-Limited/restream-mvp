This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


----------

## Type Script snipet generation 

### Supported languages (file extensions)
TypeScript (.ts)
TypeScript React (.tsx)

### Snippets
Below is a list of all available snippets and the triggers of each one. The ⇥ means the TAB key.

Trigger	Content
tsrcc→	class component skeleton
tsrcfull→	class component skeleton with Props, State, and constructor
tsrcjc→	class component skeleton without import and default export lines
tsrpcc→	class purecomponent skeleton
tsrpcjc→	class purecomponent without import and default export lines
tsrpfc	pure function component skeleton
tsdrpfc	stateless functional component with default export
tsrsfc	stateless functional component
conc→	class default constructor with props and context
cwm→	componentWillMount method
ren→	render method
cdm→	componentDidMount method
cwrp→	componentWillReceiveProps method
scu→	shouldComponentUpdate method
cwu→	componentWillUpdate method
cdu→	componentDidUpdate method
cwum→	componentWillUnmount method
gdsfp→	getDerivedStateFromProps method
gsbu	getSnapshotBeforeUpdate method
sst→	this.setState with object as parameter
bnd→	binds the this of method inside the constructor
met→	simple method
tscntr→	react redux container skeleton
imt	create a import

https://www.npmjs.com/package/react-typescript-component-generator


### Generate React Stateless Component
$ grc statelessComponent <componentName>
# or 
$ grc s <componentName>

### Generate React Class Component
$ grc classComponent <componentName>
# or 
$ grc c <componentName>

### Generate React Redux Container Component
$ grc containerComponent <componentName>
# or 
$ grc r <componentName>


npm run dev
npm run dev\http://localhost:3000

npx next -h

Static generation and server-side rendering of pages/
Static file serving through public/ which is mapped to the base URL (/)

In Next.js, a page is a React Component exported from a .js, .jsx, .ts, or .tsx file in the pages directory. Each page is associated with a route based on its file name.

## YouTube API
https://developers.google.com/youtube/v3/live/docs/liveStreams#resource


https://restream-mvp.vercel.app/

