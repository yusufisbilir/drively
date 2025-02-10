import { z } from 'zod';

type AuthFormType = 'sign-in' | 'sign-up';

type Props = {
  type: AuthFormType;
};

const authFormSchema = (formType: AuthFormType) => {
  return z.object({
    email: z.string().email(),
    fullName: formType === 'sign-up' ? z.string().min(2).max(50) : z.string().optional(),
  });
};

const AuthForm = ({ type }: Props) => {
  return <div>authForm</div>;
};

export default AuthForm;
