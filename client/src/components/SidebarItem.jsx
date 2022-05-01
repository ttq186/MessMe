import { forwardRef } from 'react';

const SidebarItem = forwardRef(({ icon, isActive }, ref) => {
  return isActive ? (
    <div ref={ref} className='bg-slate-500 p-2 my-5 rounded cursor-pointer'>
      {icon}
    </div>
  ) : (
    <div ref={ref} className='p-2 my-5 cursor-pointer'>
      {icon}
    </div>
  );
});

export default SidebarItem;
