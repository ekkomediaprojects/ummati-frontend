const Button = ({
  children,
  type,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`text-base leading-6 bg-secondary px-4 py-[10px] flex justify-center text-center items-center ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
