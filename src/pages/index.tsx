import { getSession, getAccessToken } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

import Link from "next/link";
import { GetServerSidePropsContext } from "next";

interface IndexProps {
  accessToken: string;
  idToken: string;
  user: any;
}

export default function Index({ accessToken, idToken, user }: IndexProps) {
  const router = useRouter();

  return (
    <div className="relative flex h-screen bg-blue-50">
      <div className="relative flex flex-col flex-1 h-full max-h-full overflow-y-scroll">
        <header className="sticky top-0 flex items-center flex-shrink-0 w-full h-full bg-opacity-100 bg-blue-50 max-h-14 px-2 lg:px-5">
          <div className="flex items-center justify-between flex-1">
            <a
              href="#"
              className="flex-shrink-0 text-2xl font-bold tracking-widest text-blue-800 uppercase"
            >
              Petsee
            </a>

            <nav className="relative flex items-center justify-end flex-1">
              <ul className="flex items-center justify-center  space-x-2 ">
                <li className="relative">
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ zIndex: -1 }}
                  >
                    <span className="block w-5 h-5 bg-red-600 rounded-full animate-ping"></span>
                  </div>
                  <a
                    href="https://github.com/petsee-co"
                    target="_blank"
                    className="inline-flex p-2 bg-blue-200 rounded-full bg-opacity-20 hover:bg-blue-300 hover:bg-opacity-20"
                    style={{ backdropFilter: "blur(14px)" }}
                  >
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>
                </li>
                <li>
                  <button
                    className="p-px border-2 border-blue-100 rounded-full w-11 h-11"
                    type="button"
                    onClick={() => {
                      router.push("/api/auth/logout");
                    }}
                  >
                    <img
                      className="block object-cover rounded-full"
                      src={user.picture}
                      alt={user.name}
                    />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <div className="flex flex-col flex-1 max-h-full pl-2 pr-2 rounded-md xl:pr-4">
          <main className="flex-1 pt-2">
            <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
              <div className="flex p-4 w-full min-h-48 bg-white rounded-md shadow-md flex-col">
                <span className="text-sm font-bold text-gray-900 uppercase">
                  access token
                </span>
                <div className="text-gray-900 break-all	mt-2">{accessToken}</div>
              </div>
              <div className="flex p-4 w-full min-h-48 bg-white rounded-md shadow-md flex-col">
                <span className="text-sm font-bold text-gray-900 uppercase">
                  id token
                </span>
                <div className="text-gray-900 break-all	mt-2">{idToken}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx.req, ctx.res);
  const { user, accessToken, idToken } = session!;

  const { accessToken: accessToken2 } = await getAccessToken(ctx.req, ctx.res);

  console.log("accessToken - 1", accessToken);
  console.log("accessToken - 2", accessToken2);

  return { props: { accessToken, idToken, user } };
}
