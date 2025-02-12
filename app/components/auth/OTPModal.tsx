'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { verifySecret } from '@/lib/actions/user.actions';
import { useRouter } from 'next/navigation';

const OTPModal = ({ email, userId }: { email: string; userId: string }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!otp) {
        setError('OTP cannot be empty');
        return;
      }
      const result = await verifySecret({ id: userId, password: otp });

      if (result) {
        router.push('/');
      } else {
        setError('Failed to verify OTP');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Enter OTP</AlertDialogTitle>
          <AlertDialogDescription>
            We have sent an OTP to {email}. Please enter it below to verify your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && <div className="text-red-500">{error}</div>}
        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={handleSubmit}>
            {loading ? 'Verifying...' : 'Verify'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
