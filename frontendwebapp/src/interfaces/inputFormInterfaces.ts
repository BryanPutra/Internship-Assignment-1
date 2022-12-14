interface IUser {
  id: string;
  username: string;
  email: string;
  cif: string;
  roles: string[];
}

interface IDefaultMainStates {
  user: IUser;
  productSectionSelected: string;
  creatingProductName: string;
  currentPage: string;
  prevPage: string;
  sectionDetails: ISectionDetails[];
  isSectionPage: boolean;
  isFromSectionPage: boolean;
  isBack: boolean;
  isSubmit: boolean;
}

interface ISectionDetails {
  sectionTitle: string;
  sectionStatus: string;
  disabled: boolean;
  sectionId?: string;
  requirement?: string;
  pageList: string[];
}

interface IDataLists {
  gender: string[];
  rt: string[];
  rw: string[];
  province: string[];
  city: string[];
  district: string[];
  subDistrict: string[];
}

interface IInputFormsRequestSubmitForm {
  id: string;
  username: string;
  email: string;
  cif: string;
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
  motherMaidenKtp?: string;
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
  id?: string;
  username: string;
  email: string;
  cif: string;
  roles: string[];
  productCode: string;
  currentPage: string;
  prevPage: string;
  isFromSectionPage: boolean;
  isBack: boolean;
  isSubmit: boolean;
}

interface IInputFormsRequestPage {
  id: string;
  username: string;
  email: string;
  cif: string;
  roles: string[];
  productCode: string;
  currentPage: string;
  prevPage?: string;
  isFromSectionPage: boolean;
  isBack?: boolean;
  isSubmit?: boolean;
}

interface IInputFormsResponse {
  formMap: {
    sectionList?: ISectionDetails[];
    autofillMap: {};
    nextPageMap: {
      nextPage: string;
      isSectionPage: boolean;
      prevPage: string;
      fields: IInputField[];
    };
  };
}

interface IInputFormsSubmitResponse {
  formMap: {
    sectionList?: ISectionDetails[];
    autofillMap: {};
    nextPageMap: {
      nextPage: string;
      isSectionPage: boolean;
      prevPage: string;
      fields: IInputField[];
    };
  };
}

interface ICreatedProductResponse {
  formMap: {
    isDone: boolean;
    productName: string;
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
  motherMaidenKtp: string;
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
  IUser,
  IDefaultMainStates,
  IInputFormsRequestDataProps,
  IInputFormsRequestSubmitForm,
  IInputFormsRequestPage,
  IInputFormsResponse,
  INextPageMap,
  IAutoFillMap,
  IInputField,
  IFormData1,
  IFormData2,
  ISectionDetails,
  IDataLists,
  IInputFormsSubmitResponse,
  ICreatedProductResponse,
};
