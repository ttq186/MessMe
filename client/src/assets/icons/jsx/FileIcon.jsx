const FileIcon = ({ width = '25px', height = '25px', fill = '#a6b0cf' }) => {
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
        d='m583.33 186.67 0.17188 0.17188h-0.17188v373.16h-466.66v-560h303.75l162.91 162.91zm-46.664 0.17188h-140v-140.17h-233.34v466.66h373.34zm-326.67 69.828v-46.668h163.33v46.668zm0 93.332v-46.668h280v46.668zm0 93.332v-46.664h280v46.664zm234.14-303.35h45.863l-45.863-45.863z'
        fill-rule='evenodd'
      />
    </svg>
  );
};

export default FileIcon;
