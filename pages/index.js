import { useEffect } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const redirectToSignIn = function () {
      router.replace("/auth/signin/");
    };

    redirectToSignIn();
  }, [router]);
  return null;
}
