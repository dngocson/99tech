import {
  Combobox,
  Flex,
  Text,
  TextInput,
  Tooltip,
  useCombobox,
} from "@mantine/core";

interface ICustomDropdownInputProps<
  T extends keyof { peer: string; target: string }
> {
  data: {
    Country: string;
    CountryCode: string;
    Currency: string;
    Code: string;
  }[];
  label: string;
  placeHolder: string;
  target: T;
  form: {
    onChange: (field: T, value: string) => void;
    setFieldValue: (field: T, value: string) => void;
    values: Record<T, string>;
    errors: Record<T, string>;
  };
  onConfirm: (field: T, value: string) => void;
}

export function CustomDropdownInput<
  T extends keyof { peer: string; target: string }
>({
  data,
  label,
  form,
  placeHolder,
  target,
  onConfirm,
}: ICustomDropdownInputProps<T>) {
  const combobox = useCombobox();

  const shouldFilterOptions = !data.some(
    (item) => item.Country === form.values[target]
  );
  const filteredOptions = shouldFilterOptions
    ? data.filter(
        (item) =>
          item.Country.toLowerCase().includes(
            form.values[target].toLowerCase().trim()
          ) ||
          item.Code.toLowerCase().includes(
            form.values[target].toLowerCase().trim()
          )
      )
    : data;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.Code} key={item.Country}>
      <Flex gap={"4"} align={"center"} className="">
        <img
          className="w-[25px] h-[25px] "
          src={`https://flagsapi.com/${item.CountryCode}/flat/64.png`}
        />
        <div className="flex items-center">
          <Text fw={700} className="truncate">
            {item.Code}
          </Text>
        </div>
        -
        <div className="flex items-center">
          <Text fw={700} className="truncate">
            {item.Currency}
          </Text>
        </div>
        <Tooltip className="flex items-center ml-auto" label={item.Country}>
          <div className="flex ml-auto items-center">
            <Text fz={12} className=" truncate">
              {item.Country}
            </Text>
          </div>
        </Tooltip>
      </Flex>
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        form.setFieldValue(target, optionValue);
        onConfirm(target, optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
      withinPortal={false}
      position="bottom-start"
      classNames={{
        dropdown: "max-h-[300px] !w-[380px] overflow-y-auto",
      }}
    >
      <Combobox.Target>
        <TextInput
          size="lg"
          label={label}
          placeholder={placeHolder}
          value={form.values[target]}
          onChange={(event) => {
            form.setFieldValue(target, event.currentTarget.value);

            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
          error={form.errors[target] && form.errors[target]}
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
