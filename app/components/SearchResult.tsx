import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Artist, Playlist, Song } from "@/globalTypes";

function SearchResult({ searchData }: { searchData: any }) {
  if (!searchData) {
    return <p>Loading...</p>;
  }

  const playlists: Playlist[] = searchData?.playlists.items;
  const songs: Song[] = searchData?.tracks.items;
  const artists: Artist[] = searchData?.artists.items;

  const src = `${playlists[0].images[0].url}`;

  function millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return seconds === 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <main className="flex flex-col h-screen overflow-y-scroll px-8 pb-4">
      <section className="grid grid-cols-2 gap-4 py-4">
        <section>
          <h1 className="font-bold text-xl text-white py-4">Top result</h1>
          <Link href={`/playlist/${playlists[0].id}`}>
            <div className="cursor-pointer w-full h-[15.3rem] rounded-lg relative bg-neutral-800 hover:bg-neutral-600 p-4 group">
              <div className=" bg-green-500 rounded-full flex items-center justify-center w-12 h-12 absolute top-[165px] group-hover:top-[155px] right-[1.5rem] z-10 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
                </svg>
              </div>

              <Image
                className="w-28 h-28 mb-4 rounded text-white"
                loader={() => src}
                src={src}
                width={48}
                height={48}
                alt="Deskripsi Gambar"
              />
              <p className="text-2xl text-white font-bold mb-1 w-3/4 truncate">
                {playlists[0].name}
              </p>
              <p className="text-sm text-neutral-400 w-48 truncate">
                Playlist <span className="text-2xl">.</span>{" "}
                <span className="text-white">
                  {" "}
                  {playlists[0].owner.display_name}{" "}
                </span>
              </p>
            </div>
          </Link>
        </section>
        <section>
          <h1 className="font-bold text-xl text-white py-4">Songs</h1>
          <section className="flex flex-col">
            {songs.slice(0, 4).map((song, index) => {
              const src = `${song.album.images[0].url}`;

              return (
                <div
                  key={index}
                  className="cursor-default w-full h-16 px-4 rounded-md flex items-center gap-4 hover:bg-neutral-700"
                >
                  <Image
                    className="w-10 h-10 rounded-sm text-white"
                    loader={() => src}
                    src={src}
                    width={48}
                    height={48}
                    alt="Deskripsi Gambar"
                  />
                  <div>
                    <p className="text-md text-white">{song.name}</p>
                    <p className="text-sm text-neutral-400">
                      {song.artists[0].name}
                    </p>
                  </div>
                  <div className="flex-grow flex items-center justify-end">
                    <p className="text-sm text-neutral-400">
                      {millisToMinutesAndSeconds(song.duration_ms)}
                    </p>
                  </div>
                </div>
              );
            })}
          </section>
        </section>

      </section>
      <section>
        <h1 className="font-bold text-xl text-white py-4">Artist</h1>
        <div className="grid grid-cols-5 gap-4">
          {artists.slice(0, 5).map((artist, index) => {
            const src = `${artist.images[0].url}`;
            return (
              <Link
                key={index}
                className="cursor-pointer rounded-lg relative bg-neutral-800 hover:bg-neutral-600 p-4 h-[16.5rem] group"
                href={`/artist/${artist.id}`}
              >
                <div className=" bg-green-500 rounded-full flex items-center justify-center w-10 h-10 absolute top-[175px] group-hover:top-[140px] left-[7.5rem] z-10 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
                  </svg>
                </div>

                <Image
                  className="w-40 h-40 rounded-full mb-4 text-white"
                  loader={() => src}
                  src={src}
                  width={40}
                  height={40}
                  alt="Deskripsi Gambar"
                />

                <p className="text-base text-white font-bold mb-1 w-40 truncate">
                  {artist.name}
                </p>
                <p className="text-sm text-neutral-400 mb-8 w-40 truncate">
                  {artist.type}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
      <section>
        <h1 className="font-bold text-xl text-white py-4">Playlists</h1>

        <div className="grid grid-cols-5 gap-4">
          {playlists.map((item, index) => {
            const src = `${item.images[0].url}`;

            return (
              <Link
                href={`/playlist/${item.id}`}
                key={index}
                className="cursor-pointer rounded-lg relative bg-neutral-800 hover:bg-neutral-600 p-4 h-[16.5rem] group"
              >
                <div className=" bg-green-500 rounded-full flex items-center justify-center w-10 h-10 absolute top-[175px] group-hover:top-[130px] left-[8rem] z-10 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
                  </svg>
                </div>

                <Image
                  className="w-40 h-40 rounded-sm mb-4 text-white"
                  loader={() => src}
                  src={src}
                  width={40}
                  height={40}
                  alt="Deskripsi Gambar"
                />

                <p
                  title={item.name}
                  className="text-base font-bold text-white mb-1 w-40 truncate"
                >
                  {item.name}
                </p>
                <p className="text-sm text-neutral-400 mb-8 w-40 truncate">
                  By {item.owner.display_name}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default SearchResult;
