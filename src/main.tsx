import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import 'react-smooth-flow/style.min.css';
import './index.scss';
import Calendar from './routes/Calendar/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Calendar,
  },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);
