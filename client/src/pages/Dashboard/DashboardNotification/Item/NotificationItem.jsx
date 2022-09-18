import { useMutation } from "@apollo/client";
import { AvatarIcon } from "assets/icons";
import {
  DELETE_CONTACT,
  GET_CONTACT_REQUESTS,
  UPDATE_CONTACT,
} from "graphql/contacts";

export const NotificationItem = ({
  id,
  partner,
  invitationMessage,
  createdAt,
}) => {
  const [deleteContact] = useMutation(DELETE_CONTACT, {
    refetchQueries: [
      {
        query: GET_CONTACT_REQUESTS,
      },
    ],
  });

  const [updateContact] = useMutation(UPDATE_CONTACT, {
    refetchQueries: [
      {
        query: GET_CONTACT_REQUESTS,
      },
    ],
  });

  const handleAcceptRequest = () => {
    updateContact({
      variables: {
        id,
        input: {
          isEstablished: true,
        },
      },
    });
  };

  const handleRejectRequest = () => {
    deleteContact({
      variables: { id },
    });
  };

  return (
    <div className="p-[14px] py-[10px] mx-3 mb-2.5 opacity-80 bg-slate-500 hover:opacity-100 rounded cursor-pointer transition duration-300 ease-out hover:ease-in">
      <div className="flex items-center">
        {!partner.avatarUrl ? (
          <AvatarIcon width="40px" height="40px" />
        ) : (
          <img
            src={partner.avatarUrl}
            alt="Friend"
            className="w-10 h-10 rounded-full border-2 border-slate-600"
          />
        )}
        <div className="grow ml-1.5">
          <div className="flex justify-between">
            <p className="font-bold">
              {partner.username
                ? partner.username
                : partner.email.split("@")[0]}
            </p>
            <p className="text-[13px] font-bold text-gray-400">
              {createdAt ? new Date(createdAt).toLocaleDateString() : ""}
            </p>
          </div>
        </div>
      </div>
      {!!invitationMessage.trim() && (
        <div className="bg-slate-600 rounded p-2 pr-1 my-1.5">
          <p className="text-sm text-slate-300 max-h-[100px] font-medium overflow-y-scroll scrollbar-transparent hover:scrollbar">
            {invitationMessage}
          </p>
        </div>
      )}
      <div className="text-[13px] mt-2 mb-0.5 flex justify-end">
        <button
          className="bg-slate-200 text-slate-700 font-semibold py-1 px-2 rounded-[3px] opacity-80 hover:opacity-90"
          onClick={handleRejectRequest}
        >
          Reject
        </button>
        <button
          className="bg-slate-700 text-slate-200 font-semibold py-1 px-2 rounded-[3px] ml-2 opacity-80 hover:opacity-90"
          onClick={handleAcceptRequest}
        >
          Accept
        </button>
      </div>
    </div>
  );
};
