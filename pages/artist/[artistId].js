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
        <title>{currentBand.name} | Shit Hot Records Historical Archives</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <a href="/">
          <img src="/shrlogo.png" alt="Shit Hot Records" />
        </a>
        est. 2005
        <h1>Shit Hot Records Historical Archives</h1>
        <h2>
          {currentBand.name} ({currentBand.members})
        </h2>
        <p></p>
        <p>{currentBand.story}</p>
        {currentBand.influence && <p>Inspiration: {currentBand.influence}</p>}
        {currentBand.soundslike && <p>Sounds like: {currentBand.soundslike}</p>}
        <ul className="songlist">
          {songs.map((song) => {
            const fileUrl = `${bucket}artists/${currentBand.id}/${song.id}_hifi.mp3`;
            return (
              <li className="song">
                <a href={fileUrl} className="songname">
                  {song.name}
                </a>

                <br />
                <audio className="player" controls src={fileUrl} />
              </li>
            );
          })}
        </ul>
      </main>

      <footer></footer>
      <style jsx>{`
        .songlist {
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        .song {
          flex-direction: flex-col;
          margin-bottom: 15px;
          align-items: center;
        }
        .songname {
          font-weight: bold;
          margin-right: 10px;
        }
        .player {
          margin-right: 10px;
        }
        .download-link {
          font-size: 12px;
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

export default Band;
