import { useNavigate } from "react-router-dom";
import { useRegister } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { AlreadyGoogleAuthenticatedToast } from "../../../common/toast-notifications/AlreadyGoogleAuthenticatedToast";
import { GOOGLE_AUTH_URL } from "../../../api/urls/urls";

export default function GoogleLogin() {
  const [googleAccessToken, setGoogleAccessToken] = useState();
  const [isToastVisible, setIsToastVisible] = useState(false);

  const register = useRegister();
  const navigate = useNavigate();

  const googleLoginFunction = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setGoogleAccessToken(codeResponse.access_token);
    },
    onError: (error) => console.error("Google Login Error:", error),
  });

  useEffect(() => {
    if (googleAccessToken) {
      axios
        .get(`${GOOGLE_AUTH_URL}${googleAccessToken}`, {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
            Accept: "application/json",
          },
        })
        .then(async (res) => {
          const password = uuidv4();

          try {
            await register(res.data.email, password, password);
            await axios.post(
              "https://formspree.io/f/xrbzkgnz",
              {
                name: res.data.name,
                email: res.data.email,
                message: `Hello, this is Devs Blogs! Here are your credentials email: ${res.data.email} password: ${password} !`,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            navigate("/blogs");
          } catch (error) {
            setIsToastVisible(true);
          }
        });
    }
  }, [googleAccessToken]);

  const handleToastClose = () => {
    setIsToastVisible(false);
  };

  const handleGoogleLoginClick = (event) => {
    event.preventDefault();
    googleLoginFunction();
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mx-auto"
        onClick={handleGoogleLoginClick}
      >
        <svg
          className="h-6 w-6 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
        >
          <path
            d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
            fill="#FBBC05"
          />
          <path
            d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
            fill="#EB4335"
          />
          <path
            d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
            fill="#34A853"
          />
          <path
            d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
            fill="#4285F4"
          />
        </svg>
        <span>Continue with Google</span>
      </button>

      {isToastVisible && (
        <AlreadyGoogleAuthenticatedToast onClose={handleToastClose} />
      )}
    </>
  );
}
