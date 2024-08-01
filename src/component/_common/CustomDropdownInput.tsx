import { Combobox, Flex, Text, TextInput, useCombobox } from "@mantine/core";
import { useState } from "react";

interface ICustomDropdownInputProps {
  data: {
    Country: string;
    CountryCode: string;
    Currency: string;
    Code: string;
  }[];
  label: string;
  placeHolder: string;
  target: string;
  onConfirm: (field: string, value: string) => void;
}

export function CustomDropdownInput({
  data,
  label,
  placeHolder,
  target,
  onConfirm,
}: ICustomDropdownInputProps) {
  const combobox = useCombobox();
  const [value, setValue] = useState("");

  const shouldFilterOptions = !data.some((item) => item.Country === value);
  const filteredOptions = shouldFilterOptions
    ? data.filter(
        (item) =>
          item.Country.toLowerCase().includes(value.toLowerCase().trim()) ||
          item.Code.toLowerCase().includes(value.toLowerCase().trim())
      )
    : data;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.Code} key={item.Country}>
      <Flex gap={"4"} align={"center"}>
        <Text fw={700}>{item.Code}</Text>
        <Text>{item.Country}</Text>
        <img
          className="w-[25px] h-[25px]"
          src={`https://flagsapi.com/${item.CountryCode}/flat/64.png`}
        />
      </Flex>
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        onConfirm(target, optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      withinPortal={false}
      classNames={{
        dropdown: "max-h-[300px] overflow-y-auto",
      }}
    >
      <Combobox.Target>
        <TextInput
          label={label}
          placeholder={placeHolder}
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);

            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 ? (
            <Combobox.Empty>Nothing found</Combobox.Empty>
          ) : (
            options
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
