'use client';

import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { loginWithProvider } from '@/services/auth';
import SignInLoader from '@/components/animation/loader/signin';
import { useToast } from '@/components/ui/use-toast';

export default function GoogleCallback() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const { toast } = useToast();
  const provider = params.provider as string;
  const code = searchParams.get('code');
  const handleAuthentication = async (provider: string, code: string) => {
    try {
      const data = await loginWithProvider(provider, code);
      localStorage.setItem('access_token', data.data.access_token);
      localStorage.setItem('refresh_token', data.data.refresh_token);
      router.push('/dashboard'); // 认证成功后重定向到仪表板或主页
    } catch (error) {
      toast({
        title: '授权失败',
        description: '授权失败' + error,
        variant: 'destructive'
      });
      router.push('/signin'); // 认证失败时重定向到登录页面
    }
  };
  if (provider && code) {
    // 发送授权码到后端
    handleAuthentication(provider, code);
  } else {
    router.push('/signin'); // 重定向到登录页面或其他适当的页面
  }

  return (
    <>
      <SignInLoader />
    </>
  );
}
