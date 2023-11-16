import ReactPortal from './PortalComponent';

const Loader = () => {
  return (
    <ReactPortal>
      <div className='absolute top-0 left-0 w-full h-full bg-gray-900/50 grid place-items-center z-10 '>
        <h1 className="font-semibold font-Poppins  text-[1.88rem] shadow-lg text-gray-900  border-0 border-t-[1rem] rounded-full w-[160px] h-[160px] animate-bounce grid bg-white/90 border-teal-700 place-items-center overflow-hidden relative z-10 before:content-[' '] before:top-0 before:left-0 before:absolute before:border-0 before:border-b-8 before:rounded-full before:z-[-1] antialiased before:animate-bounce before:shadow-md before:bg-fuchsia-200 before:w-full before:h-full">
          Loading...
        </h1>
      </div>
    </ReactPortal>
  );
};

export default Loader;
