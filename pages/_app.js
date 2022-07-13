import Head from "next/head";
import globalStyles from "../styles/global";
import { AnimatePresence } from "framer-motion";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_APOLLO_URI,
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Hackathon 2022</title>
        <meta name="description" content="Hawaiians in Technology and Purple Mai'a Hackathon 2022" />
        <link rel="icon" href="/hammah.png" />
      </Head>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
      <style jsx global>
        {globalStyles}
      </style>
    </ApolloProvider>
  );
}

export default App;
