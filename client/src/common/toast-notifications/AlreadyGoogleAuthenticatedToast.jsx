import { HiX } from "react-icons/hi";

export function AlreadyGoogleAuthenticatedToast({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-70" />
      <div className="relative flex flex-col gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-50 max-w-sm w-full">
        <div className="items-center justify-between">
          <div className=" items-center">
            <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-400 mb-4">
              You can only log in once with Google. <br /> After that, your
              username and password will be sent to your email.
            </p>
          </div>
          <div className="text-center items-center">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
              aria-label="Close"
            >
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 dark:bg-red-800 text-red-500 dark:text-red-200">
                <HiX className="h-5 w-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
