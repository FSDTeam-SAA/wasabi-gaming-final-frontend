import { IMAGES } from "../../../assets";

interface LogoProps {
  height?: number;
  mobileHeight?: number;
  name?: string;
}

const Logo = ({ height = 120, mobileHeight = 70, name }: LogoProps) => {
  return (
    <div className="flex-shrink-0">
      <img
        src={IMAGES.logo.src}
        alt={name}
        className={`object-contain transition-all duration-300`}
        style={{
          height: `${mobileHeight}px`, // Default height for small screens (below md)
          width: 'auto',
          minHeight: `${mobileHeight}px`, // Ensures minimum height (e.g., 70px)
        }}
      />
      {/* Responsive adjustments using Tailwind */}
      <div className={`hidden md:block md:h-[${Math.round(height * 0.8)}px] lg:h-[${height}px]`} />
    </div>
  );
};

export default Logo;
