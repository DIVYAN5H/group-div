import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modelAtom";

function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="shadow-md border-b bg-[#FDFFFC] sticky top-0 z-50">
      <div className="flex justify-between bg-[#FDFFFC] h-14 max-w-6xl mx-5 lg:mx-auto">
        {/* Left */}
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-64 cursor-pointer"
        >
          <Image
            src="/logo.svg"
            layout="fill"
            objectFit="contain"
            className="scale-125"
          />
        </div>

        <div
          onClick={() => router.push("/")}
          className="relative w-10 lg:hidden flex-shrink-0 cursor-pointer"
        >
          <Image
            src="/logoM.svg"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Middle - Search input field*/}
        {/* <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-500" />
            </div>
            <input
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
              type="text"
              placeholder="Search"
            />
          </div>
        </div> */}

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="navBtn text-[#161925]" />
          {/* <MenuIcon className="h-6 md:hidden cursor-pointer" /> */}

          {session ? (
            <>
              {/* <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div className="absolute -top-1 -right-1 text-xs w-5 h-5 rounded-full bg-red-500 flex items-center justify-center animate-pulse text-white">
                  2
                </div>
              </div> */}
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="navBtn text-[#161925]"
              />
              {/* <UserGroupIcon className="navBtn" /> */}
              {/* <HeartIcon className="navBtn" /> */}
              <img
                src={session.user.image}
                alt="User"
                className="h-12 w-12 rounded-full"
              />
              <button className="text-blue-600 text-s" onClick={signOut}>
                Sign Out
              </button>
            </>
          ) : (
            <button className="text-blue-600 text-s" onClick={signIn}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
