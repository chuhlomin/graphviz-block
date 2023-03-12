import { FileBlockProps } from "@githubnext/blocks";
import { Box } from "@primer/react";
import graphviz from "graphviz-wasm";
import { useState, useEffect } from "react";

export default function GrpahvizFileBlock(props: FileBlockProps) {
  const { content } = props;

  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    graphviz.loadWASM()
      .then(() => {
        console.log("loaded wasm");
        setSvg(graphviz.layout(content));
      })
      .catch((error) => {
        console.error(error);
        setError('error');
      })
  }, []);

  if (error !== "") {
    return (
        <h1>Error</h1>
    );
  }

  return (
    <Box p={4} dangerouslySetInnerHTML={{ __html: svg }} />
  );
}
