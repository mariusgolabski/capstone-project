import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  SignedInStatus,
  StyledHeader,
  Avatar,
  StyledHeaderWrapper,
  NavItem,
  StyledSignInButton,
  StyledLink,
  DropdownMenu,
  DropdownItem,
  StyledDropDownUserEmail,
} from "./Header.styled";
import Link from "next/link";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const {
    data: user,
    error,
    isLoading,
  } = useSWR(session?.user ? `/api/users/${session.user.id}` : null);

  return (
    <StyledHeaderWrapper>
      <StyledHeader>
        <Link href="/">
          <h2>CurioHead</h2>
        </Link>
        <SignedInStatus>
          <NavItem>
            <StyledLink href="/jobs" $isActive={router.pathname === "/jobs"}>
              Jobs
            </StyledLink>
          </NavItem>
          <NavItem>
            <StyledLink
              href="/leaders"
              $isActive={router.pathname === "/leaders"}
            >
              Leaders
            </StyledLink>
          </NavItem>

          {isLoading && <p>Loading...</p>}
          {error && <p>An error occurred: {error.message}</p>}
          {session?.user ? (
            <>
              {user?.userProfileImagePath && (
                <NavItem>
                  <Avatar
                    $imageUrl={user.userProfileImagePath}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {isDropdownOpen && (
                      <DropdownMenu>
                        <StyledDropDownUserEmail>
                          {user.email}
                        </StyledDropDownUserEmail>
                        <DropdownItem>
                          <StyledLink
                            href="/home"
                            $isActive={router.pathname === "/home"}
                          >
                            Profile
                          </StyledLink>
                        </DropdownItem>
                        <DropdownItem>
                          <StyledSignInButton
                            onClick={() => {
                              setIsDropdownOpen(false);
                              signOut({ callbackUrl: "/auth/signin" });
                            }}
                          >
                            Sign out
                          </StyledSignInButton>
                        </DropdownItem>
                      </DropdownMenu>
                    )}
                  </Avatar>
                  {/* </StyledLink> */}
                </NavItem>
              )}
            </>
          ) : (
            !isLoading && (
              // !signInButton && (
              <NavItem>
                <StyledSignInButton
                  onClick={() => signIn()}
                  $isActive={router.pathname === "/auth/signin"}
                >
                  Sign in
                </StyledSignInButton>
              </NavItem>
            )
            // )
          )}
        </SignedInStatus>
      </StyledHeader>
    </StyledHeaderWrapper>
  );
}
