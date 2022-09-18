import { Menu } from "@headlessui/react";

import { Dropdown } from "components/Dropdown";

export const SettingDropdown = (props) => {
  return (
    <Dropdown triggerButton={props.children}>
      <Menu.Item>
        <button className="font-semibold flex w-full items-center rounded-[3px] px-4 py-2 hover:bg-slate-500">
          Everyone
        </button>
      </Menu.Item>
      <Menu.Item>
        <button className="font-semibold flex w-full items-center rounded-[3px] px-4 py-2 hover:bg-slate-500">
          Selected
        </button>
      </Menu.Item>
      <Menu.Item>
        <button className="font-semibold flex w-full items-center rounded-[3px] px-4 py-2 hover:bg-slate-500">
          No One
        </button>
      </Menu.Item>
    </Dropdown>
  );
};
