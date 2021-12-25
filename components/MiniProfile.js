import { signOut ,useSession } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="w-16 h-16 rounded-full border border-slate-900 p-[2px]"
        src={session?.user?.image}
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-gray-500">Welcome to <span className="italic text-gray-600">Group</span></h3>
      </div>
      <button onClick={signOut} className="text-blue-600 text-ssm font-semibold">Sign Out</button>
    </div>
  );
}

export default MiniProfile;
