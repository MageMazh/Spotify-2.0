import React from "react";
import User from "../components/User";
import Sidebar from "../components/Sidebar";
import UserLibrary from "../components/UserLibrary";
import Navbar from "../components/Navbar";

function Library() {
  return (
    <main className="flex min-h-screen w-screen bg-black">
      <Sidebar />
      <section className="flex flex-col w-full">
        <Navbar>
          <User />
        </Navbar>
        <section>
          <UserLibrary />
        </section>
      </section>
    </main>
  );
}

export default Library;
