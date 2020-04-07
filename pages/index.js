import Head from "next/head";
import db from "../lib/db";

async function loadBands() {
  return new Promise((resolve, reject) => {
    db.query("SELECT * from bands", function (error, results, fields) {
      if (error) throw error;
      resolve(JSON.parse(JSON.stringify(results)));
    });
  });
}

export async function getServerSideProps({ req, query }) {
  const bands = await loadBands();

  return {
    props: {
      bands,
    },
  };
}

const Home = ({ bands }) => {
  return (
    <div className="container">
      <Head>
        <title>Shit Hot Records Historical Archives</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Shit Hot Records Historical Archives</h1>
        <ul>
          {bands.map((band) => (
            <li>
              <a href={`/artist/${band.id}`}>{band.name}</a>
            </li>
          ))}
        </ul>
      </main>

      <footer></footer>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 20px;
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
};

export default Home;
