import Head from "next/head";
import moment from "moment";
import {
  grommet,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grommet,
} from "grommet";

moment.locale("pt-br");

function Home({ coins, rate_limits }) {
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
          <Grommet theme={grommet}>
            <Box pad="large" gap="medium" height="large" width="medium">
              {coins.map((coin, index) => (
                <Card pad="small" gap="medium" background="light-4" key={index}>
                  <CardHeader>
                    {coin.name} ({coin.symbol})
                  </CardHeader>
                  <CardBody></CardBody>
                  <CardFooter pad="medium">
                    Atualizado {coin.last_updated}
                  </CardFooter>
                </Card>
              ))}
            </Box>
          </Grommet>
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
        <span>
          <p>
            {rate_limits.limit} / {rate_limits.used} / {rate_limits.remaining}
          </p>
        </span>
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

        footer p {
          margin-top: 10px;
          border-top: 1px solid #eaeaea;
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
  const rate_limits = await getRateLimits();

  const res = await fetch("https://laoc.vercel.app/coins.json");

  const data = await res.json();

  const coins = await getInfoOfRepos(data.coins);

  return {
    props: {
      coins,
      rate_limits,
    },
  };
}

async function getRateLimits() {
  const res = await fetch("https://api.github.com/rate_limit", {
    method: "GET",
    headers: { Authorization: "Basic " + process.env.GITHUB_AUTH },
  });

  const rate_limit = await res.json();

  return rate_limit.resources.core;
}

async function getInfoOfRepos(coins) {
  let items = [];

  for (const [idx, coin] of coins.entries()) {
    const res = await fetch(coin.repo, {
      method: "GET",
      headers: { Authorization: "Basic " + process.env.GITHUB_AUTH },
    });

    const coin_res = await res.json();

    items.push({
      index: idx,
      name: coin.name,
      symbol: coin.symbol,
      info: coin.info,
      repo: coin.repo,
      show: coin.show,
      last_updated: moment(coin_res.commit.author.date).fromNow(),
    });
  }

  return items;
}

export default Home;
