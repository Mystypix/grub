interface IconProps {
  className?: string;
  src: string;
}

export const Icon = ({ className, src }: IconProps) => (
  <svg className={className}>
    <use xlinkHref={`#${src}`} />
  </svg>
);
