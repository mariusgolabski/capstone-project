import { signIn, signOut, useSession } from "next-auth/react";
import {
  SignedInStatus,
  StyledHeader,
  Avatar,
  StyledHeaderWrapper,
  StyledButton,
} from "./Header.styled";

export default function Header() {
  const { data: session } = useSession();

  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <h2>CurioHead</h2>
        <SignedInStatus>
          {session?.user ? (
            <>
              {session.user.image && <Avatar $imageUrl={session.user.image} />}
              <StyledButton
                href={`/api/auth/signout`}
                onClick={(event) => {
                  event.preventDefault();
                  signOut({ callbackUrl: "http://localhost:3000/auth/signin" });
                }}
              >
                Sign out
              </StyledButton>
            </>
          ) : (
            <StyledButton onClick={() => signIn()}>Sign in</StyledButton>
          )}
        </SignedInStatus>
      </StyledHeader>
    </StyledHeaderWrapper>
  );
}
