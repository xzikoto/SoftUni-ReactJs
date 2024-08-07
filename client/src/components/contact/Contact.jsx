import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import axios from "axios";
import { validateContact } from "../../utils/validationFormUtils";
import { ContactMessageSuccessToast } from "../../common/toast-notifications/ContactMessageSuccessToast";

const initialValues = {
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const createHandler = async (values) => {
    try {
      await axios.post(
        "https://formspree.io/f/xrbzkgnz",
        {
          name: values.subject,
          email: values.email,
          message: values.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setValues(initialValues);
      setShowSuccessToast(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const { values, changeHandler, submitHandler, setValues, errors } = useForm(
    initialValues,
    createHandler,
    validateContact
  );

  return (
    <>
      {showSuccessToast && (
        <ContactMessageSuccessToast
          onClose={() => setShowSuccessToast(false)}
        />
      )}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Blogs Mission? Let us know.
          </p>
          <form onSubmit={submitHandler} className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="devs@blogs.com"
                required
                value={values.email}
                onChange={changeHandler}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required
                value={values.subject}
                onChange={changeHandler}
              />
              {errors.subject && (
                <span className="text-red-500 text-sm">{errors.subject}</span>
              )}
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
                value={values.message}
                onChange={changeHandler}
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-sm">{errors.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
