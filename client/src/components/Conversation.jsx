const Conversation = ({ isActive = false, isChose = false }) => {
  return (
    <div
      className={`flex p-3 mx-3 mb-2.5 ${
        isChose ? 'bg-slate-500' : 'opacity-60 bg-slate-600 hover:bg-slate-500'
      } rounded cursor-pointer transition duration-300 ease-out hover:ease-in`}
    >
      <div className={`flex items-end p-1 ${isActive ? 'mr-1' : 'mr-2'} `}>
        <img
          src='https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-1/105276421_2668844033387053_1941503213707792633_n.jpg?stp=dst-jpg_p100x100&_nc_cat=100&ccb=1-5&_nc_sid=7206a8&_nc_ohc=-mhBYA1X3uYAX-Yxvxh&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT86vNTnQ9QM--TFIFZFtPkG1I7xY1rtIUXImcSS8_2xsw&oe=62922452'
          alt='User'
          className='w-10 rounded-full'
        />
        {isActive && (
          <span className='w-3 h-3 rounded-full  bg-green-500 -ml-2 border-slate-200 border-2'></span>
        )}
      </div>
      <div className='grow'>
        <p className='font-bold'>Duy Dâm</p>
        <p className='text-sm text-slate-300 font-medium'>Tao lạy m, đừng học nữa :))</p>
      </div>
      <p className='text-sm font-bold text-gray-400'>14:2</p>
    </div>
  );
};

export default Conversation;
