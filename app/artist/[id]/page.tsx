"use client";
import React, { useEffect, useState } from "react";
import User from "../../components/User";
import Sidebar from "../../components/Sidebar";
import {
  getAccessToken,
  getArtist,
  getArtistTracks,
} from "../../api/spotifyApi";
import Image from "next/image";
import { Artist, Song } from "@/globalTypes";
import Navbar from "@/app/components/Navbar";

function ArtistPage({ params }: { params: { id: string } }) {
  const [artist, setArtist] = useState({} as Artist);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const artistData = await getArtist(accessToken.access_token, params.id);
        const artistTrackData = await getArtistTracks(
          accessToken.access_token,
          params.id
        );
        setArtist(artistData);
        setSongs(artistTrackData.tracks);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchData();
  }, [params.id]);

  function millisToMinutesAndSeconds(millis: number) {
    var minutes = Math.floor(millis / 60000);
    var seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return seconds === 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <main className="flex min-h-screen w-screen bg-black">
      <Sidebar />
      <section className="flex flex-col w-full h-screen overflow-y-scroll">
        <Navbar>
          <User />
        </Navbar>
        <section className="absolute w-10/12 h-screen overflow-y-scroll">
          <div className="flex items-end gap-4 bg-gradient-to-b from-cyan-500 to-blue-500 px-8 pb-8 h-1/2 relative">
            <div
              className="w-40 h-40 rounded-full bg-contain bg-center bg-no-repeat flex "
              style={{
                backgroundImage: `url(${
                  artist.images && artist.images[0] && artist.images[0].url
                })`,
                backgroundSize: "cover",
              }}
            ></div>
            <div>
              <h1 className="font-bold text-base text-white ">Artist</h1>
              <h1 className="font-extrabold text-5xl text-white ">
                {artist.name}
              </h1>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-white px-8 pt-8 pb-4">
            Popular
          </h1>
          <div className="flex flex-col px-8 pb-8">
            {songs.map((song, index) => {
              const src = `${song.album.images[0].url}`;

              return (
                <div
                  key={index}
                  className="cursor-default w-full h-16 px-4 rounded-md flex items-center gap-4 hover:bg-neutral-700"
                >
                  <p className="text-sm text-neutral-400">{index + 1}</p>

                  <Image
                    className="w-10 h-10 rounded-sm text-white"
                    loader={() => src}
                    src={src}
                    width={10}
                    height={10}
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
          </div>
        </section>
      </section>
    </main>
  );
}

export default ArtistPage;
