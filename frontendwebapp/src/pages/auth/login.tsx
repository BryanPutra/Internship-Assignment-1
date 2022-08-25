import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

//local
import MainContainer from "components/containers/MainContainer";
import AuthTitle from "components/titles/AuthTitle";
import Image from "next/image";
import imageLogo from "../../../public/assets/images/login.png";
import AuthInput from "components/inputs/AuthInput";
import ButtonInText from "components/buttons/ButtonInText";
import SubmitButton from "components/buttons/SubmitButton";
import { useAuth } from "context/authContext";

//libs
import * as yup from "yup";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlternateEmail, Lock } from "@mui/icons-material";
import { useMain } from "context/mainContext";

interface ILoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(20).required(),
});

const Login: React.FunctionComponent = () => {
  const { login, authState, setAuthState, testPostAuth, userDetails } = useAuth();
  const methods = useForm<ILoginFormInputs>({ resolver: yupResolver(schema) });
  const errors = methods.formState.errors;
  const [isHeld, setIsHeld] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLoginPressed: SubmitHandler<ILoginFormInputs> = async (
    data: ILoginFormInputs
  ) => {
    setIsLoading(true);
    await login(data);
    setIsLoading(false);
  };

  const loginWithGoogle = () => {};
  
  const bruh = () => {
    setAuthState(true);
    console.log(authState);
    router.replace("/mainmenu");
  }

  const router = useRouter();

  useEffect(() => {
    if (authState) {
      router.back();
      return
    }
    router.prefetch("/mainmenu");
  }, []);

  return (
    <MainContainer containerType="primary">
      <Image src={imageLogo} alt="Login Pic" layout="responsive" />
      <AuthTitle text="Login" textSize="text-4xl" />
      <FormProvider {...methods}>
        <form
          className="flex flex-col"
          onSubmit={methods.handleSubmit(onLoginPressed)}
        >
          <AuthInput
            type="email"
            name="email"
            label="Email ID"
            icon={AlternateEmail}
            errors={errors.email}
            errorString={
              (errors.email ? errors.email?.message : "")?.toString()!
            }
          />
          <AuthInput
            type="password"
            name="password"
            label="Password"
            icon={Lock}
            errors={errors.password}
            errorString={
              (errors.password ? errors.password?.message : "")?.toString()!
            }
          />
          <Link href="/forgot">
            <a className="w-fit flex self-end text-base">
              <ButtonInText
                content="Forgot Password?"
                putEnd={true}
                color="text-pink"
              />
            </a>
          </Link>

          <SubmitButton name="Login" isLoading={isLoading} />
        </form>
      </FormProvider>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row py-3 text-textDarkGrey">
          <div> OR </div>
        </div>
        <button
          onClick={testPostAuth}
          type="button"
          onTouchStart={() => {
            setIsHeld(true);
          }}
          onTouchEnd={() => {
            setIsHeld(false);
          }}
          className={`${isHeld ? "!bg-grey" : "!bg-paleGrey"} font-semibold py-3 flex flex-row text-textDarkGrey w-full rounded-lg shadow-md align-center justify-center`}
        >
          Login with Google
        </button>
        <div className="flex flex-row pt-3">
          <div className="text-textDarkGrey whitespace-pre">
            {"Don't have an account? "}
          </div>
          <Link href="/auth/register">
            <a>
              <ButtonInText
                type="secondary"
                content="Register here"
                putEnd={false}
                color="pink"
              />
            </a>
          </Link>
        </div>
      </div>
    </MainContainer>
  );
};

export default Login;
