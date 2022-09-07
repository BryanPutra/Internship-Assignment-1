interface IInputFormsRequestSubmitForm {
  id: string;
  username: string;
  email: string;
  roles: string[];
  productCode: string;
  currentPage: string;
  prevPage: string;
  isBack: boolean;
  isSubmit: boolean;
  inputData: IFormData1 | IFormData2 | IPhotoData;
  autofillData: {};
}

interface IAutoFillMap {
  ktpId?: string;
  ktpName?: string;
  birthDate?: string;
  birthPlace?: string;
  maritalStatusKtp?: string;
  religionKtp?: string;
  genderKtp?: string;
  motherMaidenName?: string;
  streetAddressKtp?: string;
  rtKtp?: string;
  rwKtp?: string;
  provinceKtp?: string;
  cityKtp?: string;
  districtKtp?: string;
  subDistrictKtp?: string;
  postalCodeKtp?: string;
}

interface IInputFormsRequestDataProps {
  id: string;
  username: string;
  email: string;
  roles: string[];
  productCode: string;
  currentPage: string;
  prevPage: string;
  isFromHome: boolean;
  isBack: boolean;
  isSubmit: boolean;
}

interface IInputFormsRequestPage {
  id: string;
  username: string;
  email: string;
  roles: string[];
  productCode: string;
  currentPage: string;
  prevPage: string;
  isFromHome: boolean;
  isBack: boolean;
  isSubmit: boolean;
}

interface IInputFormsResponse {
  formMap: {
    autofillMap: {};
    nextPageMap: {
      nextPage: string;
      isHome: boolean;
      prevPage: string;
      fields: IInputField[];
    };
  };
}

interface INextPageMap {
  nextPage: string;
  prevPage: string;
  fields: IInputField[];
}

interface IInputField {
  fieldCode: string;
  component: string;
  fieldName: string;
  label: string;
  maxLength?: number;
  placeholder?: string;
  dbKey?: string;
}

interface IFormData1 {
  ktpId: string;
  fullName: string;
  birthDate?: string;
  birthPlace: string;
  maritalStatusKtp: string;
  religionKtp: string;
  genderKtp: string;
  motherMaidenName: string;
}

interface IFormData2 {
  streetAddressKtp: string;
  rtKtp: string;
  rwKtp: string;
  provinceKtp: string;
  cityKtp: string;
  districtKtp: string;
  subDistrictKtp: string;
  postalCodeKtp: string;
}

interface IPhotoData {
  ktpPhoto: string;
}

export type {
  IInputFormsRequestDataProps,
  IInputFormsRequestSubmitForm,
  IInputFormsRequestPage,
  IInputFormsResponse,
  INextPageMap,
  IAutoFillMap,
  IInputField,
  IFormData1,
  IFormData2,
};
