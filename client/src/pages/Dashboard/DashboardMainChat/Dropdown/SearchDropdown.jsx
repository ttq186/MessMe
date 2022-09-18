import { Menu } from "@headlessui/react";

import { Dropdown } from "components/Dropdown";

export const SearchDropdown = ({ triggerButton }) => {
  return (
    <Dropdown
      triggerButton={triggerButton}
      width="w-52"
      top="top-11"
      menuPadding="p-2"
    >
      <Menu.Item disabled={true}>
        <input
          className="w-full bg-slate-600 rounded-[3px] text-[13px] px-2  text-slate-300 outline-none"
          placeholder="Search..."
        />
      </Menu.Item>
    </Dropdown>
  );
};
