"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import User from "../components/User";
import Sidebar from "../components/Sidebar";
import { getFeaturedPlaylists } from "../api/spotifyApi";
import config from "../api/config";
import FeaturedPlaylists from "../components/FeaturedPlaylists";
import SearchResult from "../components/SearchResult";
import Navbar from "../components/Navbar";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState(null);

  return (
    <main className="flex min-h-screen w-screen bg-black">
      <Sidebar />
      <section className="flex flex-col w-full">
        <Navbar>
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            setSearchData={setSearchData}
          />
          <User />
        </Navbar>
        <div>
          {searchInput === "" ? (
            <FeaturedPlaylists />
          ) : (
            <SearchResult searchData={searchData} />
          )}
        </div>
      </section>
    </main>
  );
}

export default Search;
