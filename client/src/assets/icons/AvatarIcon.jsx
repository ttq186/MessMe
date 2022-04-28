const AvatarIcon = ({ width = '38px', height = '38px', fill='#a6b0cf' }) => {
  return (
    <svg
      width={width}
      height={height}
      version='1.1'
      viewBox='0 0 700 600'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill={fill}
        d='m350 35c-135.1 0-245 109.9-245 245s109.9 245 245 245 245-109.9 245-245-109.9-245-245-245zm0 87.5c48.117 0 87.5 39.383 87.5 87.5s-39.383 87.5-87.5 87.5-87.5-39.383-87.5-87.5 39.383-87.5 87.5-87.5zm-70 210h140c47.781 0 86.797 38.703 87.43 86.34-38.449 43.586-94.59 71.16-157.43 71.16s-118.98-27.578-157.43-71.16c0.63281-47.633 39.652-86.34 87.434-86.34z'
      />
    </svg>
  );
};

export default AvatarIcon;
