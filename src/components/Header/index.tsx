import Image from "next/image";
import Link from "next/link";

import { Cart } from "../Cart";
import logoImg from "../../assets/logo.svg";

import { HeaderContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <Link href="/">
        <Image width={130} height={52} src={logoImg} alt="" />
      </Link>

      <Cart />
    </HeaderContainer>
  )
}
