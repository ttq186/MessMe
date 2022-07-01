import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

const Dropdown = ({
  triggerButton,
  children,
  right = 'right-0',
  top = 'top-8',
  left,
  bottom,
  menuPadding = 'p-3',
  width = 'w-36',
}) => {
  return (
    <div>
      <Menu as='div' className='relative inline-block text-left'>
        <Menu.Button>{triggerButton}</Menu.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items
            className={`${top} ${right} ${left} ${bottom} absolute ${menuPadding} ${width} z-10 rounded bg-slate-600 shadow-lg border-2 border-slate-400`}
          >
            {children}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
