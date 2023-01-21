interface IconProps {
  src: string;
}

export const Icon = ({ src }: IconProps) => (
  <svg>
    <use xlinkHref={`#${src}`} />
  </svg>
);
