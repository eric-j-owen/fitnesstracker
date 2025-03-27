import { ReactNode } from "react";

interface FormLayoutProps {
  title: string;
  children: ReactNode;
  subtitle?: ReactNode;
}

function FormLayout({ title, subtitle, children }: FormLayoutProps) {
  return (
    <div className="container mx-auto flex justify-center mt-25">
      <div className="card shadow-xl w-full max-w-md">
        <div className="card-body">
          <h1 className="card-title text-2xl">{title}</h1>
          {subtitle && <div className="mb-2">{subtitle}</div>}
          {children}
        </div>
      </div>
    </div>
  );
}

export default FormLayout;
