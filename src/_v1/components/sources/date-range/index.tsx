import { Menu, Transition } from "@headlessui/react";
import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  Fragment,
} from "react";
import { format, isValid, parse } from "date-fns";
import {
  DayPicker,
  SelectSingleEventHandler,
  DateRange as DR,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
import { DateIcon } from "@/_v1/icons";
import moment from "moment-timezone";
import { useRouter } from "next/router";
import DateFilterIcon from "@/_v1/icons/sources/DateFilterIcon";

interface InputValue {
  from?: string;
  to?: string;
}

interface Props {
  handleRange: (field: any, value: string) => void;
}

const DateRange = ({ handleRange }: Props) => {
  const { query, push } = useRouter();
  const [range, setRange] = useState<DR | undefined>(undefined);
  const [inputValue, setInputValue] = useState<InputValue | undefined>({
    from: "",
    to: "",
  });
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof InputValue
  ) => {
    setInputValue({ ...inputValue, [key]: e.currentTarget.value });
    const date = parse(e.currentTarget.value, "y-MM-dd", new Date());
    if (isValid(date)) {
      setRange({ ...range, [key]: date } as DR);
    }
    // else {
    //   //   setSelected(undefined);
    // }
  };
  const handleDaySelect = (dates: any) => {
    // console.log(range);
    if (dates) {
      setRange(dates);
      setInputValue({
        from: dates?.from ? format(dates?.from, "y-MM-dd") : "",
        to: dates?.to ? format(dates?.to, "y-MM-dd") : "",
      });
      handleRange("dateStart", moment(dates?.from).format("YYYY-MM-DD"));
      handleRange("dateEnd", moment(dates?.to).format("YYYY-MM-DD"));
    }
  };
  // useEffect(() => {
  //   handleDaySelect();
  // }, [range]);

  const handleQueryValues = () => {
    if (query?.dateStart && query?.dateEnd) {
      setInputValue({
        from: String(query?.dateStart),
        to: String(query?.dateEnd),
      });
      setRange({
        from: parse(String(query?.dateStart), "y-MM-dd", new Date()),
        to: parse(String(query?.dateEnd), "y-MM-dd", new Date()),
      });
    }
  };

  const handleCancel = () => {
    setRange(undefined);
    setInputValue(undefined);

    handleRange("dateStart", "");
    handleRange("dateEnd", "");
  };

  useEffect(() => {
    handleQueryValues();
  }, [query]);

  return (
    <div className="flex justify-center items-center">
      <Menu as="div" className="relative flex flex-col items-end w-[100%]">
        {({ open }) => (
          <>
            <div className="flex w-[100%] h-[45.6px] items-center justify-center">
              <Menu.Button className="w-[100%]" disabled={open}>
                <div className="relative flex gap-[10px] items-center w-[100%]">
                  <div className="relative h-[45.6px]  w-[100%] flex items-center">
                    <DateFilterIcon className="text-[#adb5bd] mt-[-2px]  absolute left-[10px]" />
                    <input
                      size={12}
                      type="text"
                      placeholder={format(new Date(), "y-MM-dd")}
                      value={inputValue?.from ? `  ${inputValue.from}  to  ${inputValue.to || ''}  ` : ''}
                      onChange={(e) => handleInputChange(e, "from")}
                      className="w-[100%] rounded-[4px] h-[100%] border-[1px] border-[#adb5bd] text-[#475569] text-[14px] p-[15px] pl-[35px] focus:!border-[#0049E0] focus:outline-none"
                    />
                  </div>
                  {/* <div className="relative h-[45.6px] max-w-[50%] w-[100%] flex items-center">
                    <DateFilterIcon className="text-[#adb5bd] mt-[-2px]  absolute left-[10px]" />
                    <input
                      size={12}
                      type="text"
                      placeholder={format(new Date(), "y-MM-dd")}
                      value={inputValue?.to || ""}
                      onChange={(e) => handleInputChange(e, "to")}
                      className="w-[100%]  rounded-[4px] h-[100%] border-[1px] border-[#adb5bd] text-[#475569] text-[14px] p-[15px] pl-[35px] focus:!border-[#0049E0] focus:outline-none"
                    />
                  </div> */}
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className={`
                  absolute mt-[37.5px] 
                  origin-top-right divide-y rounded-[2px]  shadow-lg
                  ring-1 ring-black ring-opacity-5 focus:outline-none
                  bg-[#ffffff] top-[calc(100%-30px)] right-[0%] z-[10]
                `}
              >
                <div className="flex flex-col gap-[10px]">
                  <DayPicker
                    mode="range"
                    numberOfMonths={2}
                    selected={range}
                    onSelect={(dates) => handleDaySelect(dates)}
                  />
                  <div className="flex justify-between px-[25px] items-center pb-[20px]">
                    <div className="">
                      {/* <p>{JSON.stringify(range)}</p> */}
                      <p className="leading-0 text-[14px] opacity-[0.75]">{`${moment(
                        range?.from
                      ).format("DD MMMM")} - ${moment(range?.to).format(
                        "DD MMMM, YYYY"
                      )}`}</p>
                    </div>
                    <div className="">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className="w-[125px] h-[40px] text-[16px] border rounded-[4px] text-white bg-primary-normal hover:bg-primary-light hover:text-primary-normal border-primary-normal"
                            type="button"
                            onClick={handleCancel}
                          >
                            Réinitialiser
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default DateRange;
