import CircularProgress from "@mui/material/CircularProgress";
import { IoMdArrowDropright } from "react-icons/io";

interface PropsType {
  title: any;
  onClick: () => void;
  background: string;
  color: string;
  disabled?: any;
  loading?: boolean;
  id?: string;
  icon?: any;
}

const Button: React.FC<PropsType> = ({
  title,
  onClick,
  background,
  color,
  disabled,
  loading,
  id,
  icon,
}) => {
  return (
    <>
      <div
        id={id}
        style={{
          background: disabled ? "#b9b9b9" : background,
          color: disabled ? "white" : color,
        }}
        onClick={!loading && !disabled ? onClick : undefined}
        className={`relative w-full h-full rounded-full flex items-center justify-center gap-2 bg-gray-300  cursor-${
          disabled ? "default" : "pointer"
        } hover:${disabled ? "none" : "opacity-[0.9]"} font-semibold`}
      >
        <div>{icon}</div>

        {title}
        {loading && <CircularProgress sx={{ color: color }} size={20} />}
      </div>
    </>
  );
};

export default Button;
