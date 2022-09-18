import { useMutation } from "@apollo/client";
import { Menu } from "@headlessui/react";

import { RemoveIcon, ForwardIcon } from "assets/icons";
import { Dropdown } from "components/Dropdown";
import { UPDATE_MESSAGE } from "graphql/messages";

export const MessageDropdown = ({ triggerButton, id, isSender }) => {
  const [updateMessage] = useMutation(UPDATE_MESSAGE);

  const hideMessage = () => {
    updateMessage({
      variables: {
        input: {
          _id: id,
          isHidden: true,
        },
      },
    });
  };

  return (
    <Dropdown triggerButton={triggerButton}>
      <div className="text-slate-200">
        <Menu.Item>
          <button className="font-semibold group flex w-full items-center rounded px-3 py-2 text-sm opacity-40 cursor-not-allowed">
            <img src={ForwardIcon} alt="Forward" className="w-4 h-4 mr-3" />
            Forward
          </button>
        </Menu.Item>
        {isSender && (
          <Menu.Item>
            <button
              className="font-semibold group flex w-full items-center rounded px-3 py-2 text-sm hover:bg-slate-500"
              onClick={hideMessage}
            >
              <img src={RemoveIcon} alt="Remove" className="w-4 h-4 mr-3" />
              Delete
            </button>
          </Menu.Item>
        )}
      </div>
    </Dropdown>
  );
};
