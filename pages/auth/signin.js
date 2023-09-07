import { signIn, getProviders, getCsrfToken } from "next-auth/react";
import { useState } from "react";
import Header from "../../components/Header";
import {
  StyledButton,
  StyledDivider,
  StyledHeading,
  StyledInput,
  StyledLabel,
  StyledLogin,
  StyledLoginButton,
  Wrapper,
} from "../../components/SignIn/SignIn.styled";

export default function Signin({ csrfToken, providers }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleFakeLogin() {
    signIn("credentials", { username, password });
  }

  return (
    <>
      <Header />
      <Wrapper>
        <StyledLogin>
          <StyledHeading>Log in to CurioHead</StyledHeading>
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <StyledButton onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
                </StyledButton>
              </div>
            ))}
          <StyledDivider />
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
          <StyledLoginButton onClick={handleFakeLogin}>
            Submit
          </StyledLoginButton>
        </StyledLogin>
      </Wrapper>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      providers,
      csrfToken,
    },
  };
}
