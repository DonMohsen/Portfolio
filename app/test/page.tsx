const TestPage = ({ buildTimestamp }:any) => {
    return (
      <p className="pt-[200px] bg-green-800 w-full">
        Hello From my next.js app!
        App built at: {buildTimestamp}
      </p>
    )
  }

  export default TestPage;