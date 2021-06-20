import "./App.css";
import { Badge, Stack, Button } from "@chakra-ui/react";
import { useState } from "react";

function App(props) {
  // const result = useState(0);
  // const count = result[0];
  // const setCount = result[1];
  const [count, setCount] = useState(5);

  return (
    <div className="App">
      <header className="App-header">
        <Stack direction="row">
          <Badge>{count}</Badge>
          <Button
            colorScheme="green"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              setCount(count - 1);
            }}
          >
            -
          </Button>
        </Stack>
      </header>
    </div>
  );
}

export default App;
