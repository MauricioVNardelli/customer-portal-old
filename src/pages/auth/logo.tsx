import logoDefault from "@/assets/logo.png";
//import imageLogoAR from "@/assets/AR/logo.png";

import { CompanyAPI } from "@/api/company";
import { useEffect, useState } from "react";

interface ILogoProps {
  companyCode: string | undefined;
  className: string;
}

export function Logo(props: ILogoProps) {
  const [logo, setLogo] = useState<string>();

  useEffect(() => {
    const getLogo = async () => {
      const companyApi = new CompanyAPI();
      const urlLogo = await companyApi.GetImage(props.companyCode);

      if (urlLogo) setLogo(urlLogo);
      else setLogo(logoDefault);
    };

    getLogo();
  });

  return (
    <div>
      <img src={logo} className={props.className} />
    </div>
  );
}
