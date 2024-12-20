"use client";

import ModeToggle from "@/components/layout/mode-toggle";
import Container from "@/components/layout/container";

type NavbarProps = {
  cookie: string;
};

const Navbar = ({ cookie }: NavbarProps) => {
  return cookie ? (
    // <Container>
    //   Dashboard Navbar <ModeToggle />
    // </Container>
    <></>
  ) : (
    <Container>
      <ModeToggle />
    </Container>
  );
};

export default Navbar;
