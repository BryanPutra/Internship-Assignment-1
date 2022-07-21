import MainContainer from "components/containers/MainContainer";
import * as React from "react";
import Image from "next/image";
import SimobiLogo from "../../public/assets/images/logoSimobi2.png";
import { useAuth } from "context/authContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import * as routeUtils from "utils/routeUtils";

import {
  MonetizationOn,
  Settings,
  Logout,
  CreditCard,
  Money,
  MoreHoriz,
  Bolt,
  ShoppingBag,
  AccountBalanceWallet,
  SignalCellularAlt,
  VolunteerActivism
} from "@mui/icons-material";
import BalanceCard from "components/cards/BalanceCard";
import CardContainer from "components/cards/CardContainer";
import PayIconButton from "components/buttons/PayIconButton";

interface IMainMenuProps {}

interface IPayIcons {
  name: string;
  color: string;
  bgColor: string;
  icon: JSX.Element;
  linkTo: string;
}

const MainMenu: React.FunctionComponent<IMainMenuProps> = (props) => {
  const { logout, testPostAuth, userDetails } = useAuth();

  const payIcons = [
    {
      name: "OVO",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      icon: <Settings />,
      linkTo: "/pay/".concat(),
    },
    {
      name: "GoPay",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      icon: <AccountBalanceWallet />,
      linkTo: "/pay/".concat(),
    },
    {
      name: "ShopeePay",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      icon: <ShoppingBag />,
      linkTo: "/pay/".concat(),
    },
    {
      name: "Electricity",
      color: "text-orange-200",
      bgColor: "bg-yellow-50",
      icon: <Bolt />,
      linkTo: "/pay/".concat(),
    },
    {
      name: "Mandiri E-toll",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      icon: <CreditCard />,
      linkTo: "/pay/".concat(),
    },
    {
      name: "Donation",
      color: "text-pink",
      bgColor: "bg-lightPink",
      icon: <VolunteerActivism />,
      linkTo: "/pay/".concat(),
    },
    {
      name: "Mobile Data",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      icon: <SignalCellularAlt />,
      linkTo: "/pay/".concat(),
    },
    {
      name: "See more",
      color: "text-pink",
      bgColor: "bg-lightPink",
      icon: <MoreHoriz />,
      linkTo: "/pay/".concat(),
    },
  ];

  // const testPostAuths = async () => {
  //   try {
  //     const response = axios.get(
  //       "https://b776-180-241-243-138.ap.ngrok.io/api/form/home"
  //     );
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //     alert(`Failed to fetch, ${errorUtils.getErrorMessage(err)}`);
  //   }
  // };

  return (
    <MainContainer containerType="secondary">
      {/* top container */}
      <div className="bg-pink text-white h-48 p-5 rounded-b-3xl">
        <div className="flex flex-row items-center">
          <div className="w-1/3">
            <Image src={SimobiLogo} alt="Login Pic" layout="responsive" />
          </div>
          <div className="flex flex-row justify-end w-full gap-3">
            <div onClick={testPostAuth}>
              <Settings />
            </div>
            <div onClick={logout}>
              <Logout />
            </div>
          </div>
        </div>
      </div>

      {/* ownership container */}
      <CardContainer additionalStyles="relative -inset-y-32 -mb-32">
        <div className="flex flex-row justify-between font-semibold">
          <div>Your main balance</div>
          <div className="">Rp.500.000,00</div>
        </div>
        <div className="flex flex-row items-center justify-evenly">
          <BalanceCard
            name="E-Money"
            amount={"1000000"}
            icons={<MonetizationOn />}
          />
          <BalanceCard name="Simas Poin" amount={"500000"} icons={<Money />} />
          <BalanceCard
            name="Cards"
            type="card"
            amount={"1"}
            icons={<CreditCard />}
          />
        </div>
      </CardContainer>

      {/* pay container */}
      <CardContainer>
        <div className="font-semibold">Pay or Top Up</div>
        <div className="flex flex-row flex-wrap items-center justify-between">
          {payIcons.map((payIcon: IPayIcons) => {
            return (
              <PayIconButton
                name={payIcon.name}
                icon={payIcon.icon}
                color={payIcon.color}
                bgColor={payIcon.bgColor}
                linkTo={payIcon.linkTo}
              />
            );
          })}
        </div>
      </CardContainer>

      {/* products container */}
      <CardContainer>
      <div className="font-semibold">Products</div>
      <div></div>

      </CardContainer>

      {/* navigation footer */}
    </MainContainer>
  );
};

export default MainMenu;
