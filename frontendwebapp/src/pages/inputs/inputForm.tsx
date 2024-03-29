import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//local
import { useMain } from "context/mainContext";
import RegistrationHeader from "components/headers/RegistrationHeader";
import SubmitButton from "components/buttons/SubmitButton";
import * as errorUtils from "utils/errorUtils";
import FormCustomInput from "components/inputs/FormCustomInput";
import type {
  IInputFormsRequestDataProps,
  IInputFormsRequestSubmitForm,
  IInputFormsResponse,
  IInputField,
  IFormData1,
  IFormData2,
  IAutoFillMap,
  IDataLists,
  ICreatedProductResponse
} from "interfaces/inputFormInterfaces";

//libraries
import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldError,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Skeleton } from "@mui/material";

import moment from "moment";
import { useAxios, apiURL } from "context/axiosContext";
import { useAuth } from "context/authContext";

const InputForm: React.FunctionComponent = () => {
  // initial actions
  const {
    creatingProductName,
    currentPage,
    prevPage,
    setMainStates,
    isBack,
    mainStates,
    resetStatesAfterSubmit,
  } = useMain();
  const { logout } = useAuth();
  const { authorizationAxios } = useAxios();

  const [autofillMap, setAutoFillMap] = useState<IAutoFillMap>({});
  const [ktpPageState, setKtpPageState] = useState<string>("");
  const [inputFields, setInputFields] = useState<IInputField[]>([]);

  const setFormStates = (responseData: IInputFormsResponse) => {
    setInputFields(responseData.formMap.nextPageMap.fields);
    setKtpPageState(responseData.formMap.nextPageMap.nextPage);
    setMainStates(prevState => ({
      ...mainStates,
      currentPage: responseData.formMap.nextPageMap.nextPage,
      prevPage: responseData.formMap.nextPageMap.prevPage,
    }));
    setAutoFillMap(responseData.formMap.autofillMap);
  };

  const resetStates = () => {
    setAutoFillMap({});
    setKtpPageState("");
    setInputFields([]);
    resetStatesAfterSubmit();
  };

  useEffect(() => {
    getInitialProps();
    // setKtpPageState("ktp-3");
    console.log(inputFields.length, ktpPageState);
  }, []);

  const getInitialProps = async () => {
    if (Object.keys(mainStates.user).length === 0) {
      logout();
      return;
    }
    const payload: IInputFormsRequestDataProps = {
      id: mainStates.user.id,
      username: mainStates.user.username,
      email: mainStates.user.email,
      cif: mainStates.user.cif,
      roles: mainStates.user.roles,
      productCode: mainStates.creatingProductName,
      currentPage: "ktp-2",
      prevPage: "sectionPage",
      isFromSectionPage: true,
      isBack: mainStates.isBack,
      isSubmit: false,
    };
    console.log(payload);
    console.log(currentPage, prevPage);
    const initialProps = await authorizationAxios.post("/getFormData", payload);
    const initialPropsData: IInputFormsResponse = initialProps.data;
    console.log(initialPropsData);
    methods1.reset(initialPropsData.formMap.autofillMap);
    setFormStates(initialPropsData);
  };

  // END initial actions

  // yup validation & error message management
  const schema1 = yup.object().shape({
    ktpId: yup.string().min(5).max(16).required(),
    fullName: yup.string().required(),
    // birthDate: yup.date().required().min(),
    birthDate: yup.string().required(),
    birthPlace: yup.string().required(),
    maritalStatusKtp: yup.string().required(),
    religionKtp: yup.string().required(),
    genderKtp: yup.string().required(),
    motherMaidenKtp: yup.string().required(),
  });
  const schema2 = yup.object().shape({
    streetAddressKtp: yup.string().required(),
    rtKtp: yup.string().required(),
    rwKtp: yup.string().required(),
    provinceKtp: yup.string().required(),
    cityKtp: yup.string().required(),
    districtKtp: yup.string().required(),
    subDistrictKtp: yup.string().required(),
    postalCodeKtp: yup.string().required().max(5),
  });

  const getAutoFillValue = (
    inputField: IInputField,
    autofillMap: IAutoFillMap
  ) => {
    if (!isAutoFill(autofillMap)) return "";
    for (let listKeyString of Object.keys(autofillMap)) {
      if (!inputField.fieldName.includes(listKeyString)) continue;
      console.log(listKeyString);
      return autofillMap[inputField.fieldName as keyof IAutoFillMap];
    }
  };

  const getAutoFillObject = () => {
    return autofillMap ? autofillMap : undefined;
  };

  const methods1 = useForm<IFormData1>({
    resolver: yupResolver(schema1),
    defaultValues: getAutoFillObject(),
    // mode: "onChange",
  });

  const methods2 = useForm<IFormData2>({
    resolver: yupResolver(schema2),
    defaultValues: getAutoFillObject(),
    // mode: "onChange",
  });
  // const watchAll = methods1.watch();
  const errors = methods1.formState.errors;
  const errors2 = methods2.formState.errors;

  const getErrorObjectType = (fieldName: string): FieldError | undefined => {
    switch (fieldName) {
      case "ktpId":
        return errors.ktpId;
      case "fullName":
        return errors.fullName;
      case "birthDate":
        return errors.birthDate;
      case "birthPlace":
        return errors.birthPlace;
      case "maritalStatusKtp":
        return errors.maritalStatusKtp;
      case "religionKtp":
        return errors.religionKtp;
      case "genderKtp":
        return errors.genderKtp;
      case "motherMaidenKtp":
        return errors.motherMaidenKtp;
      case "streetAddressKtp":
        return errors2.streetAddressKtp;
      case "rtKtp":
        return errors2.rtKtp;
      case "rwKtp":
        return errors2.rwKtp;
      case "provinceKtp":
        return errors2.provinceKtp;
    }
  };

  const getErrorString = (field: IInputField): string => {
    return (
      getErrorObjectType(field.fieldName)
        ? getErrorObjectType(field.fieldName)?.message
        : ""
    )?.toString()!;
  };
  // END yup validation & error message management

  // assign hooks
  // comment ktpPageState & replace with currentPage useMain context on testing
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  // END assign hooks

  // lists data for select component
  const genderList: string[] = ["Male", "Female", "Undefined"];
  const rtList: string[] = ["12313", "33234", "321"];
  const rwList: string[] = ["12381", "1928", "123"];
  const provinceList: string[] = [
    "Jawa Timur",
    "Jawa Barat",
    "Jawa Tengah",
    "Sumatera Selatan",
    "Sumatera Barat",
    "Sumatera Timur",
    "Sumatera Utara",
    "Kalimantan Timur",
    "Kalimantan Barat",
    "Kalimantan Selatan",
    "Kalimantan Utara",
  ];

  const cityList: string[] = [
    "Jakarta",
    "Surabaya",
    "Yogyakarta",
    "Semarang",
    "Solo",
    "Malang",
    "Bogor",
    "Bekasi",
  ];
  const districtList: string[] = [
    "Sukomanunggal",
    "Kebon Jeruk",
    "Pluit",
    "Pinang Ranti",
    "BSD",
    "Wiyung",
  ];
  const subDistrictList: string[] = [
    "Sukomanunggal",
    "Wiyung",
    "Gatau jakarta",
    "kayak apa",
  ];

  const dataLists: IDataLists = {
    gender: genderList,
    rt: rtList,
    rw: rwList,
    province: provinceList,
    city: cityList,
    district: districtList,
    subDistrict: subDistrictList,
  };
  // END lists data for select component

  // autoFill values
  const isAutoFill = (autofillMap: object): boolean => {
    if (!autofillMap) return false;
    if (Object.keys(autofillMap).length === 0) return false;
    return true;
  };

  // forced data for client side testing purposes
  // change to response from getServerSide props when testing
  const inputFields1: IInputField[] = [
    {
      fieldCode: "ktp-2-1",
      component: "textField",
      fieldName: "ktpId",
      label: "NIK",
      maxLength: 16,
      placeholder: "Nomor Induk Kartu Tanda Penduduk | NIK",
      dbKey: "ktpId",
    },
    {
      fieldCode: "ktp-2-2",
      component: "textField",
      fieldName: "fullName",
      label: "NAMA",
      placeholder: "Nama sesuai KTP",
      dbKey: "fullName",
    },
    {
      fieldCode: "ktp-2-3",
      component: "Calendar",
      fieldName: "birthDate",
      label: "Tanggal Lahir",
      dbKey: "birthDate",
    },
    {
      fieldCode: "ktp-2-4",
      component: "textField",
      fieldName: "birthPlace",
      label: "Tempat Lahir",
      dbKey: "birthPlace",
    },
    {
      fieldCode: "ktp-2-5",
      component: "textField",
      fieldName: "maritalStatusKtp",
      label: "Status Pernikahan",
      dbKey: "maritalStatusKtp",
    },
    {
      fieldCode: "ktp-2-6",
      component: "textField",
      fieldName: "religionKtp",
      label: "Agama",
      dbKey: "religionKtp",
    },
    {
      fieldCode: "ktp-2-7",
      component: "Picker",
      fieldName: "genderKtp",
      label: "Gender",
      dbKey: "genderKtp",
    },
    {
      fieldCode: "ktp-2-8",
      component: "textField",
      fieldName: "motherMaidenKtp",
      label: "Nama Ibu Kandung",
      dbKey: "motherMaidenKtp",
    },
  ];

  const inputFields2: IInputField[] = [
    {
      fieldCode: "ktp-3-1",
      component: "textField",
      fieldName: "streetAddressKtp",
      label: "Alamat",
      placeholder: "Alamat sesuai KTP",
      dbKey: "streetAddressKtp",
    },
    {
      fieldCode: "ktp-3-2",
      component: "Picker",
      fieldName: "rtKtp",
      label: "RT",
      placeholder: "Nomor RT alamat",
      dbKey: "rtKtp",
    },
    {
      fieldCode: "ktp-3-3",
      component: "Picker",
      fieldName: "rwKtp",
      label: "RW",
      placeholder: "Nomor RW alamat",
      dbKey: "rwKtp",
    },
    {
      fieldCode: "ktp-3-4",
      component: "Picker",
      fieldName: "provinceKtp",
      label: "Provinsi",
      dbKey: "provinceKtp",
    },
    {
      component: "Picker",
      fieldName: "cityKtp",
      fieldCode: "ktp-3-5",
      label: "Kota",
    },
    {
      component: "Picker",
      fieldName: "districtKtp",
      fieldCode: "ktp-3-6",
      label: "Kabupaten",
    },
    {
      component: "Picker",
      fieldName: "subDistrictKtp",
      fieldCode: "ktp-3-7",
      label: "Kecamatan",
    },
    {
      component: "textField",
      fieldName: "postalCodeKtp",
      fieldCode: "ktp-3-8",
      label: "Kode Pos",
      maxLength: 5,
    },
  ];
  // END forced data for client side testing purposes

  // form utils
  const selectDropDownList = (inputField: IInputField) => {
    for (let listKeyString of Object.keys(dataLists)) {
      if (!inputField.fieldName.includes(listKeyString)) continue;
      return dataLists[listKeyString as keyof IDataLists];
    }
  };

  const isFormData1 = (object: any): object is IFormData1 => {
    return object.ktpId !== undefined;
  };

  const submitData = async (formData: IFormData1 | IFormData2) => {
    try {
      const payload: IInputFormsRequestSubmitForm = {
        id: mainStates.user.id,
        username: mainStates.user.username,
        email: mainStates.user.email,
        cif: mainStates.user.cif,
        roles: mainStates.user.roles,
        productCode: mainStates.creatingProductName,
        currentPage: mainStates.currentPage,
        prevPage: mainStates.prevPage,
        isBack: isBack,
        isSubmit: true,
        inputData: formData,
        autofillData: {},
      };
      let response;
      if (isFormData1(formData)) {
        const formattedDate = moment(formData.birthDate).format("DD-MM-YYYY");
        console.log(payload);
        response = await authorizationAxios.post("/getFormData", payload);
        const responseData: IInputFormsResponse = response.data;
        console.log(responseData);
        methods1.reset();
        methods2.reset(responseData.formMap.autofillMap);
        setFormStates(response.data);
      } else {
        console.log(payload);
        response = await authorizationAxios.post("/getFormData", payload);
        const responseData: ICreatedProductResponse = response.data;
        console.log(response);
        methods2.reset();
        resetStates();
        alert(`Data submitted successfully, ${responseData.formMap.productName} has been created`);
        router.push("/mainmenu");
      }
      console.log(response.data);
    } catch (err) {
      alert(`Failed to submit data, ${errorUtils.getErrorMessage(err)}`);
    }
  };

  const onForm1Submit: SubmitHandler<IFormData1> = async (
    formData: IFormData1
  ) => {
    setIsLoading(true);
    await submitData(formData);
    setIsLoading(false);
  };

  const onForm2Submit: SubmitHandler<IFormData2> = async (
    formData: IFormData2
  ) => {
    setIsLoading(true);
    await submitData(formData);
    setIsLoading(false);
  };

  // END form utils

  return (
    <div className="min-h-screen mb-5 flex flex-col">
      <RegistrationHeader
        creatingProductName={creatingProductName}
        goToPage="/inputs/inputData"
      />
      {/* ktpPageState change to currentPage during testing */}
      {ktpPageState === "ktp-2" ? (
        <FormProvider {...methods1}>
          <form
            key={1}
            className="flex flex-col justify-center px-5 mt-6 gap-8"
            onSubmit={methods1.handleSubmit(onForm1Submit)}
          >
            <div className="text-3xl">Personal Information</div>
            {inputFields.length !== 0
              ? inputFields.map((field) => {
                  return (
                    <FormCustomInput
                      inputType={field.component}
                      inputName={field.fieldName}
                      inputLabel={field.label}
                      inputPlaceholder={field.placeholder}
                      errors={errors}
                      errorString={getErrorString(field)}
                      selectItemsList={selectDropDownList(field)}
                    />
                  );
                })
              : inputFields1.map((field) => {
                  return (
                    <Skeleton
                      variant="rounded"
                      height={30}
                      sx={{ bgcolor: "grey.200" }}
                      animation="wave"
                    />
                  );
                })}

            <SubmitButton name="Continue" isLoading={isLoading} />
          </form>
        </FormProvider>
      ) : (
        <FormProvider {...methods2}>
          <form
            key={2}
            className="flex flex-col justify-center px-5 mt-6 gap-8"
            onSubmit={methods2.handleSubmit(onForm2Submit)}
          >
            <div className="text-3xl">Personal Information</div>
            {inputFields.length !== 0
              ? inputFields.map((field) => {
                  return (
                    <FormCustomInput
                      inputType={field.component}
                      inputName={field.fieldName}
                      inputLabel={field.label}
                      inputPlaceholder={field.placeholder}
                      errors={errors2}
                      errorString={getErrorString(field)}
                      selectItemsList={selectDropDownList(field)}
                    />
                  );
                })
              : inputFields2.map((field) => {
                  return (
                    <Skeleton
                      variant="rounded"
                      height={30}
                      sx={{ bgcolor: "grey.200" }}
                      animation="wave"
                    />
                  );
                })}
            <SubmitButton name="Submit" isLoading={isLoading} />
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default InputForm;
