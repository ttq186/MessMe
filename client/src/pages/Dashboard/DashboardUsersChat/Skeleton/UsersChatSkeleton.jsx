export const UsersChatSkeleton = () => {
  return (
    <div className="rounded-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-500 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="space-y-3">
            <div className="h-2 bg-slate-500 rounded w-1/2"></div>
            <div className="h-2 bg-slate-500 rounded w-11/12"></div>
            <div className="h-2 bg-slate-500 rounded w-11/12"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
