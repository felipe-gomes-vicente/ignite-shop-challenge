import Image from "next/image";

import logoImg from "../../assets/logo.svg";

import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <Image width={130} height={52} src={logoImg.src} alt="" />
    </HeaderContainer>
  )
}
