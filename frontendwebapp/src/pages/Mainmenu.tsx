import * as React from "react";
import Image from "next/image";
import SimobiLogo from "../../public/assets/images/logoSimobi2.png";
import { useAuth } from "context/authContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Carousel from "nuka-carousel";
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
  VolunteerActivism,
} from "@mui/icons-material";

import MainContainer from "components/containers/MainContainer";
import BalanceCard from "components/cards/BalanceCard";
import CardContainer from "components/cards/CardContainer";
import PayIconButton from "components/buttons/PayIconButton";
import CardDetail from "components/details/CardDetail";
import SavingsCard from "components/cards/SavingsCard";
import MainMenuTitle from "components/titles/MainMenuTitle";
import ProductCard from "components/cards/ProductCard";

import { useMain } from "context/mainContext";
import { useHistory } from "context/historyContext";

interface IMainMenuProps {}

interface IPayIcons {
  name: string;
  color: string;
  bgColor: string;
  icon: JSX.Element;
  linkTo: string;
}

// interface DefaultControlsConfig {

// }

const MainMenu: React.FunctionComponent<IMainMenuProps> = (props) => {
  const { logout, testPostAuth, userDetails } = useAuth();
  const { history } = useHistory();
  const {
    setProductSectionSelected,
    setCurrentPage,
    currentPage,
    prevPage,
    setPrevPage,
  } = useMain();

  useEffect(() => {
    setCurrentPage("mainmenu");
    console.log(currentPage);
    // console.log(userDetails);
    // setCurrentPage(history[history.length - 1]);
    // setPrevPage(history[history.length - 2]);
    // console.log(currentPage);
    // console.log(prevPage);
  }, []);

  const printCurrentPage = () => {
    console.log(history.length - 1);
    console.log(history.length - 2);
    console.log(currentPage);
    console.log(prevPage);
    console.log(history);
  };

  const productList = [
    {
      productName: "Credit Card",
      color: "black",
      // function setCreditCardPressed on product section
      // on Link clicked, perform the above function
    },
    {
      productName: "Savings",
      color: "",
      // function setCreditCardPressed on product section
      // on Link clicked, perform the above function
    },
    {
      productName: "Loan",
      color: "lightBlue",
      // function setCreditCardPressed on product section
      // on Link clicked, perform the above function
    },
  ];

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

  return (
    <MainContainer containerType="secondary">
      {/* top container */}
      <div className="bg-pink text-white h-48 p-5 rounded-b-3xl">
        <div className="flex flex-row items-center">
          <div className="w-1/3">
            <Image src={SimobiLogo} alt="Login Pic" layout="responsive" />
          </div>
          <div className="flex flex-row justify-end w-full gap-3">
            <div onClick={printCurrentPage}>
              <Settings />
            </div>
            <div onClick={logout}>
              <Logout />
            </div>
          </div>
        </div>
      </div>

      {/* ownership container */}
      <CardContainer additionalStyles="relative -inset-y-32 -mb-28">
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
        <MainMenuTitle name="Pay or Top Up" />
        <div className="flex flex-row flex-wrap items-baseline justify-between">
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
      <CardContainer additionalStyles=" pb-10">
        <MainMenuTitle name="Products" />
        <div></div>
        <Carousel
          slidesToShow={1}
          disableEdgeSwiping={true}
          defaultControlsConfig={{
            containerClassName: "carouselContainer",
            nextButtonStyle: { display: "none" },
            prevButtonStyle: { display: "none" },
            pagingDotsStyle: { marginLeft: 8, fill: "pink" },
            pagingDotsContainerClassName: "pagingDots",
          }}
        >
          {productList.map((product) => {
            return (
              <div
                onClick={() => {
                  switch (product.productName) {
                    case "Credit Card":
                      setProductSectionSelected("credit");
                      break;
                    case "Savings":
                      setProductSectionSelected("savings");
                      break;
                    case "Loan":
                      setProductSectionSelected("loan");
                      break;
                  }
                }}
              >
                <ProductCard
                  productName={product.productName}
                  color={product.color}
                />
              </div>
            );
          })}
        </Carousel>
        {/* <CardDetail /> */}
      </CardContainer>
      <CardContainer>
        <MainMenuTitle name="Hellow" />

        <div></div>
        <SavingsCard />
        <CardDetail />
      </CardContainer>

      {/* navigation footer */}
    </MainContainer>
  );
};

export default MainMenu;
