import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../../components/Header";

function signIn({ providers }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center text-center">
        <img className="scale-90" src="/logo.svg" alt="" />
        <p className="font-xs italic -mt-5">
            This is not a <span className="text-red-500">real</span> app, it is built for fun and educational purposes.
        </p>
        <div className="mt-5">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-500 rounded-lg text-white"
                onClick={() => SignIntoProvider(provider.id, {callbackUrl: '/'})}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default signIn;
