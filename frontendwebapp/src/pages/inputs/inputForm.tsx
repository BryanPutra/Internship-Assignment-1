import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//local
import { useMain } from "context/mainContext";
import RegistrationHeader from "components/headers/RegistrationHeader";
import SubmitButton from "components/buttons/SubmitButton";
import CustomButton from "components/buttons/CustomButtons";
import * as errorUtils from "utils/errorUtils";
import FormCustomInput from "components/inputs/FormCustomInput";

//libraries
import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldError,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

interface IInputForm1Props {}

interface IFormData1 {
  ktpId: string;
  ktpName: string;
  birthDate: string;
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
}

interface IInputField {
  fieldCode: string;
  component: string;
  fieldName: string;
  label: string;
  maxLength?: number;
  placeholder?: string;
  dbKey: string;
}

interface IDataLists {
  gender: string[];
  rt: string[];
  rw: string[];
  province: string[];
}

const InputForm: React.FunctionComponent<1> = (props) => {
  const { creatingProductName } = useMain();
  const schema1 = yup.object().shape({
    ktpId: yup.string().min(5).max(16).required(),
    ktpName: yup.string().required(),
    birthDate: yup.string().required(),
    birthPlace: yup.string().required(),
    maritalStatusKtp: yup.string().required(),
    religionKtp: yup.string().required(),
    genderKtp: yup.string().required(),
    motherMaidenName: yup.string().required(),
  });
  const schema2 = yup.object().shape({
    streetAddressKtp: yup.string().required(),
    rtKtp: yup.string().required(),
    rwKtp: yup.string().required(),
    provinceKtp: yup.string().required(),
  });

  const methods1 = useForm<IFormData1>({
    resolver: yupResolver(schema1),
    // mode: "onChange",
  });
  const methods2 = useForm<IFormData2>({
    resolver: yupResolver(schema2),
    // mode: "onChange",
  });
  // const watchAll = methods1.watch();
  const errors = methods1.formState.errors;
  const errors2 = methods2.formState.errors;

  const getErrorObjectType = (fieldName: string): FieldError | undefined => {
    switch (fieldName) {
      case "ktpId":
        return errors.ktpId;
      case "ktpName":
        return errors.ktpName;
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
      case "motherMaidenName":
        return errors.motherMaidenName;
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

  const [ktpPageState, setKtpPageState] = useState<string>("ktp-2");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const genderList: string[] = ["Male", "Female", "Undefined"];
  const rtList: string[] = ["123123", "323234", "321"];
  const rwList: string[] = ["123812938", "192832193", "123"];
  const provinsiList: string[] = [
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

  const dataLists: IDataLists = {
    gender: genderList,
    rt: rtList,
    rw: rwList,
    province: provinsiList,
  };

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
      fieldName: "ktpName",
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
      component: "picker",
      fieldName: "genderKtp",
      label: "Gender",
      dbKey: "genderKtp",
    },
    {
      fieldCode: "ktp-2-8",
      component: "textField",
      fieldName: "motherMaidenName",
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
      component: "picker",
      fieldName: "rtKtp",
      label: "RT",
      placeholder: "Nomor RT alamat",
      dbKey: "rtKtp",
    },
    {
      fieldCode: "ktp-3-3",
      component: "picker",
      fieldName: "rwKtp",
      label: "RW",
      placeholder: "Nomor RW alamat",
      dbKey: "rwKtp",
    },
    {
      fieldCode: "ktp-3-4",
      component: "picker",
      fieldName: "provinceKtp",
      label: "Provinsi",
      dbKey: "provinceKtp",
    },
  ];

  const selectDropDownList = (inputField: IInputField) => {
    for (let listKeyString of Object.keys(dataLists)) {
      if (!inputField.dbKey.toLowerCase().includes(listKeyString.toLowerCase()))
        continue;
      return dataLists[listKeyString as keyof IDataLists];
    }
  };

  const submitData = async (data: any) => {
    try {
      const response = await axios.post("/login", data);
      console.log(response);
      alert("Data submitted successfully");
      router.push("/mainmenu");
    } catch (err) {
      alert(`Failed to submit data, ${errorUtils.getErrorMessage(err)}`);
    }
  };

  const onForm1Submit: SubmitHandler<IFormData1> = async (data: IFormData1) => {
    console.log(data);
    setIsLoading(true);
    await submitData(data);
    setIsLoading(false);
  };

  const onForm2Submit: SubmitHandler<IFormData2> = async (data: IFormData2) => {
    console.log(data);
    setIsLoading(true);
    await submitData(data);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen mb-5 flex flex-col">
      <RegistrationHeader
        creatingProductName={creatingProductName}
        goToPage="/inputs/inputData"
      />

      {ktpPageState === "ktp-2" ? (
        <FormProvider {...methods1}>
          <form
            className="flex flex-col justify-center px-5 mt-6 gap-8"
            onSubmit={methods1.handleSubmit(onForm1Submit)}
          >
            <div className="text-3xl">Personal Information</div>

            {inputFields1.map((field) => {
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
            })}
            {/* <CustomButton name="Continue" isPressable={false} goToPage={setKtpPageState("ktp-3")}/> */}
            <SubmitButton
              // isDisabled={!methods1.formState.isValid}
              name="Continue"
              isLoading={isLoading}
            />
          </form>
        </FormProvider>
      ) : (
        <FormProvider {...methods2}>
          <form
            className="flex flex-col justify-center px-5 mt-6 gap-8"
            onSubmit={methods2.handleSubmit(onForm2Submit)}
          >
            <div className="text-3xl">Personal Information</div>
            {inputFields2.map((field) => {
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
            })}
            <SubmitButton
              // isDisabled={!methods1.formState.isValid}
              name="Submit"
              isLoading={isLoading}
            />
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default InputForm;
