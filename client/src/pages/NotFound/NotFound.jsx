import { MainLayout } from "components/Layout";

export const NotFound = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center font-bold md:flex-row">
        <h1 className="text-6xl mr-4 md:text-9xl">404</h1>
        <p className="text-2xl md:text-4xl">Page Not Found</p>
      </div>
    </MainLayout>
  );
};
