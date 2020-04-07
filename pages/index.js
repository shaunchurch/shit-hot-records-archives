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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <a href="/">
          <img src="/shrlogo.png" alt="Shit Hot Records" />
        </a>
        est. 2005
        <h1>Shit Hot Records Historical Archives</h1>
        <ul className="bandlist">
          {bands.map((band) => (
            <li className="band">
              <a href={`/artist/${band.id}`}>{band.name}</a>
            </li>
          ))}
        </ul>
      </main>

      <footer></footer>

      <style jsx>{`
        .bandlist {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        .band {
          margin-bottom: 10px;
          font-size: 22px;
        }
      `}</style>
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
