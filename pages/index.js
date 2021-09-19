import Head from "next/head";

function Home({ coins }) {
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
          {coins.map((coin, index) => (
            <a className="card" key={index} href="{coin.coinmarketcap}">
              <h3>
                {coin.name} ({coin.symbol})
              </h3>
              <p>{coin.github}</p>
            </a>
          ))}
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

// export async function getStaticProps() {
//   const res_bitcoin = await fetch(
//     "https://api.github.com/repos/bitcoin/bitcoin/commits/master"
//   );

//   const bitcoin = await res_bitcoin.json();

//   return {
//     props: {
//       bitcoin,
//     },
//   };
// }

export async function getStaticProps() {
  const res = await fetch("https://laoc.vercel.app/coins.json");

  const data = await res.json();

  const coins = data.coins;

  await getRepos(coins);

  return {
    props: {
      coins,
    },
  };
}

async function getRepos(coins) {
  await coins.forEach(async (coin) => {
    const repo = await fetch(coin.repo);
    const res = await repo.json();
    console.log(res.commit.author);
  });
}

export default Home;
