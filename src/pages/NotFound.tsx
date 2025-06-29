import { Link } from 'react-router';
import { Search, ArrowLeft } from 'lucide-react';

import { ROUTES } from '@/utils/constants/routes.ts';
import Button from '@/components/ui/Button.tsx';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <Search className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Página no encontrada
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              La página que buscas no existe o ha sido movida.
            </p>
            <div className="mt-6">
              <Link to={ROUTES.DASHBOARD}>
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver al Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
