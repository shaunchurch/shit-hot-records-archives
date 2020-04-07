import Head from "next/head";
import db from "../../lib/db";
import { bucket } from "../../config";

async function loadBandSongs(id) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * from songs where band_id=" + id, function (
      error,
      results,
      fields
    ) {
      if (error) throw error;

      resolve(JSON.parse(JSON.stringify(results)));
    });
  });
}

async function loadBand(id) {
  return new Promise((resolve, reject) => {
    db.query("SELECT * from bands where id=" + id, function (
      error,
      results,
      fields
    ) {
      if (error) throw error;

      resolve(JSON.parse(JSON.stringify(results)));
    });
  });
}

export async function getServerSideProps({ req, query }) {
  const songs = await loadBandSongs(query.artistId);
  const band = await loadBand(query.artistId);

  return {
    props: {
      songs,
      band,
    },
  };
}

const Band = ({ songs, band }) => {
  const currentBand = band[0];
  return (
    <div className="container">
      <Head>
        <title>Shit Hot Records Historical Archives</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Shit Hot Records Historical Archives</h1>
        <h2>{currentBand.name}</h2>
        <ul>
          {songs.map((song) => {
            const fileUrl = `${bucket}artists/${currentBand.id}/${song.id}_hifi.mp3`;
            return (
              <li>
                <a href={fileUrl}>{song.name}</a>
                <br />
                <audio controls src={fileUrl} />
              </li>
            );
          })}
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

export default Band;
