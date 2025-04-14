import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                CEH
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/signin"
              className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; {new Date().getFullYear()} Campus Events Hub. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
