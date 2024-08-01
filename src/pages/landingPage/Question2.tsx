import { Button, Flex, Modal, NumberInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { CustomDropdownInput } from "../../component/_common/CustomDropdownInput";
import api from "../../libs/axios";

// Define types for currency and country data

const MOCK_RESULT = {
  result: "success",
  documentation: "https://www.exchangerate-api.com/docs",
  terms_of_use: "https://www.exchangerate-api.com/terms",
  time_last_update_unix: 1722470401,
  time_last_update_utc: "Thu, 01 Aug 2024 00:00:01 +0000",
  time_next_update_unix: 1722556801,
  time_next_update_utc: "Fri, 02 Aug 2024 00:00:01 +0000",
  base_code: "VND",
  target_code: "USD",
  conversion_rate: 0.00003965,
  conversion_result: 594.75,
};

import { useDisclosure } from "@mantine/hooks";
import { useGetAvailableCurrencyList } from "../../hooks/useGetAvaiableCurrencyList";
const Question2 = () => {
  // const currencyList = useGetAvailableCurrencyList();

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      peer: "",
      target: "",
      value: 0,
    },
  });
  const [comparedResult, setComparedResult] = useState();
  const onSelectHandler = (field: string, value: string) => {
    form.setFieldValue(field, value);
  };
  console.log(comparedResult);
  const calculateHandler = async () => {
    // const formValues = form.getValues();
    // const exchangeResponse = await api.get(
    //   `/pair/${formValues.peer}/${formValues.target}/${formValues.value}`
    // );

    // setComparedResult(exchangeResponse.data);
    open();
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      direction={"column"}
      className="h-full py-4 "
    >
      <Flex
        direction={"column"}
        gap={16}
        className="border border-black rounded-lg p-12 shadow-lg shadow-red-300"
      >
        <Title className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Live Currency Exchange Form
        </Title>
        <NumberInput
          label="Pick your amount"
          hideControls
          allowNegative={false}
          {...form.getInputProps("value")}
        />
        {/* <CustomDropdownInput
          onConfirm={onSelectHandler}
          target="peer"
          placeHolder="Pick your currency"
          label="Pick your currency"
          data={currencyList}
        />
        <CustomDropdownInput
          onConfirm={onSelectHandler}
          target="target"
          placeHolder="Pick the target currency"
          label="Pick the target currency"
          data={currencyList}
        /> */}

        <Button onClick={calculateHandler}>Calculate</Button>
      </Flex>
      <Modal
        opened={opened}
        onClose={close}
        size={"lg"}
        title="Compare Result"
        centered
      ></Modal>
    </Flex>
  );
};

export default Question2;
