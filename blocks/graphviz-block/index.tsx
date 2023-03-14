import { FileBlockProps } from "@githubnext/blocks";
import { Box } from "@primer/react";
import graphviz from "graphviz-wasm";
import { useState, useEffect } from "react";
import "./style.css";

export default function GrpahvizFileBlock(props: FileBlockProps) {
  const { content } = props;

  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    graphviz.loadWASM()
      .then(() => {
        setSvg(graphviz.layout(content));
      })
      .catch((error) => {
        setError(error.message);
      })
  }, []);

  if (error !== "") {
    return (
      <Box p={4} className="graphviz-block error">
        <strong>Failed to render graphviz file: </strong>
        {error}
      </Box>
    );
  }

  return (
    <Box p={4} dangerouslySetInnerHTML={{ __html: svg }} className="graphviz-block" />
  );
}
