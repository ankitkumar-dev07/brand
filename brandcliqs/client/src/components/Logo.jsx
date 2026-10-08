import logo from '../assets/logo.jpg';

export default function Logo() {
  return (
    <div className="flex items-center">
      <img
        src={logo}
        alt="BrandCliqs"
        className="h-14 w-auto object-contain"
      />
    </div>
  );
}