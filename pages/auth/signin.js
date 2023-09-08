import { signIn, getProviders } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import {
  StyledButton,
  // StyledDivider,
  StyledError,
  StyledHeading,
  StyledInput,
  StyledLabel,
  StyledLogin,
  // StyledLoginButton,
  Wrapper,
} from "../../components/SignIn/SignIn.styled";

export default function Signin({ providers }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignIn(providerId) {
    let result;
    if (providerId === "credentials") {
      result = await signIn(providerId, {
        username,
        password,
        redirect: false,
      });

      if (result && result.error) {
        setError("Invalid username or password.");
      } else {
        router.push("/home");
      }
    } else {
      result = await signIn(providerId);

      if (result && result.error) {
        setError(result.error);
      }
    }
  }

  return (
    <>
      <Header />
      <Wrapper>
        <StyledLogin>
          <StyledHeading>Log in to CurioHead</StyledHeading>

          {error && <StyledError>{error}</StyledError>}

          {/* <StyledDivider /> */}
          {providers && providers["credentials"] && (
            <>
              <StyledLabel htmlFor="Username">Username</StyledLabel>
              <StyledInput
                id="Username"
                type="text"
                placeholder="testuser"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <StyledLabel htmlFor="Password">Password</StyledLabel>
              <StyledInput
                id="password"
                type="password"
                placeholder="testuser"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </>
          )}

          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <StyledButton onClick={() => handleSignIn(provider.id)}>
                  Sign in with {provider.name}
                </StyledButton>
              </div>
            ))}
        </StyledLogin>
      </Wrapper>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
