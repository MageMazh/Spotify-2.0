"use client";
import React, { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import { getAccessToken, getUserPlaylists } from "../api/spotifyApi";
import { Playlist } from "@/globalTypes";

const Sidebar = () => {
  const [userPlaylists, setUserPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await getAccessToken();
        const playlists = await getUserPlaylists(accessToken.access_token);
        setUserPlaylists(playlists.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="w-1/5 h-screen overflow-y-scroll sticky top-0 bg-black font-bold text-neutral-400">
      <section className="flex px-6 py-6 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="131"
          height="41"
          viewBox="0 0 131 41"
          fill="none"
        >
          <path
            d="M0.924316 20.6155C0.924316 31.2434 9.70386 40.0229 20.3317 40.0229C30.9596 40.0229 39.7391 31.2434 39.7391 20.6155C39.7391 9.98763 30.9596 1.32361 20.3317 1.32361C9.70386 1.32361 0.924316 9.98763 0.924316 20.6155ZM27.494 29.6261C22.9887 26.8536 17.2127 26.1605 10.5125 27.6622C8.89522 27.8933 8.66418 25.5829 10.0504 25.3518C17.4437 23.619 23.6818 24.4277 28.7647 27.5467C30.0354 28.3554 28.7647 30.3192 27.494 29.6261ZM29.4578 24.4277C24.2594 21.1931 16.2885 20.2689 10.1659 22.1173C8.20209 22.6949 7.50897 19.6913 9.3573 19.2293C16.404 17.1499 25.0681 18.1896 31.0751 21.8862C32.6924 22.9259 31.0751 25.4673 29.4578 24.4277ZM9.24178 16.2257C7.27793 16.9188 6.00721 13.5688 8.20209 12.7601C15.0178 10.6808 26.5698 11.0273 33.7321 15.3016C35.6959 16.3412 33.8476 19.5758 31.7682 18.4206C25.5301 14.724 15.1333 14.3774 9.24178 16.2257ZM53.024 26.7381C51.0601 26.7381 49.2118 26.0449 47.5945 24.4277C47.479 24.4277 47.479 24.5432 47.479 24.5432L45.6307 26.7381C45.5151 26.8536 45.5151 26.9691 45.6307 27.0846C47.71 28.933 50.2515 29.8571 53.024 29.8571C56.9516 29.8571 59.3776 27.6622 59.3776 24.4277C59.3776 21.6552 57.6448 20.1534 53.6016 19.1137C50.2515 18.3051 49.6739 17.7275 49.6739 16.5723C49.6739 15.4171 50.8291 14.724 52.3308 14.724C53.8326 14.724 55.2188 15.3016 56.8361 16.4568C56.8361 16.4568 56.9516 16.5723 57.0672 16.5723C57.1827 16.5723 57.1827 16.4568 57.1827 16.4568L58.8 14.1464C58.9155 14.0308 58.9155 14.0308 58.8 13.9153C56.9516 12.4136 54.7568 11.6049 52.3308 11.6049C48.7497 11.6049 46.2083 13.7998 46.2083 16.9188C46.2083 20.2689 48.5187 21.3086 52.2153 22.2328C55.4499 22.9259 55.912 23.619 55.912 24.7742C55.912 26.0449 54.7568 26.7381 53.024 26.7381ZM63.9984 17.843V16.3412C63.9984 16.2257 63.8829 16.1102 63.7673 16.1102H60.7638C60.6483 16.1102 60.5328 16.2257 60.5328 16.3412V33.3227C60.5328 33.4382 60.6483 33.5538 60.7638 33.5538H63.7673C63.8829 33.5538 63.9984 33.4382 63.9984 33.3227V28.0088C65.1536 29.2795 66.4243 29.8571 68.1571 29.8571C71.2762 29.8571 74.3952 27.4312 74.3952 22.8104C74.3952 18.1896 71.2762 15.8792 68.1571 15.8792C66.4243 15.8792 65.1536 16.4568 63.9984 17.843ZM67.464 26.8536C65.3846 26.8536 63.8829 25.1208 63.8829 22.8104C63.8829 20.5 65.3846 18.8827 67.464 18.8827C69.5434 18.8827 70.9296 20.5 70.9296 22.8104C70.9296 25.1208 69.5434 26.8536 67.464 26.8536ZM75.3194 22.9259C75.3194 26.8536 78.4384 29.8571 82.4816 29.8571C86.5248 29.8571 89.6439 26.7381 89.6439 22.8104C89.6439 18.8827 86.6404 15.8792 82.5972 15.8792C78.5539 15.8792 75.3194 18.9982 75.3194 22.9259ZM78.785 22.8104C78.785 20.5 80.2867 18.8827 82.4816 18.8827C84.6765 18.8827 86.2938 20.6155 86.2938 22.9259C86.2938 25.2363 84.792 26.8536 82.5972 26.8536C80.4023 26.8536 78.785 25.1208 78.785 22.8104ZM94.9578 16.1102V12.7601C94.9578 12.6446 94.9578 12.5291 94.8423 12.5291H91.8388C91.7233 12.5291 91.6077 12.6446 91.6077 12.7601V16.1102H90.106C89.9904 16.1102 89.8749 16.2257 89.8749 16.3412V18.8827C89.8749 18.9982 89.9904 19.1137 90.106 19.1137H91.6077V25.8139C91.6077 28.4709 92.8785 29.8571 95.5354 29.8571C96.5751 29.8571 97.6148 29.6261 98.4234 29.164C98.5389 29.164 98.5389 29.0485 98.5389 28.933V26.507C98.5389 26.3915 98.5389 26.276 98.4234 26.276H98.1924C97.6148 26.6226 96.9217 26.7381 96.3441 26.7381C95.4199 26.7381 94.9578 26.276 94.9578 25.3518V19.1137H98.4234C98.5389 19.1137 98.6545 18.9982 98.6545 18.8827V16.3412C98.6545 16.2257 98.5389 16.1102 98.4234 16.1102H94.9578ZM109.86 15.7636C109.86 14.4929 110.322 14.0308 111.362 14.0308C111.939 14.0308 112.517 14.0308 113.095 14.2619H113.21C113.21 14.2619 113.326 14.1464 113.326 14.0308V11.6049C113.326 11.4894 113.326 11.3739 113.21 11.3739C112.632 11.1428 111.824 11.0273 110.669 11.0273C107.896 11.0273 106.51 12.6446 106.51 15.5326V16.1102H105.008C104.893 16.1102 104.777 16.2257 104.777 16.3412V18.8827C104.777 18.9982 104.893 19.1137 105.008 19.1137H106.51V29.395C106.51 29.5106 106.625 29.6261 106.741 29.6261H109.744C109.86 29.6261 109.86 29.5106 109.86 29.395V19.1137H112.748L117.022 29.395C116.56 30.4347 116.098 30.6658 115.405 30.6658C114.827 30.6658 114.25 30.5502 113.672 30.2037H113.557L113.441 30.3192L112.401 32.5141C112.401 32.6296 112.401 32.8606 112.517 32.8606C113.557 33.4382 114.481 33.6693 115.636 33.6693C117.831 33.6693 119.102 32.6296 120.141 29.8571L125.34 16.4568V16.2257C125.34 16.1102 125.224 16.1102 125.109 16.1102H121.99C121.874 16.1102 121.874 16.2257 121.874 16.3412L118.639 25.3518L115.174 16.3412C115.174 16.2257 115.058 16.1102 114.943 16.1102H109.86V15.7636ZM100.272 16.1102C100.156 16.1102 100.041 16.2257 100.041 16.3412V29.395C100.041 29.5106 100.156 29.6261 100.272 29.6261H103.275C103.391 29.6261 103.391 29.5106 103.391 29.395V16.3412C103.391 16.2257 103.391 16.1102 103.275 16.1102H100.272ZM99.5786 12.298C99.5786 13.4532 100.618 14.4929 101.774 14.4929C102.929 14.4929 103.853 13.4532 103.853 12.298C103.853 11.1428 102.929 10.2187 101.774 10.2187C100.618 10.2187 99.5786 11.1428 99.5786 12.298ZM127.881 20.2689C129.036 20.2689 130.076 19.3448 130.076 18.1896C130.076 17.0344 129.036 16.1102 127.881 16.1102C126.726 16.1102 125.802 17.0344 125.802 18.1896C125.802 19.3448 126.726 20.2689 127.881 20.2689ZM127.881 16.3412C128.921 16.3412 129.845 17.1499 129.845 18.1896C129.845 19.2293 128.921 20.0379 127.881 20.0379C126.841 20.0379 126.033 19.2293 126.033 18.1896C126.033 17.1499 126.841 16.3412 127.881 16.3412ZM128.343 18.4206C128.69 18.3051 128.921 18.074 128.921 17.7275C128.921 17.2654 128.459 17.0344 127.997 17.0344H127.072V19.2293H127.535V18.5361H127.997L128.459 19.2293H129.036L128.343 18.4206ZM127.997 17.3809C128.228 17.3809 128.459 17.4964 128.459 17.7275C128.459 17.9585 128.228 18.074 127.997 18.074H127.535V17.3809H127.997Z"
            fill="white"
          />
        </svg>
      </section>
      <section className="flex flex-col gap-4 px-6 pb-6">
        <Link href="/" className="flex gap-4 group">
          <IoHomeOutline
            size="24"
            className={`fill-white group-hover:text-white transition duration-150 ${
              location.pathname === "/" ? "text-white" : ""
            }`}
          />
          <h2
            className={`group-hover:text-white transition duration-150 ${
              location.pathname === "/" ? "text-white" : ""
            }`}
          >
            Home
          </h2>
        </Link>
        <Link href="/search" className="flex gap-4 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            className={`group-hover:text-white transition duration-150 ${
              location.pathname === "/search" ? "text-white" : ""
            }`}
            fill="none"
          >
            <path
              d="M15.356 10.6517C15.356 13.2747 13.196 15.4017 10.533 15.4017C7.86898 15.4017 5.70898 13.2747 5.70898 10.6517C5.70898 8.02873 7.86898 5.90173 10.533 5.90173C13.197 5.90173 15.356 8.02873 15.356 10.6517Z"
              className={`${
                location.pathname === "/search" ? "inline" : "hidden"
              }`}
              fill="white"
            />
            <path
              d="M1.12598 10.6517C1.12598 5.5117 5.35198 1.3717 10.533 1.3717C15.713 1.3717 19.94 5.5117 19.94 10.6517C19.942 12.7724 19.2079 14.828 17.863 16.4677L22.207 20.8117C22.3891 21.0003 22.4899 21.2529 22.4877 21.5151C22.4854 21.7773 22.3802 22.0281 22.1948 22.2135C22.0094 22.3989 21.7586 22.5041 21.4964 22.5064C21.2342 22.5087 20.9816 22.4079 20.793 22.2257L16.44 17.8727C14.7615 19.2091 12.6785 19.9348 10.533 19.9307C5.35298 19.9307 1.12598 15.7917 1.12598 10.6517ZM10.533 3.3717C6.42798 3.3717 3.12598 6.6457 3.12598 10.6517C3.12598 14.6577 6.42798 17.9307 10.533 17.9307C14.638 17.9307 17.94 14.6577 17.94 10.6507C17.94 6.6457 14.638 3.3717 10.533 3.3717Z"
              className={`group-hover:fill-white transition duration-150 ${
                location.pathname === "/search" ? "text-white fill-white" : ""
              }`}
              fill="#B3B3B3"
            />
          </svg>
          <h2
            className={`group-hover:text-white transition duration-150 ${
              location.pathname === "/search" ? "text-white" : ""
            }`}
          >
            Search
          </h2>
        </Link>
        <Link href="/library" className="flex gap-4 group">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 20 21"
            fill="red"
          >
            <path
              d="M12.5 0.22775C12.652 0.139982 12.8245 0.0937755 13 0.0937755C13.1755 0.0937755 13.348 0.139982 13.5 0.22775L19.5 3.69175C19.652 3.77952 19.7782 3.90575 19.866 4.05776C19.9538 4.20978 20 4.38222 20 4.55775V19.0938C20 19.359 19.8946 19.6133 19.7071 19.8009C19.5196 19.9884 19.2652 20.0938 19 20.0938H13C12.7348 20.0938 12.4804 19.9884 12.2929 19.8009C12.1054 19.6133 12 19.359 12 19.0938V1.09375C12 0.918218 12.0462 0.745779 12.134 0.593764C12.2217 0.44175 12.348 0.315516 12.5 0.22775ZM14 2.82575V18.0938H18V5.13475L14 2.82575ZM1 20.0938C0.734784 20.0938 0.48043 19.9884 0.292893 19.8009C0.105357 19.6133 0 19.359 0 19.0938V1.09375C0 0.828534 0.105357 0.57418 0.292893 0.386643C0.48043 0.199107 0.734784 0.09375 1 0.09375C1.26522 0.09375 1.51957 0.199107 1.70711 0.386643C1.89464 0.57418 2 0.828534 2 1.09375V19.0938C2 19.359 1.89464 19.6133 1.70711 19.8009C1.51957 19.9884 1.26522 20.0938 1 20.0938ZM7 20.0938C6.73478 20.0938 6.48043 19.9884 6.29289 19.8009C6.10536 19.6133 6 19.359 6 19.0938V1.09375C6 0.828534 6.10536 0.57418 6.29289 0.386643C6.48043 0.199107 6.73478 0.09375 7 0.09375C7.26522 0.09375 7.51957 0.199107 7.70711 0.386643C7.89464 0.57418 8 0.828534 8 1.09375V19.0938C8 19.359 7.89464 19.6133 7.70711 19.8009C7.51957 19.9884 7.26522 20.0938 7 20.0938Z"
              fill="#B3B3B3"
              className={`group-hover:fill-white transition duration-150 ${
                location.pathname === "/library" ? "fill-white" : ""
              }`}
            />
          </svg>
          <h2
            className={`group-hover:text-white transition duration-150 ${
              location.pathname === "/library" ? "text-white" : ""
            }`}
          >
            Your Library
          </h2>
        </Link>
      </section>

      <section className="flex flex-col gap-4 px-6 pb-6">
        <div className="flex gap-4 items-center group cursor-pointer">
          <div className="rounded-sm bg-slate-300 w-6 h-6 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
            >
              <path
                d="M11.4375 6.09375C11.4375 6.24293 11.3782 6.38601 11.2727 6.4915C11.1673 6.59699 11.0242 6.65625 10.875 6.65625H6.5625V10.9688C6.5625 11.1179 6.50324 11.261 6.39775 11.3665C6.29226 11.472 6.14918 11.5312 6 11.5312C5.85082 11.5312 5.70774 11.472 5.60225 11.3665C5.49676 11.261 5.4375 11.1179 5.4375 10.9688V6.65625H1.125C0.975816 6.65625 0.832742 6.59699 0.727252 6.4915C0.621763 6.38601 0.5625 6.24293 0.5625 6.09375C0.5625 5.94457 0.621763 5.80149 0.727252 5.696C0.832742 5.59051 0.975816 5.53125 1.125 5.53125H5.4375V1.21875C5.4375 1.06957 5.49676 0.926492 5.60225 0.821002C5.70774 0.715513 5.85082 0.65625 6 0.65625C6.14918 0.65625 6.29226 0.715513 6.39775 0.821002C6.50324 0.926492 6.5625 1.06957 6.5625 1.21875V5.53125H10.875C11.0242 5.53125 11.1673 5.59051 11.2727 5.696C11.3782 5.80149 11.4375 5.94457 11.4375 6.09375Z"
                fill="black"
              />
            </svg>
          </div>
          <h2 className={`group-hover:text-white transition duration-150`}>
            Create Playlist
          </h2>
        </div>
        <div className="flex gap-4 items-center group cursor-pointer">
          <div className="rounded-sm opacity-70 bg-gradient-to-r from-purple-700 to-green-300 w-6 h-6 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
            >
              <path
                d="M11.7931 3.25878C11.6635 2.61423 11.3406 2.02449 10.8673 1.56812C10.3941 1.11175 9.79297 0.810421 9.14415 0.704277C8.65666 0.626568 8.15781 0.662632 7.68657 0.80965C7.21533 0.956669 6.78447 1.21066 6.42765 1.55178C6.3115 1.65979 6.15876 1.71984 6.00015 1.71984C5.84153 1.71984 5.6888 1.65979 5.57265 1.55178C4.98022 0.978758 4.18976 0.656082 3.36556 0.650822C2.54137 0.645562 1.74685 0.958123 1.14716 1.52353C0.547467 2.08894 0.188732 2.86371 0.145523 3.68679C0.102314 4.50986 0.377954 5.31793 0.915149 5.94303L5.35215 11.2305C5.43156 11.325 5.53068 11.401 5.64256 11.4531C5.75443 11.5052 5.87636 11.5322 5.99977 11.5322C6.12319 11.5322 6.24512 11.5052 6.35699 11.4531C6.46887 11.401 6.56799 11.325 6.6474 11.2305L11.0844 5.94303C11.3982 5.57883 11.625 5.14806 11.7478 4.68329C11.8706 4.21852 11.8861 3.73192 11.7931 3.26028V3.25878Z"
                fill="white"
              />
            </svg>
          </div>
          <h2 className={`group-hover:text-white transition duration-150`}>
            Liked Songs
          </h2>
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-4 px-6 pb-6">
          {userPlaylists.map((item, index) => (
            <Link
              href={`/playlist/${item.id}`}
              key={index}
              title={item.name}
              className="text-sm text-neutral-400 w-full truncate hover:text-white transition duration-150 cursor-pointer"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Sidebar;