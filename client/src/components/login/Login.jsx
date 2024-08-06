import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";
import MainLogo from "../../common/logos/MainLogo";
import AppName from "../../common/logos/AppName";
import { validateLogin } from "../../utils/validationFormUtils";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const initialValues = { email: "", password: "" };

export default function Login() {
  const login = useLogin();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const loginHandler = async ({ email, password }) => {
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const { values, changeHandler, submitHandler, errors } = useForm(
    initialValues,
    loginHandler,
    validateLogin
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/authenticated");
    }
  }, []);
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <MainLogo size="24" />
        <br />
        <AppName />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={submitHandler}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  value={values.email}
                  onChange={changeHandler}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={values.password}
                  onChange={changeHandler}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 ease-in-out transform bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 dark:from-blue-400 dark:to-teal-300 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-blue-500"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-700 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
