import { Affix, Button, Transition, rem } from "@mantine/core";
import { IconArrowUp } from "@tabler/icons-react";
interface ICustomAffix {
  position: { x: number; y: number };
}
function CustomAffix({ position }: ICustomAffix) {
  const handleScroll = () => {
    const element = document.getElementById("top");
    element?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <Affix position={{ bottom: 20, right: 50 }}>
      <Transition transition="slide-up" mounted={position.y > 200}>
        {(transitionStyles) => (
          <Button
            leftSection={
              <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
            }
            style={transitionStyles}
            onClick={handleScroll}
          >
            Back to top
          </Button>
        )}
      </Transition>
    </Affix>
  );
}

export default CustomAffix;
