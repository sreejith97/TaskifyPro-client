import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
        404 - Page Not Found
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-lg text-center sm:text-xl">
        Sorry, we couldn’t find the page you’re looking for. Please check the
        URL or return to the homepage.
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 sm:px-8 sm:py-4"
      >
        Go Home
      </Link>
    </div>
  );
}
