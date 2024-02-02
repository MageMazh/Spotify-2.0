import Navbar from "./components/Navbar";
import NewReleases from "./components/NewReleases";
import Sidebar from "./components/Sidebar";
import User from "./components/User";
import UserPlaylists from "./components/UserPlaylists";

export default function Home() {
  const currentHour = new Date().getHours();

  return (
    <main className="flex min-h-screen w-screen bg-gradient-to-b from-[#383838] to-black">
      <Sidebar />
      <section className="flex flex-col sticky top-0 w-full">
        <Navbar>
          <User />
        </Navbar>
        <div className="px-8 pb-4">
          <h1 className="py-4 text-3xl font-bold text-white">
            {currentHour >= 5 && currentHour < 12
              ? "Good Morning"
              : currentHour >= 12 && currentHour < 18
              ? "Good Afternoon"
              : "Good Evening"}
          </h1>
          <UserPlaylists />
          <h1 className="font-bold text-xl text-white pt-8 pb-4">
            New Release
          </h1>
          <NewReleases />
        </div>
      </section>
    </main>
  );
}
