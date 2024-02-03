import React, { useEffect, useState } from "react";
import { getAccessToken, getFeaturedPlaylists } from "../api/spotifyApi";
import Image from "next/image";
import { Playlist } from "@/globalTypes";
import Link from "next/link";

function FeaturedPlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const playlistsData = await getFeaturedPlaylists(
          accessToken.access_token
        );
        setPlaylists(playlistsData.playlists.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col h-screen overflow-y-scroll">
      <h2 className="font-bold text-lg text-white px-8 py-4">
        Featured Playlists
      </h2>
      <section className="grid grid-cols-4 gap-6 px-8 pb-8">
        {playlists.map((item, index) => {
          const src = `${item?.images[0]?.url}`;

          return (
            <Link
              href={`/playlist/${item.id}`}
              key={index}
              className="cursor-pointer rounded-lg relative bg-neutral-800 hover:bg-neutral-600 p-4 group"
            >
              <div className=" bg-green-500 rounded-full flex items-center justify-center w-10 h-10 absolute top-[175px] group-hover:top-[160px] left-[10rem] z-10 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200">
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
                className="w-48 h-48 mb-4 rounded text-white"
                loader={() => src}
                src={src}
                width={48}
                height={48}
                alt="Deskripsi Gambar"
              />
              <p
                title={item.description}
                className="text-base font-bold text-white mb-1 w-48 truncate"
              >
                {item.description}
              </p>
              <p className="text-sm text-neutral-400 mb-8 w-48 truncate">
                By {item.owner.display_name}
              </p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

export default FeaturedPlaylists;
