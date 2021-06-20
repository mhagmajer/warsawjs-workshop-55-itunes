import "./App.css";
import {
  Badge,
  Stack,
  Button,
  UnorderedList,
  ListItem,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AspectRatio,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

function DetailsModal({ result }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [artist, setArtist] = useState();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    (async () => {
      const artistResult = await fetch(
        `https://itunes.apple.com/lookup?id=${result.artistId}`
      );
      const data = await artistResult.json();
      setArtist(data.results[0]);
    })();
  }, [isOpen, result]);

  return (
    <>
      <Button colorScheme="orange" onClick={onOpen}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{result.trackName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {artist && (
              <Badge>
                {artist.artistName} ({artist.primaryGenreName})
              </Badge>
            )}
            <AspectRatio maxW="560px" ratio={1}>
              <iframe title="naruto" src={result.previewUrl} allowFullScreen />
            </AspectRatio>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function Itunes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  return (
    <Stack direction="column">
      <Stack direction="row">
        <Input
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <Button
          colorScheme="blue"
          onClick={async () => {
            const result = await fetch(
              `https://itunes.apple.com/search?term=${encodeURIComponent(
                searchTerm
              )}&entity=musicVideo`
            );
            const data = await result.json();
            setResults(data.results);
          }}
        >
          Search
        </Button>
      </Stack>
      <UnorderedList>
        {results.map((result) => (
          <ListItem key={result.trackId}>
            {result.trackName} ({result.artistName})
            <DetailsModal result={result} />
          </ListItem>
        ))}
      </UnorderedList>
    </Stack>
  );
}

function App(props) {
  // const result = useState(0);
  // const count = result[0];
  // const setCount = result[1];
  const [count, setCount] = useState(5);

  return (
    <div className="App">
      <header className="App-header">
        <Stack direction="column">
          <Itunes />
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
        </Stack>
      </header>
    </div>
  );
}

export default App;
