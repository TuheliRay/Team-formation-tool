const WelcomeScreen = ({ onStart }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-cyan-400 mb-2">
        Adaptive Team Formation Tool
      </h1>
      <p className="text-slate-400 max-w-lg mx-auto mb-8">
        Automatically create fair and balanced teams for your favorite sports. Input player
        details, and let our algorithm handle the rest, ensuring every game is competitive
        and fun.
      </p>
      <button 
        className="bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-cyan-500 transition-colors"
        onClick={onStart}>
        Start
      </button>
    </>
  );
};

export default WelcomeScreen;