"use client";
import React, { useEffect, useState } from "react";
import { getAccessToken, getNewReleases } from "../api/spotifyApi";
import Image from "next/image";
import { Album } from "@/globalTypes";

function NewReleases() {
  const [newReleases, setNewReleases] = useState<Album[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const newReleasesData = await getNewReleases(accessToken.access_token);
        setNewReleases(newReleasesData.albums.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="grid grid-cols-5 gap-4">
      {newReleases.map((item, index) => {
        const src = `${item.images[0].url}`;

        return (
          <section
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
              className="w-40 h-40 mb-4 rounded text-white"
              loader={() => src}
              src={src}
              width={40}
              height={40}
              alt="Deskripsi Gambar"
            />
            <p
              title={item.name}
              className="text-base text-white mb-1 w-40 truncate"
            >
              {item.name}
            </p>
            <p className="text-sm text-neutral-400 mb-8 w-40 truncate">
              By {item.artists[0].name}
            </p>
          </section>
        );
      })}
    </main>
  );
}

export default NewReleases;
