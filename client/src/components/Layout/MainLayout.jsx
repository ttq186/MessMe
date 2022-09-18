import { Link } from "react-router-dom";

import { MessMeIcon } from "assets/icons";

export const MainLayout = ({ children }) => {
  return (
    <div className="bg-gray-700">
      <div className="container flex flex-col items-center min-h-screen max-w-md mx-auto text-slate-200">
        <div className="mt-[11vh]">
          <Link to="/" className="mb-10 flex">
            <MessMeIcon />
            <span className="text-2xl ml-1 font-bold">MessMe</span>
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
};
