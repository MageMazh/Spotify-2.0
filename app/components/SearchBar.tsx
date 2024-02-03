import React from "react";
import { getAccessToken, getSearchItems } from "../api/spotifyApi";

function SearchBar({
  searchInput,
  setSearchInput,
  setSearchData,
}: {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  setSearchData: React.Dispatch<React.SetStateAction<any>>;
}) {
  async function updateSearchResults(query: string) {
    const accessToken = await getAccessToken();
    const dataSearch = await getSearchItems(accessToken.access_token, query);

    setSearchData(dataSearch);
  }

  return (
    <section className="flex gap-3 items-center px-4 py-2 bg-white rounded-[500px] w-1/2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M1.12598 10.6517C1.12598 5.5117 5.35198 1.3717 10.533 1.3717C15.713 1.3717 19.94 5.5117 19.94 10.6517C19.942 12.7724 19.2079 14.828 17.863 16.4677L22.207 20.8117C22.3891 21.0003 22.4899 21.2529 22.4877 21.5151C22.4854 21.7773 22.3802 22.0281 22.1948 22.2135C22.0094 22.3989 21.7586 22.5041 21.4964 22.5064C21.2342 22.5087 20.9816 22.4079 20.793 22.2257L16.44 17.8727C14.7615 19.2091 12.6785 19.9348 10.533 19.9307C5.35298 19.9307 1.12598 15.7917 1.12598 10.6517ZM10.533 3.3717C6.42798 3.3717 3.12598 6.6457 3.12598 10.6517C3.12598 14.6577 6.42798 17.9307 10.533 17.9307C14.638 17.9307 17.94 14.6577 17.94 10.6507C17.94 6.6457 14.638 3.3717 10.533 3.3717Z"
          fill="black"
        />
      </svg>
      <input
        type="text"
        value={searchInput}
        onChange={async (e) => {
          setSearchInput(e.target.value);
          updateSearchResults(e.target.value);
        }}
        placeholder="What do you want to listen to?"
        className="text-black placeholder:text-[#757575] text-sm w-full border-none outline-none"
      />
    </section>
  );
}

export default SearchBar;
