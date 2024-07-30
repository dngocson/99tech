import {
  Box,
  Code,
  Flex,
  Group,
  MantineProvider,
  ScrollArea,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useThrottledState } from "@mantine/hooks";
import {
  IconBellRinging,
  IconFingerprint,
  IconReceipt2,
} from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import classes from "./App.module.css";
import CustomAffix from "./component/_common/CustomAffix";
import { useCustomTheme } from "./hooks/useCustomTheme";
import { LINK_HOME, QUESTION_1, QUESTION_2, QUESTION_3 } from "./libs/constant";

const data = [
  { link: QUESTION_1, label: "Question 1", icon: IconBellRinging },
  { link: QUESTION_2, label: "Question 2", icon: IconReceipt2 },
  { link: QUESTION_3, label: "Question 3", icon: IconFingerprint },
];

const App = () => {
  const theme = useCustomTheme();
  const [throttledValue, setThrottledValue] = useThrottledState(
    { x: 0, y: 0 },
    300
  );
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState(QUESTION_1);

  useEffect(() => {
    if (location.pathname === LINK_HOME) navigate(QUESTION_1);
  }, [location, navigate]);

  const handleButtonClick = useCallback(
    (link: string) => {
      setActive(link);
      navigate(link);
    },
    [setActive, navigate]
  );

  const links = useMemo(
    () =>
      data.map((item) => (
        <UnstyledButton
          onClick={() => handleButtonClick(item.link)}
          className={classes.link}
          key={item.link}
          {...(active === item.link && { "data-active": true })}
        >
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <span>{item.label}</span>
        </UnstyledButton>
      )),
    [active, handleButtonClick]
  );

  return (
    <MantineProvider withGlobalClasses theme={theme}>
      <ScrollArea
        type="scroll"
        scrollbars="y"
        className="relative"
        style={{ height: "100vh" }}
        onScrollPositionChange={setThrottledValue}
      >
        <Flex>
          <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
              <Group className={classes.header} justify="space-between">
                <Text fw={700}>Interview Test</Text>
                <Code fw={700}>99Tech</Code>
              </Group>
              {links}
            </div>
          </nav>
          <Box className="flex-1">
            <Outlet />
          </Box>
        </Flex>
        <CustomAffix position={throttledValue} />
      </ScrollArea>
    </MantineProvider>
  );
};

export default App;
