const SidebarItem = ({ icon, isActive }) => {
  return isActive ? (
    <div className='bg-slate-500 p-2 my-5 rounded cursor-pointer'>{icon}</div>
  ) : (
    <div className='p-2 my-5 cursor-pointer'>{icon}</div>
  );
};

export default SidebarItem;
