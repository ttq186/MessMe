import { useState } from "react";
import "tippy.js/dist/tippy.css";
import { useMutation, useQuery } from "@apollo/client";

import { CancelIcon, OptionIcon, AvatarIcon } from "assets/icons";
import {
  ProfileDropdown,
  ProfileDisclosure,
} from "pages/Dashboard/DashboardProfile";
import { GET_CURRENT_USER, UPDATE_USER } from "graphql/users";

export const DashboardProfile = ({
  isOpenFriendProfile,
  setOpenFriendProfile,
}) => {
  const [isEditableIntro, setEditableIntro] = useState(false);
  const {
    data: { currentUser },
  } = useQuery(GET_CURRENT_USER);
  const [updateCurrentUser] = useMutation(UPDATE_USER);
  const [description, setDescription] = useState(currentUser.description);

  const handleCancelClick = () => {
    setEditableIntro(false);
    setDescription(currentUser.description);
  };

  const handleSubmitClick = () => {
    setEditableIntro(false);
    updateCurrentUser({
      variables: {
        input: {
          id: currentUser.id,
          description,
        },
      },
    });
  };

  return (
    <>
      <div className="p-6 pb-[9.2px] border-b-[1px] border-slate-600">
        {!isOpenFriendProfile ? (
          <div className="flex justify-between">
            <p className="text-2xl font-bold">My Profile</p>
            <ProfileDropdown
              setEditableIntro={setEditableIntro}
              triggerButton={<OptionIcon width="32px" />}
            />
          </div>
        ) : (
          <div
            className="flex justify-end cursor-pointer my-3"
            onClick={() => setOpenFriendProfile(false)}
          >
            <CancelIcon width="22px" height="22px" />
          </div>
        )}
        <div className="flex flex-col items-center mt-6 mb-3">
          {!currentUser.avatarUrl ? (
            <AvatarIcon width="130px" height="112px" />
          ) : (
            <img
              src={currentUser.avatarUrl}
              alt="Avatar"
              className="w-28 h-28 rounded-full border-4 border-slate-600"
            />
          )}
          <p className="font-semibold mt-4">
            {currentUser.username || currentUser.email.split("@")[0]}
          </p>
        </div>
      </div>

      <article className="pt-3 pb-0 px-7">
        <h2 className="font-bold text-xl mb-3">Intro</h2>
        {!isEditableIntro ? (
          <div className="ml-2 pl-3 border-l-4 border-slate-400">
            <p className="text-slate-300 font-semibold text-sm">
              {currentUser.description}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-end text-slate-400 px-4">
            <textarea
              placeholder="Describe something about you"
              className="text-sm py-3 px-5 w-full font-semibold rounded bg-gray-600 text-slate-200 outline-none h-28"
              defaultValue={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <div className="text-[13px] mt-3">
              <button
                className="bg-slate-200 text-slate-700 font-semibold py-1 px-2 rounded-[3px] hover:opacity-90"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                className="bg-slate-500 text-slate-200 font-semibold py-1 px-2 rounded-[3px] ml-2 hover:opacity-90"
                onClick={handleSubmitClick}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </article>

      <div className="overflow-y-scroll pl-5 pr-2 mt-5 mb-2 mr-1.5 scrollbar-transparent hover:scrollbar">
        <div className="rounded p-2 pb-0 font-semibold">
          <ProfileDisclosure />
        </div>
      </div>
    </>
  );
};
