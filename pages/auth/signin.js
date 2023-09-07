import { signIn, getCsrfToken, getProviders } from "next-auth/react";
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
} from "./signin.styled";

export default function Signin({ csrfToken, providers }) {
  return (
    <>
      <Header />
      <Wrapper>
        <StyledLogin>
          <StyledHeading>Log in to CurioHead</StyledHeading>
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <StyledButton
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: "http://localhost:3000/home",
                    })
                  }
                >
                  Sign in with {provider.name}
                </StyledButton>
              </div>
            ))}
          <StyledDivider />
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <StyledLabel htmlFor="email">Email</StyledLabel>
          <StyledInput
            id="email"
            type="email"
            placeholder="Enter email address"
            required
          />
          <StyledLabel htmlFor="password">password</StyledLabel>
          <StyledInput
            id="password"
            type="password"
            placeholder="Enter password"
            required
          />
          <StyledLoginButton>Submit</StyledLoginButton>
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
