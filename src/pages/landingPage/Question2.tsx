import {
  Button,
  Flex,
  NumberFormatter,
  NumberInput,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowsLeftRight } from "@tabler/icons-react";
import { format } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { CustomDropdownInput } from "../../component/_common/CustomDropdownInput";
import { useGetAvailableCurrencyList } from "../../hooks/useGetAvaiableCurrencyList";
import api from "../../libs/axios";
import { cn } from "../../utils/cn";
// Define types for currency and country data

interface ExchangeResult {
  result: string;
  documentation: string;
  terms_of_use: string;
  time_last_update_unix: number;
  time_last_update_utc: string;
  time_next_update_unix: number;
  time_next_update_utc: string;
  base_code: string;
  target_code: string;
  conversion_rate: number;
  conversion_result: number;
}

const Question2 = () => {
  const currencyList = useGetAvailableCurrencyList();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      peer: "",
      target: "",
      value: 0,
    },
  });
  const [comparedResult, setComparedResult] = useState<ExchangeResult>();
  const onSelectHandler = (field: string, value: string) => {
    form.setFieldValue(field, value);
  };

  const handleSwapFields = useCallback(() => {
    const currentPeer = form.values.peer;
    const currentTarget = form.values.target;
    form.setFieldValue("peer", currentTarget);
    form.setFieldValue("target", currentPeer);
  }, [form]);

  const calculateHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const { target, peer, value } = form.getValues();

      // Validate form fields
      let hasError = false;
      if (!target) {
        form.setFieldError("target", "This field can't be empty");
        hasError = true;
      }
      if (!peer) {
        form.setFieldError("peer", "This field can't be empty");
        hasError = true;
      }
      if (value === 0) {
        form.setFieldError("value", "Please pick a valid value");
        hasError = true;
      }

      if (!hasError && target === peer) {
        form.setFieldError("target", "Target cannot be equal to peer");
        return;
      }
      // Fetch exchange rate
      if (!hasError) {
        const exchangeResponse = await api.get(
          `/pair/${peer}/${target}/${value}`
        );
        setComparedResult(exchangeResponse.data);
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    } finally {
      setIsLoading(false);
    }
  }, [form]);

  const Result = useMemo(
    () => (
      <Flex direction={"column"}>
        <NumberFormatter
          className="font-bold text-xl"
          suffix={comparedResult?.target_code}
          value={comparedResult?.conversion_result}
          thousandSeparator
        />

        <Flex direction={"column"} my={16}>
          <Text>Current Exchange Rate:</Text>
          <Text>
            1{comparedResult?.base_code} = {comparedResult?.conversion_rate}
            {comparedResult?.target_code}
          </Text>
          <Text>
            This data was last updated at{" "}
            {comparedResult?.time_last_update_unix &&
              format(
                new Date(comparedResult.time_last_update_unix * 1000),
                "dd/MM/yyyy-hhaa"
              )}{" "}
            on{" "}
            <a href="https://www.exchangerate-api.com" target="blank">
              https://www.exchangerate-api.com
            </a>
          </Text>
        </Flex>
      </Flex>
    ),
    [comparedResult]
  );

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
        <Title className="bg-gradient-to-r text-center from-blue-600 via-green-500 mb-8 to-indigo-400 inline-block text-transparent bg-clip-text">
          Live Currency Exchange Form
        </Title>
        <Flex gap={16}>
          <NumberInput
            size="lg"
            label="Pick your amount"
            hideControls
            allowNegative={false}
            {...form.getInputProps("value")}
          />
          <CustomDropdownInput
            onConfirm={onSelectHandler}
            target="peer"
            placeHolder="Pick your currency"
            label="Pick your currency"
            data={currencyList}
            form={form as any}
          />
          <UnstyledButton
            className={cn("rounded-full self-end text-blue-500", {
              "self-center": Object.keys(form.errors).length > 0,
            })}
            onClick={handleSwapFields}
          >
            <IconArrowsLeftRight
              size={48}
              strokeWidth={2}
              color={"blue"}
              className="bg-white p-2 rounded-full border border-gray-500 hover:border-blue-600"
            />
          </UnstyledButton>
          <CustomDropdownInput
            onConfirm={onSelectHandler}
            target="target"
            placeHolder="Pick the target currency"
            label="Pick the target currency"
            data={currencyList}
            form={form as any}
          />

          <Button
            disabled={isLoading}
            size="lg"
            className={cn(
              "disabled:bg-slate-500 self-end disabled:text-white",
              {
                "self-center": Object.keys(form.errors).length > 0,
              }
            )}
            onClick={calculateHandler}
          >
            Convert
          </Button>
        </Flex>
        {comparedResult && Result}
      </Flex>
    </Flex>
  );
};

export default Question2;
