import * as React from "react";
import { useRouter } from 'next/router';
// import { useContext, useState, createContext } from "react";

const router = useRouter();

export const goToPage = (pageRoute: string) => {
    router.push(pageRoute)
}