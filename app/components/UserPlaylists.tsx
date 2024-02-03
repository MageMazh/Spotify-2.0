"use client";
import React, { useEffect, useState } from "react";
import { getAccessToken, getUserPlaylists } from "../api/spotifyApi";
import Link from "next/link";
import Image from "next/image";
import { Playlist } from "@/globalTypes";

function UserPlaylists() {
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const playlistsData = await getUserPlaylists(accessToken.access_token);
        setUserPlaylists(playlistsData.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="grid grid-cols-3 gap-4">
      {userPlaylists.slice(0, 6).map((item, index) => {
        const src = `${item?.images[0]?.url}`;

        return (
          <Link
            href={`/playlist/${item.id}`}
            key={index}
            className="flex items-center gap-4 cursor-pointer rounded-lg relative bg-neutral-800 hover:bg-neutral-600 h-16 group"
          >
            <div className=" bg-green-500 rounded-full flex items-center justify-center w-10 h-10 absolute  right-[1rem] z-10 opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200">
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
              className="w-1/5 h-full rounded-l text-white"
              loader={() => src}
              src={src}
              width={48}
              height={48}
              alt="Deskripsi Gambar"
            />
            <p
              title={item.name}
              className="text-base font-semibold text-white mb-1 w-40 truncate"
            >
              {item.name}
            </p>
          </Link>
        );
      })}
    </main>
  );
}

export default UserPlaylists;
