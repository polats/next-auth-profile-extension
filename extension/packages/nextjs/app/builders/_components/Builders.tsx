import { BuildersList } from "./BuildersList";
import { SignInBtn } from "./SignInBtn";
import { getServerSession } from "next-auth";
import { getAllBuilders } from "~~/services/database/repositories/builders";
import { authOptions } from "~~/utils/auth";

export const Builders = async () => {
  const builders = await getAllBuilders();
  const session = await getServerSession(authOptions);

  return (
    <>
      {
        <div className="text-center">
          <div className="p-2">
            {!session?.user ? (
              <>
                <span className="block text-l mb-2">Sign in with Ethereum to register as a builder</span>
                <span>
                  <SignInBtn />
                </span>
              </>
            ) : (
              <div>
                <strong>Current Session: </strong>
                {JSON.stringify(session)}
              </div>
            )}
          </div>
        </div>
      }
      <div className="p-2">
        <BuildersList builders={builders} />
      </div>
    </>
  );
};
