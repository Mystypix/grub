import { CzechTextKey } from "common/const/localisation/czech";
import { EnglishTextKey } from "common/const/localisation/english";

export const getLocalisedText = (language: string, textKey: string) => {
  switch (language) {
    case "czech":
      return CzechTextKey[textKey] || textKey;
    default:
      return EnglishTextKey[textKey] || textKey;
  }
};
