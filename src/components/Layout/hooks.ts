import { useState } from "react";

export const useGeneralSupportForm = () => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFilename, setSelectedFilename] = useState<string>("");
  const initialFormValues = {
    problemType: "",
    description: "",
    image: null,
  };

  return {
    initialFormValues,
    isFileSelected,
    setIsFileSelected,
    selectedFilename,
    setSelectedFilename,
  };
};
