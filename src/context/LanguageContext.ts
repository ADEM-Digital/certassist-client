import { createContext, useState } from "react";

export type LanguageContextType = {
    selectedLanguage: "en" | "es";
    setSelectedLanguage: React.Dispatch<React.SetStateAction<"en" | "es">>;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguageContext = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<"en" | "es">("en");

    return {
        selectedLanguage,
        setSelectedLanguage
    }
}