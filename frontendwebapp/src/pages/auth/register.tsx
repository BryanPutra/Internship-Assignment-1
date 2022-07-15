import * as React from "react";
import { useState } from "react";
import Image from "next/image";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AlternateEmail,
  Lock,
  AccountCircle,
  GppGood,
} from "@mui/icons-material";
import MainContainer from "components/containers/MainContainer";
import imageLogo from "../../../public/assets/images/register.png";
import AuthInput from "components/inputs/AuthInput";
import AuthTitle from "components/titles/AuthTitle";
import Link from "next/link";
import ButtonInText from "components/buttons/ButtonInText";
import SubmitButton from "components/buttons/SubmitButton";

interface IRegisterFormInputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required().min(6).max(15),
  password: yup.string().min(5).max(20).required(),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Password do not match"),
});

const Register: React.FunctionComponent = () => {
  const methods = useForm<IRegisterFormInputs>({
    resolver: yupResolver(schema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const onRegisterPressed: SubmitHandler<IRegisterFormInputs> = async (
    data: IRegisterFormInputs
  ) => {
    setIsLoading(true);
    await console.log(data);
    setIsLoading(false);
  };

  const errors = methods.formState.errors;
  return (
    <MainContainer containerType="primary">
      <Image
        src={imageLogo}
        alt="Register Pic"
        layout="responsive"
        blurDataURL="URL"
      />
      <AuthTitle text="Register" textSize="text-4xl" />
      <FormProvider {...methods}>
        <form
          className="flex flex-col"
          onSubmit={methods.handleSubmit(onRegisterPressed)}
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
            name="username"
            type="text"
            label="Username"
            icon={AccountCircle}
            errors={errors.username}
            errorString={
              (errors.username ? errors.username?.message : "")?.toString()!
            }
          />
          <AuthInput
            name="password"
            type="password"
            label="Password"
            icon={Lock}
            errors={errors.password}
            errorString={
              (errors.password ? errors.password?.message : "")?.toString()!
            }
          />
          <AuthInput
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            icon={GppGood}
            errors={errors.confirmPassword}
            errorString={
              (errors.confirmPassword
                ? errors.confirmPassword?.message
                : ""
              )?.toString()!
            }
          />
          <div className="flex flex-wrap pt-3 mb-3">
            <div className="text-textDarkGrey whitespace-pre">
              {"By registering, we assumed you have agreed to our "}
            </div>
            <Link href="/terms">
              <a>
                <ButtonInText
                  type="secondary"
                  content="Terms & Conditions"
                  putEnd={false}
                  color="pink"
                />
              </a>
            </Link>
          </div>
          <SubmitButton name="Sign up" isLoading={isLoading} />
        </form>
        <div className="flex flex-wrap pt-3">
          <div className="text-textDarkGrey whitespace-pre">
            {"Already have an account? "}
          </div>
          <Link href="/auth/login">
            <a>
              <ButtonInText
                type="secondary"
                content="Login here"
                putEnd={false}
                color="pink"
              />
            </a>
          </Link>
        </div>
      </FormProvider>
    </MainContainer>
  );
};

export default Register;
