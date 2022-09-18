const SettingIcon = ({ width = "38px", height = "38px", fill = "#a6b0cf" }) => {
  return (
    <svg
      width={width}
      height={height}
      version="1.1"
      viewBox="0 0 700 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          fill={fill}
          d="m387.57 507.5h-75.133c-13.242 0-25.945-5.2617-35.309-14.625s-14.625-22.066-14.625-35.309c0.046875-2.6484-0.62109-5.2617-1.9336-7.5625-1.3164-2.2969-3.2266-4.1992-5.5312-5.5039-4.5781-2.8203-10.355-2.8203-14.934 0-11.473 6.7578-25.184 8.6094-38.035 5.1328-12.762-3.5312-23.645-11.902-30.332-23.332l-37.566-65.102c-6.6055-11.453-8.3984-25.055-4.9844-37.828 3.4102-12.773 11.75-23.672 23.184-30.305 2.3477-1.2734 4.3086-3.1602 5.6641-5.4648 1.3555-2.3008 2.0625-4.9297 2.0352-7.6016 0.03125-2.6133-0.64453-5.1875-1.9609-7.4492-1.3164-2.2578-3.2188-4.1211-5.5039-5.3828-11.492-6.6406-19.883-17.562-23.34-30.379-3.4531-12.812-1.6914-26.473 4.9062-37.988l37.566-65.102c6.6875-11.43 17.57-19.801 30.332-23.332 12.934-3.1484 26.586-0.87109 37.801 6.3008 3.0742 1.9648 6.7578 2.7539 10.367 2.2227 3.6133-0.52734 6.9102-2.3438 9.293-5.1094 2.3828-2.7656 3.6836-6.2969 3.6719-9.9492-0.0625-13.281 5.1719-26.043 14.543-35.457 9.3711-9.4141 22.109-14.707 35.391-14.707h75.133c13.246 0 25.945 5.2578 35.309 14.625 9.3633 9.3633 14.625 22.062 14.625 35.309-0.046875 2.6484 0.62109 5.2578 1.9336 7.5586 1.3164 2.3008 3.2266 4.2031 5.5352 5.5078 4.5781 2.8203 10.355 2.8203 14.934 0 11.469-6.7617 25.18-8.6133 38.031-5.1328 12.765 3.5312 23.645 11.902 30.332 23.332l37.566 65.102 0.003906-0.003906c6.6016 11.453 8.3945 25.059 4.9844 37.832-3.4141 12.77-11.75 23.668-23.188 30.305-2.3477 1.2695-4.3086 3.1602-5.6641 5.4609-1.3555 2.3047-2.0586 4.9336-2.0352 7.6055-0.03125 2.6133 0.64844 5.1875 1.9609 7.4453 1.3164 2.2617 3.2188 4.1211 5.5078 5.3867 11.488 6.6406 19.879 17.562 23.336 30.375 3.4531 12.816 1.6914 26.477-4.9023 37.992l-37.566 65.102-0.003906-0.003906c-6.6875 11.43-17.57 19.801-30.332 23.336-12.773 3.4922-26.418 1.6367-37.801-5.1328-3.0742-1.9648-6.7539-2.7578-10.367-2.2266-3.6133 0.53125-6.9102 2.3438-9.293 5.1094-2.3789 2.7656-3.6836 6.3008-3.6719 9.9492-0.24609 13.082-5.6133 25.543-14.949 34.707-9.3398 9.1641-21.902 14.297-34.984 14.293zm-140-100.1c8.7695 0.035156 17.379 2.3672 24.969 6.7695 7.6094 4.3398 13.934 10.621 18.32 18.207 4.3867 7.582 6.6797 16.195 6.6445 24.957 0 3.9844 1.5664 7.8047 4.3594 10.645 2.793 2.8359 6.5938 4.4609 10.574 4.5234h75.133c3.9609 0 7.7578-1.5742 10.559-4.375s4.375-6.5977 4.375-10.559c-0.050781-8.7969 2.2344-17.449 6.6172-25.074 4.3867-7.625 10.719-13.949 18.348-18.324 7.5625-4.4766 16.184-6.8398 24.969-6.8398s17.406 2.3633 24.965 6.8398c3.4297 2.0312 7.5312 2.6055 11.387 1.5977 3.8555-1.0078 7.1523-3.5156 9.1484-6.9648l38.734-65.102c2.0195-3.3945 2.5898-7.457 1.5781-11.277-1.0078-3.8164-3.5117-7.0703-6.9453-9.0234-10.191-5.8594-17.988-15.133-22.016-26.18s-4.0273-23.16 0-34.207c4.0273-11.043 11.824-20.316 22.016-26.18 3.4492-1.9961 5.957-5.2891 6.9648-9.1445 1.0078-3.8594 0.43359-7.957-1.5977-11.387l-38.734-65.102c-2-3.4336-5.2656-5.9492-9.1016-7-3.8008-1-7.8438-0.41016-11.199 1.6328-15.473 8.8789-34.492 8.875-49.957-0.011719-15.469-8.8867-25.055-25.316-25.176-43.152 0-3.9844-1.5664-7.8047-4.3594-10.645-2.793-2.8359-6.5938-4.4609-10.574-4.5234h-75.133c-3.9609 0-7.7578 1.5742-10.559 4.375s-4.375 6.5977-4.375 10.559c0.050781 8.7969-2.2344 17.449-6.6172 25.074-4.3867 7.625-10.719 13.949-18.348 18.324-7.5625 4.4766-16.184 6.8398-24.969 6.8398s-17.406-2.3633-24.965-6.8398c-3.4297-2.0312-7.5312-2.6055-11.387-1.5977-3.8555 1.0078-7.1523 3.5156-9.1484 6.9648l-37.566 65.102c-2.0195 3.3945-2.5898 7.457-1.582 11.277 1.0117 3.8164 3.5156 7.0703 6.9492 9.0234 10.191 5.8594 17.988 15.133 22.016 26.18 4.0273 11.047 4.0273 23.16 0 34.207-4.0273 11.043-11.824 20.316-22.016 26.18-3.4883 1.957-6.0469 5.2344-7.1016 9.0938-1.0508 3.8594-0.51172 7.9805 1.5 11.438l37.566 65.102c2 3.4336 5.2695 5.9492 9.1016 7 3.8008 1 7.8438 0.41016 11.199-1.6328 7.75-4.418 16.512-6.75 25.434-6.7695z"
        />
        <path
          fill={fill}
          d="m350 367.5c-23.207 0-45.461-9.2188-61.871-25.629s-25.629-38.664-25.629-61.871 9.2188-45.461 25.629-61.871 38.664-25.629 61.871-25.629 45.461 9.2188 61.871 25.629 25.629 38.664 25.629 61.871-9.2188 45.461-25.629 61.871-38.664 25.629-61.871 25.629zm0-140c-13.926 0-27.277 5.5312-37.125 15.375-9.8438 9.8477-15.375 23.199-15.375 37.125s5.5312 27.277 15.375 37.125c9.8477 9.8438 23.199 15.375 37.125 15.375s27.277-5.5312 37.125-15.375c9.8438-9.8477 15.375-23.199 15.375-37.125s-5.5312-27.277-15.375-37.125c-9.8477-9.8438-23.199-15.375-37.125-15.375z"
        />
      </g>
    </svg>
  );
};

export default SettingIcon;
