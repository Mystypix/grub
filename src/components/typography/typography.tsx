import clsx from "clsx";
import css from "./typography.module.scss";

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export const MainTitle = ({ children, className }: TypographyProps) => (
  <h1 className={clsx(css.mainTitle, className)}>{children}</h1>
);
export const SubTitle = ({ children, className }: TypographyProps) => (
  <h2 className={clsx(css.subTitle, className)}>{children}</h2>
);
export const ContentTitle = ({ children, className }: TypographyProps) => (
  <h3 className={clsx(css.contentTitle, className)}>{children}</h3>
);
export const Paragraph = ({ children, className }: TypographyProps) => (
  <p className={clsx(css.paragraph, className)}>{children}</p>
);
export const SmallParagraph = ({ children, className }: TypographyProps) => (
  <p className={clsx(css.smallParagraph, className)}>{children}</p>
);
