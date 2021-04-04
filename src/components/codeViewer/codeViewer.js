import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import { Resizable } from "re-resizable";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const CodeViewer = (props) => {
  function onChange(newValue) {
    console.log("change", newValue);
  }
  return (
    <Resizable
      defaultSize={{
        width: 400,
        height: 600,
      }}
      maxHeight={600}
      maxWidth = {500}
    >
      <AceEditor
        mode="javascript"
        
        theme="monokai"
        showPrintMargin={false}

        readOnly
        value={props.code}
        name="UNIQUE_ID_OF_DIV"
        showGutter={true}
        style={{ height: "100%", width: "100%" }}
        editorProps={{ $blockScrolling: true }}
      />
    </Resizable>
  );
};

export default CodeViewer;
