import Head from "next/head";

function Home({ bitcoin, ethereum }) {
  return (
    <div className="container">
      <Head>
        <title>LAOC - Reyes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          <p>LAOC</p>
        </h1>
        <div className="grid">
          <a
            href="https://coinmarketcap.com/currencies/bitcoin/"
            className="card"
          >
            <h3>Bitcoin</h3>
            <p>Find in-depth information about Next.js features and API.</p>
            <p>{bitcoin.sha}</p>
            <p>{bitcoin.commit.author.name}</p>
            <p>{bitcoin.commit.author.email}</p>
            <p>{bitcoin.commit.author.date}</p>
          </a>
          <a
            href="https://coinmarketcap.com/currencies/ethereum/"
            className="card"
          >
            <h3>Ethereum</h3>
            <p>Find in-depth information about Next.js features and API.</p>
            <p>{ethereum.sha}</p>
            <p>{ethereum.commit.author.name}</p>
            <p>{ethereum.commit.author.email}</p>
            <p>{ethereum.commit.author.date}</p>
          </a>
        </div>
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
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

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

export async function getStaticProps() {
  const res_bitcoin = await fetch(
    "https://api.github.com/repos/bitcoin/bitcoin/commits/master"
  );

  const bitcoin = await res_bitcoin.json();

  console.dir(bitcoin);

  const res_ethereum = await fetch(
    "https://api.github.com/repos/ethereum/go-ethereum/commits/master"
  );

  const ethereum = await res_ethereum.json();

  console.dir(ethereum);

  return {
    props: {
      bitcoin,
      ethereum,
    },
  };
}

export default Home;
