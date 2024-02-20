import { useAuth0 } from "@auth0/auth0-react";
import Logo from "../../components/logo/Logo";
import { useEffect } from "react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  useEffect(() => {
    console.log(window.location.origin);
  });
  return (
    <div className="flex min-h-[100vh] flex-1">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex flex-col items-center">
            <div className="pl-2 py-2 flex items-center gap-1">
              <Logo width={60} />
              <p className=" font-body font-medium text-gray-900 text-3xl">
                CertAssist
              </p>
            </div>
            <h2 className="mt-4 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Not a member?{" "}
              <button
                onClick={() => loginWithRedirect()}
                className="font-semibold text-blue-600 hover:text-blue-500"
              >
                Create an account
              </button>
            </p>
          </div>

          <div className="mt-10">
            <button
              onClick={() => loginWithRedirect()}
              type="submit"
              className="flex w-full justify-center rounded-md bg-button-100 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-button-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-100"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/images/login.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
