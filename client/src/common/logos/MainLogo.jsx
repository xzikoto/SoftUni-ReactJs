import Logo from "../../../public/images/logo.png";
export default function MainLogo({ size }) {
  return <img src={Logo} className={`h-${size}`} alt="Logo" />;
}
