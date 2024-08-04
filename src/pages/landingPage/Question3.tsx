import { Code, Flex, Title } from "@mantine/core";

const Answer = `
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

// EXTEND CLASSESS
interface FormattedWalletBalance extends WalletBalance { 
  formatted: string;
}

// REFACTOR FUNCTION, MOVE OUTSIDE COMPONENT
const PRIORITIES = {
  Osmosis: 100,
  Ethereum: 50, // updated to match the function
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
  Default: 0
};


const DEFAULT_PRIORITY = PRIORITIES.Default;

const getPriority = (blockchain: string): number => { 
  return PRIORITIES[blockchain] ?? DEFAULT_PRIORITY;
};


export const WalletPage: React.FC<BoxProps> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  // USE CONSTANT FOR MAGIC NUMBER
  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          balance.blockchain in PRIORITIES && balance.amount <= 0
      )
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        return rightPriority - leftPriority;
      });
  }, [balances]);

  const rows = useMemo(
    () =>
      sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;

        return (
          <WalletRow
            key={index}  
            className={classes.row}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      }),
    [prices, sortedBalances]
  );

  return <div {...rest}>{rows}</div>;
};`;
const Question3 = () => {
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
        <Title className="">Refactor code </Title>
        <Code className="text-lg" block>
          {Answer}
        </Code>
      </Flex>
    </Flex>
  );
};

export default Question3;
