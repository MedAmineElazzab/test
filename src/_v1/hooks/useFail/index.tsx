import React from "react";

const useFail = () => {
  const [fail, setFail] = React.useState<string | undefined>(undefined);

  const ErrorContentJSX = () => {
    return (
      fail && (
        <>
          <div className="bg-[#f64b3c] text-[#fffff] w-[100%] p-[15px] mb-[30px] text-center">
            {fail}
          </div>
        </>
      )
    );
  };

  return { fail, setFail, ErrorContentJSX };
};

export default useFail;
