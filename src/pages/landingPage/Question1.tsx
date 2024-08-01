import {
  Button,
  Code,
  Divider,
  Flex,
  NumberInput,
  Text,
  Title,
} from "@mantine/core";
import { memo, useCallback, useState } from "react";

const Tryout = memo(({ fn }: { fn: (number: number) => number }) => {
  const [value, setValue] = useState(0);
  const [inputValue, setInputValue] = useState(0);
  return (
    <>
      <Text>Try out:</Text>
      <Flex align={"center"} justify={"space-between"}>
        <Flex gap={6}>
          <NumberInput
            value={inputValue}
            onChange={(n) => {
              setInputValue(n as number);
            }}
            hideControls
            allowDecimal={false}
            allowNegative={false}
          />
          <Button onClick={() => setValue(fn(inputValue))}>Calculate</Button>
        </Flex>
        <Text>{value}</Text>
      </Flex>
    </>
  );
});

const Question1 = () => {
  // SOLUTION 1
  const solution_1 = `
    const sum_to_n_a = (n:number) =>{
    let sum = 0;
    for (let i = 0; i<=n; i++){
        sum += i
    }
    return sum
    }
  `;
  const sum_to_n_a = useCallback((n: number) => {
    let sum = 0;
    for (let i = 0; i <= n; i++) {
      sum += i;
    }
    return sum;
  }, []);

  // SOLUTION 2
  const solution_2 = `
    const sum_to_n_b = (n: number): number => {
    return Array.from({ length: n + 1 }, (_, i) => i).reduce((acc, curr) => acc + curr, 0);
    }
  `;
  const sum_to_n_b = (n: number): number => {
    return Array.from({ length: n + 1 }, (_, i) => i).reduce(
      (acc, curr) => acc + curr,
      0
    );
  };
  const solution_3 = `
    let sum = 0;
    Array.from({ length: n + 1 }, (_, i) => i).forEach(num => {
        sum += num;
    });
    return sum;
  `;
  const sum_to_n_c = (n: number): number => {
    let sum = 0;
    Array.from({ length: n + 1 }, (_, i) => i).forEach((num) => {
      sum += num;
    });
    return sum;
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      direction={"column"}
      className="h-full py-4"
    >
      <Flex
        direction={"column"}
        gap={16}
        className="border border-black rounded-lg p-12 shadow-lg shadow-red-300"
      >
        <Title className="">Problem 1: Three ways to sum to n </Title>
        <Flex direction={"column"} gap={16}>
          <Text>Solution 1:</Text>
          <Code block>{solution_1}</Code>
          <Tryout fn={sum_to_n_a} />

          <Divider my="md" />
          <Text>Solution 2:</Text>
          <Code block>{solution_2}</Code>
          <Tryout fn={sum_to_n_b} />
          <Divider my="md" />
          <Text>Solution 3:</Text>
          <Code block>{solution_3}</Code>
          <Tryout fn={sum_to_n_c} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Question1;
