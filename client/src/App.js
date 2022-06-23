import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  Dashboard,
  ForgotPassword,
  NotFound,
  ResetPassword,
  SignIn,
  SignUp,
  Home,
} from 'pages';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='sign-in' element={<SignIn />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
