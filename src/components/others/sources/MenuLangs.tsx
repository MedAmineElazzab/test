import { DropDownArrowIcon } from "@/components/icons";
import { LANGS } from "@/enum";
import { Listbox } from "@headlessui/react";
import { useState } from "react";

export function MenuLangsSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState<LANGS>(LANGS.FR);
  const handleLanguageChange = (lang: LANGS) => {
    setSelectedLanguage(lang);
  };
  return (
    <div className="relative h-fit m-0 p-0">
      <Listbox value={selectedLanguage} onChange={handleLanguageChange}>
        <Listbox.Button className="flex items-center gap-3">
          <span className="capitalize font-medium text-sm">
            {selectedLanguage}
          </span>
          <DropDownArrowIcon className="text-gray-500 w-3 h-3" />
        </Listbox.Button>
        <Listbox.Options className="absolute top-8 w-20 shadow bg-white z-20 rounded border border-gray-200 p-1">
          {Object.entries(LANGS).map(([value, label]) => {
            return (
              <Listbox.Option
                key={label}
                className="uppercase hover:bg-gray-100 rounded cursor-pointer px-2 py-2 text-sm"
                value={label}
              >
                {value}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
