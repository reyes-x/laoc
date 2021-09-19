import Head from "next/head";

function Home({ coins, items }) {
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
          {items.map((coin, index) => (
            <a className="card" key={index} href="{coin.coinmarketcap}">
              <h3>
                {coin.name} ({coin.symbol})
              </h3>
              <p>{coin.github}</p>
              <p>{coin.last_updated}</p>
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
  // console.dir(new Date(1632058452 * 1000));

  const res = await fetch("https://laoc.vercel.app/coins.json");

  const data = await res.json();

  const coins = data.coins;

  const items = await getInfoOfRepos(coins);

  return {
    props: {
      coins,
      items,
    },
  };
}

async function getInfoOfRepos(coins) {
  let items = [];

  for (const [idx, coin] of coins.entries()) {
    const res = await fetch(coin.repo);

    const coin_res = await res.json();

    console.dir(coin_res);

    items.push({
      name: coin.name,
      symbol: coin.symbol,
      info: coin.info,
      repo: coin.repo,
      show: coin.show,
      // last_updated: coin_res.commit.author.date,
    });
  }

  console.log("Finished!");

  return items;
}

export default Home;
