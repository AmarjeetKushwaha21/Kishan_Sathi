import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiLogIn } from 'react-icons/fi';

import AuthLayout from '@/components/layout/AuthLayout';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { phone: '', password: '' },
  });

  async function onSubmit(data) {
    setServerError(null);
    try {
      await login(data);
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      setServerError(error.message);
    }
  }

  return (
    <AuthLayout
      title="Welcome back, farmer!"
      subtitle="Log in to continue to your farm dashboard."
    >
      <div className="space-y-5">
        <Alert variant="info" title="Demo mode">
          Use phone <strong>9876543210</strong> and password <strong>Sathi@123</strong>.
        </Alert>

        {serverError && <Alert variant="error">{serverError}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Input
            label="Mobile Number"
            placeholder="10-digit mobile number"
            inputMode="numeric"
            required
            autoComplete="tel"
            error={errors.phone?.message}
            {...register('phone', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit mobile number',
              },
            })}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />

          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="focus-ring rounded-md text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={isSubmitting}
            leftIcon={FiLogIn}
          >
            {isSubmitting ? 'Logging in…' : 'Log in'}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600">
          New to Kishan Sathi?{' '}
          <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}