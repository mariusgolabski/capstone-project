import { signIn, getProviders } from "next-auth/react";
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

export default function Signin({ providers }) {
  return (
    <>
      <Header />
      <Wrapper>
        <StyledLogin>
          <StyledHeading>Log in to CurioHead</StyledHeading>
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <StyledButton onClick={() => signIn()}>
                  Sign in with {provider.name}
                </StyledButton>
              </div>
            ))}
          <StyledDivider />
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
