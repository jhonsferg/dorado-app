import { createRoot } from 'react-dom/client';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import formatter from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/es';
import './tailwind.css';
import './index.scss';
import App from './App.tsx';

dayjs.extend(tz);
dayjs.extend(utc);
dayjs.extend(formatter);

dayjs.locale('es');

createRoot(document.getElementById('root')!).render(<App />);
