import * as React from "react";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';

//local
import creditPlatinum from "../../../public/assets/images/creditplatinum.png";
import creditSecure from "../../../public/assets/images/creditsecure.png";
import MainContainer from "components/containers/MainContainer";
import SectionButton from "components/buttons/SectionButton";
import ChooseProductCard from "components/cards/ChooseProductCard";
import { useMain } from "context/mainContext";

//libs
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface IChooseProductProps {}

interface productInfo {
  productTitle: string;
  productDetails: string;
  imageSrc: StaticImageData;
}

const ChooseProduct: React.FunctionComponent<IChooseProductProps> = (props) => {
  const [creditSelected, setCreditSelected] = useState<boolean>(false);
  const [savingsSelected, setSavingsSelected] = useState<boolean>(false);
  const [loanSelected, setLoanSelected] = useState<boolean>(false);
  const router = useRouter();

  const { productSectionSelected, setProductSectionSelected } = useMain();

  useEffect(() => {
    switch (productSectionSelected) {
      case "credit":
        selectCredit();
        break;
      case "savings":
        selectSavings();
        break;
      case "loan":
        selectLoan();
        break;
    }
  }, [productSectionSelected, router.pathname]);

  const selectCredit = () => {
    setProductSectionSelected('credit');
    setCreditSelected(true);
    setSavingsSelected(false);
    setLoanSelected(false);
  };

  const selectSavings = () => {
    setProductSectionSelected('savings');
    setCreditSelected(false);
    setSavingsSelected(true);
    setLoanSelected(false);
  };

  const selectLoan = () => {
    setProductSectionSelected('loan');
    setCreditSelected(false);
    setSavingsSelected(false);
    setLoanSelected(true);
  };

  const creditInfo: productInfo[] = [
    {
      productTitle: "Platinum Card",
      productDetails: "Pay easier with more benefits",
      imageSrc: creditPlatinum,
    },
    {
      productTitle: "Secure Card",
      productDetails: "Pay easier with benefits",
      imageSrc: creditSecure,
    },
  ];
  const savingsInfo: productInfo[] = [
    {
      productTitle: "Tabungan Simas Payroll",
      productDetails: "Basically kartu debit lol pakai dengan waspada",
      imageSrc: creditPlatinum,
    },
  ];
  const loanInfo: productInfo[] = [
    {
      productTitle: "Beeg Loan",
      productDetails: "Pinjem duit bang kubalikin taun depan",
      imageSrc: creditPlatinum,
    },
  ];
  const productInfo = {
    credit: creditInfo,
    loan: loanInfo,
    savings: savingsInfo,
  };

  return (
    <MainContainer containerType="secondary">
      {/* top container */}
      <div className="flex flex-col items-stretch px-5 py-4 bg-pink text-whiteGrey">
        <div className="flex flex-row gap-5 justify-start items-center">
          <Link href="/mainmenu">
            <a className="">
              <svg className=" w-8 h-8">
                <ArrowBackIcon />
              </svg>
            </a>
          </Link>
          <div className="text-xl font-semibold">Products</div>
        </div>
        <div className="flex flex-row mt-3 gap-2">
          <div onClick={selectCredit}>
            <SectionButton name="Credit Cards" isSelected={creditSelected} />
          </div>
          <div onClick={selectSavings}>
            <SectionButton name="Savings Cards" isSelected={savingsSelected} />
          </div>
          <div onClick={selectLoan}>
            <SectionButton name="Loan" isSelected={loanSelected} />
          </div>
        </div>
      </div>

      {/* main container */}
      <div className="flex flex-col px-5 py-5 items-center gap-5 h-screen">
        {creditSelected &&
          productInfo.credit.map((product: productInfo) => {
            return (
              <ChooseProductCard
                productTitle={product.productTitle}
                productDetails={product.productDetails}
                imageSrc={product.imageSrc}
              />
            );
          })}
        {savingsSelected &&
          productInfo.savings.map((product: productInfo) => {
            return (
              <ChooseProductCard
                productTitle={product.productTitle}
                productDetails={product.productDetails}
                imageSrc={product.imageSrc}
              />
            );
          })}
        {loanSelected &&
          productInfo.loan.map((product: productInfo) => {
            return (
              <ChooseProductCard
                productTitle={product.productTitle}
                productDetails={product.productDetails}
                imageSrc={product.imageSrc}
              />
            );
          })}
      </div>
    </MainContainer>
  );
};

export default ChooseProduct;
