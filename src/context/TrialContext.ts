import { createContext, useState } from "react"

export type TrialContextType = {
    isTrial: boolean;
    setIsTrial: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TrialContext = createContext<TrialContextType | undefined>(undefined)

export const useTrialContext = () => {
    const [isTrial, setIsTrial] = useState<boolean>(true)

    return {
        isTrial,
        setIsTrial
    }
}