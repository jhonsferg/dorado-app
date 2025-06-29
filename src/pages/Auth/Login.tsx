import { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuthNavigation } from "@/hooks/useAuthNavigation.ts";
import { useAuth } from "@/hooks/useAuth.ts";
import Input from "@/components/ui/Input.tsx";
import Button from "@/components/ui/Button.tsx";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Usar el hook separado que tiene useNavigate
  const { login } = useAuthNavigation();
  const { isLoading } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData);
      // La navegación se maneja automáticamente en useAuthNavigation
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-2">🍗</h1>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Pollería El Dorado
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ingresa a tu cuenta para continuar
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <Input
                id="username"
                name="username"
                type="text"
                required
                label="Usuario"
                value={formData.username}
                onChange={handleChange}
                placeholder="Ingresa tu usuario"
              />
            </div>

            <div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  label="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center top-6"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center"
                loading={isLoading}
                disabled={!formData.username || !formData.password}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
