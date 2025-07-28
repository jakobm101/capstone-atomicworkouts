import { X } from "lucide-react";
import Link from "next/link";
import styled from "styled-components";

export default function ButtonClose({ href, ...props }) {
  return (
    <StyledButtonClose href={href} {...props}>
      <X />
    </StyledButtonClose>
  );
}

const StyledButtonClose = styled(Link)`
  position: absolute;
  top: 10px;
  right: 10px;
`;
