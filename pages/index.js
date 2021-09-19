import Head from "next/head";

function Home({ data }) {
  return (
    <div className="container">
      <Head>
        <title>LAOC - Reyes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          <p>{data.sha}</p>
          <p>{data.commit.author.name}</p>
          <p>{data.commit.author.email}</p>
          <p>{data.commit.author.date}</p>
        </h1>
      </main>

      <footer>
        <a
          href="https://github.com/rogersilvasouza"
          target="_blank"
          rel="noopener noreferrer"
        >
          Criado por Roger Souza
        </a>
      </footer>

      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "https://api.github.com/repos/bitcoin/bitcoin/commits/master"
  );
  const data = await res.json();

  console.dir(data);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  };
}

export default Home;
