import { useState } from 'react';
import { Auth } from './Login';
import api from '../services/api';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const [d, setD] = useState({
    email: '',
  });

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/auth/forgot-password', d);

      toast.success(
        'If the email exists, reset instructions were generated.'
      );
    } catch (e) {
      toast.error('Request failed');
    }
  };

  return (
    <Auth
      title="Reset your password"
      subtitle="Enter your email to request a reset link."
      submit={submit}
      d={d}
      setD={setD}
      action="Send reset link"
    />
  );
}