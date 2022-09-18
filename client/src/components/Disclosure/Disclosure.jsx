import { Disclosure as HUDisclosure } from "@headlessui/react";

import { ArrowDownIcon, ArrowForwardIcon } from "assets/icons";

const Disclosure = ({ icon, title, children }) => {
  return (
    <HUDisclosure>
      {({ open }) => (
        <>
          <HUDisclosure.Button className="flex w-full justify-between items-center rounded bg-slate-600 px-4 py-3 mb-2 text-left text-sm font-semibold text-slate-200">
            <div className="flex items-center">
              {icon}
              <span className="mx-1">{title}</span>
            </div>
            <img
              src={open ? ArrowDownIcon : ArrowForwardIcon}
              alt="Arrow Forward"
              className="w-5 h-5"
            />
          </HUDisclosure.Button>
          <HUDisclosure.Panel className="bg-slate-500 rounded px-4 pt-3 pb-2 -mt-0.5 mb-2.5 text-[13px] text-slate-200">
            {children}
          </HUDisclosure.Panel>
        </>
      )}
    </HUDisclosure>
  );
};

export default Disclosure;
