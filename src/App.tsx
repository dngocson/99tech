import {
  Box,
  Code,
  Group,
  MantineProvider,
  ScrollArea,
  Text,
  UnstyledButton
} from "@mantine/core";
import { useThrottledState } from "@mantine/hooks";
import { IconHelpHexagon } from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import classes from "./App.module.css";
import CustomAffix from "./component/_common/CustomAffix";
import { useCustomTheme } from "./hooks/useCustomTheme";
import { LINK_HOME, QUESTION_1, QUESTION_2, QUESTION_3 } from "./libs/constant";

const data = [
  { link: QUESTION_1, label: "Problem 1", icon: IconHelpHexagon },
  { link: QUESTION_2, label: "Problem 2", icon: IconHelpHexagon },
  { link: QUESTION_3, label: "Problem 3", icon: IconHelpHexagon },
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
        <Box
          id="top"
          className="grid grid-cols-12 bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100"
        >
          <nav className={`${classes.navbar} h-full col-span-3 `}>
            <div className={`${classes.navbarMain}`}>
              <Group
                className={`${classes.header} sticky top-[16px]`}
                justify="space-between"
              >
                <Text fw={700}>Interview Test</Text>
                <Code fw={700}>99Tech</Code>
                {links}
              </Group>
            </div>
          </nav>
          <Box className="col-span-9 h-full items-center">
            <Outlet />
          </Box>
        </Box>
        <CustomAffix position={throttledValue} />
      </ScrollArea>
    </MantineProvider>
  );
};

export default App;
