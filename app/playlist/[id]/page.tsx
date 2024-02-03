"use client";
import React, { useEffect, useState } from "react";
import User from "../../components/User";
import Sidebar from "../../components/Sidebar";
import {
  getAccessToken,
  getPlaylistById,
  getPlaylistTrackById,
} from "../../api/spotifyApi";
import Image from "next/image";
import { Playlist, Track } from "@/globalTypes";

function PlaylistPage({ params }: { params: { id: string } }) {
  const [playlist, setPlaylist] = useState({} as Playlist);
  const [songs, setSongs] = useState<Track[]>([]);

  let validIndex = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const playlistsData = await getPlaylistById(
          accessToken.access_token,
          params.id
        );
        const dataTrack = await getPlaylistTrackById(
          accessToken.access_token,
          params.id
        );
        setPlaylist(playlistsData);
        setSongs(dataTrack.items);
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

  function timeAgo(timestamp: any) {
    const previousDate: any = new Date(timestamp);
    const currentDate: any = new Date();

    const timeDifference = currentDate - previousDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return previousDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "jam" : "jam"} yang lalu`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "menit" : "menit"} yang lalu`;
    } else {
      return `${seconds} ${seconds === 1 ? "detik" : "detik"} yang lalu`;
    }
  }

  return (
    <main className="flex min-h-screen w-screen bg-black">
      <Sidebar />
      <section className="flex flex-col w-full h-screen overflow-y-scroll">
        <div className="flex items-center justify-between sticky top-0 bg-transparent w-full h-16 px-8 py-4 z-50">
          <User />
        </div>
        <section className="absolute w-10/12 h-screen overflow-y-scroll">
          <section className="flex items-end gap-4 bg-gradient-to-b from-cyan-500 to-blue-500 px-8 pb-8 h-1/2 relative">
            <div
              className="w-40 h-40 rounded-sm bg-contain bg-center bg-no-repeat flex "
              style={{
                backgroundImage: `url(${
                  playlist.images &&
                  playlist.images[0] &&
                  playlist.images[0].url
                })`,
              }}
            ></div>
            <div>
              <h1 className="font-bold text-base text-white ">Playlist</h1>
              <h1 className="font-extrabold text-5xl text-white ">
                {playlist.name}
              </h1>
            </div>
          </section>

          <section className="flex flex-col px-8 py-8">
            <div
              className="grid grid-cols-5 px-4 justify-items-start"
              style={{ gridTemplateColumns: "1fr 4fr 3fr 3fr 2fr" }}
            >
              <p className="text-neutral-400 text-base">#</p>
              <p className="text-neutral-400 text-base">Title</p>
              <p className="text-neutral-400 text-base">Album</p>
              <p className="text-neutral-400 text-base">Date added</p>
              <p className="text-neutral-400 text-base">duration</p>
            </div>
            {songs.map((song, index) => {
              const src = `${song?.track?.album?.images[0]?.url}`;
              if (
                !song?.track?.album?.name ||
                !song.track?.album?.images?.[0]?.url
              ) {
                // Jika song name atau image url tidak ada, skip rendering
                return null;
              }

              validIndex++;

              return (
                <>
                  <div
                    key={index}
                    className="cursor-default w-full h-16 px-4 rounded-md grid grid-cols-5 justify-items-start content-center hover:bg-neutral-700 group"
                    style={{ gridTemplateColumns: "1fr 4fr 3fr 3fr 2fr" }}
                  >
                    <p className="flex items-center text-sm text-neutral-400">
                      {validIndex}
                    </p>
                    <div className="flex items-center gap-4">
                      <Image
                        className="w-10 h-10 rounded-sm text-white"
                        loader={() => src}
                        src={src}
                        width={40}
                        height={40}
                        alt="Deskripsi Gambar"
                      />
                      <div className="flex flex-col">
                        <p className="text-base text-white truncate w-52">
                          {song.track.artists[0].name}
                        </p>
                        <p
                          title={song?.track?.album?.name}
                          className="text-sm text-neutral-400 group-hover:text-white truncate w-52"
                        >
                          {song?.track?.album?.name}
                        </p>
                      </div>
                    </div>
                    <p
                      title={song?.track?.album?.name}
                      className="text-sm text-neutral-400 group-hover:text-white truncate w-36 my-auto"
                    >
                      {song?.track?.album?.name}
                    </p>

                    <p className="flex items-center justify-center text-sm text-neutral-400 ">
                      {timeAgo(song.added_at)}
                    </p>
                    <p className="flex items-center justify-center text-sm text-neutral-400">
                      {millisToMinutesAndSeconds(song.track.duration_ms)}
                    </p>
                  </div>
                </>
              );
            })}
          </section>
        </section>
      </section>
    </main>
  );
}

export default PlaylistPage;
