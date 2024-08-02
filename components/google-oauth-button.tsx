'use client';

import { Button } from './ui/button';
import { Icons } from './icons';

export default function GoogleSignInButton() {
  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() =>
        // signIn('google', { callbackUrl: callbackUrl ?? '/dashboard' })
        (window.location.href =
          'https://accounts.google.com/o/oauth2/v2/auth?client_id=714205574133-jj9akg0m52fodp6i91g0eu5bcli8m0q6.apps.googleusercontent.com&redirect_uri=http://localhost:3000/oauth/google&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20openid')
      }
    >
      <Icons.google className="mr-2 h-4 w-4" />
      Continue with Google
    </Button>
  );
}
