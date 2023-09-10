import useSWR from "swr";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  SignedInStatus,
  StyledHeader,
  Avatar,
  StyledHeaderWrapper,
  StyledButton,
} from "./Header.styled";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(session?.user ? `/api/users/${session.user.id}` : null);

  const signInButton = router.pathname === "/auth/signin";

  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <h2>CurioHead</h2>
        <SignedInStatus>
          <Link href="/jobs">Jobs</Link>
          {isLoading && <p>Loading...</p>}
          {error && <p>An error occurred: {error.message}</p>}
          {session?.user ? (
            <>
              {user?.userProfileImagePath && (
                <Link href="/home">
                  <Avatar $imageUrl={user.userProfileImagePath} />
                </Link>
              )}
              <StyledButton
                on
                // href={`/api/auth/signout`}
                // onClick={(event) => {
                //   event.preventDefault();
                //   signOut(/*{ callbackUrl: "http://localhost:3000/auth/signin" }*/);
                // }}

                href={`/api/auth/signout`}
                onClick={(event) => {
                  event.preventDefault();
                  signOut({ callbackUrl: "/auth/signin" }); // Using relative URL
                }}
              >
                Sign out
              </StyledButton>
            </>
          ) : (
            !isLoading &&
            !signInButton && (
              <StyledButton onClick={() => signIn()}>Sign in</StyledButton>
            )
          )}
        </SignedInStatus>
      </StyledHeader>
    </StyledHeaderWrapper>
  );
}
