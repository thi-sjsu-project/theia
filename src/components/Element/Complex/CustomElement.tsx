import { type ReactNode } from 'react';

type CustomElementProps = {
  children: ReactNode;
};

const CustomElement = ({ children }: CustomElementProps) => {
  return <>{children}</>;
};

export default CustomElement;
