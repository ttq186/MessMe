import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  Dashboard,
  ForgotPassword,
  NotFound,
  ResetPassword,
  SignIn,
  SignUp,
} from 'pages';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
