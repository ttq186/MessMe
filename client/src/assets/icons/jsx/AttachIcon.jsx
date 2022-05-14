const AttachIcon = ({ width = '38px', height = '38px', fill = '#a6b0cf' }) => {
  return (
    <svg
      width={width}
      height={height}
      version='1.1'
      viewBox='0 0 700 600'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g>
        <path
          fill={fill}
          d='m351.04 531.28c-77.828-0.015625-124.32-52.457-124.36-140.27l0.46094-271.45c-0.003906-7.0664 1.2617-32.066 17.617-55.508 11.25-16.121 32.703-35.336 71.023-35.336h0.085937c39.211 0 60.523 17.879 71.496 32.891 15.781 21.582 17.477 46.711 17.473 56.508l-0.42578 272.99c0.003906 10.074 0.027344 33.758-16.238 50.023-9.9414 9.9414-23.672 14.98-40.797 14.98-0.042969-0.003907-0.085938-0.003907-0.11719 0-32.301 0-51.609-24.348-51.645-65.133l-0.14844-271.82 33.602-0.023438 0.14062 271.82c0.023437 31.266 12.441 31.555 17.926 31.555h0.20703c7.918 0 13.652-1.7305 17.062-5.1406 6.418-6.418 6.4062-19.828 6.4023-26.273l0.42578-273c0-6.4727-1.0586-23.055-11-36.641-9.2734-12.691-24.207-19.125-44.379-19.125h-0.050781-0.011719c-19.152 0-33.773 7.0508-43.484 20.961-8.5469 12.254-11.574 27.211-11.57 36.301l-0.46094 271.44c0.023437 39.801 11.84 106.64 90.766 106.65 73.309-0.011719 88.699-57.965 88.699-106.58l-0.71094-224.94 33.602-0.11328 0.71094 225c-0.003906 89.129-44.578 140.22-122.3 140.23z'
        />
      </g>
    </svg>
  );
};

export default AttachIcon;
