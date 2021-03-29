import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

const CodeViewer = (props) => {
  function onChange(newValue) {
    console.log("change", newValue);
  }
  return (
    <div
      style={{
        height: "100%",
        width: "100%",

        padding: "2px 2px 2px 2px",
        backgroundImage: "linear-gradient(to bottom,#FFFFFF,#B443F1)",
      }}
    >
      <AceEditor
        mode="java"
        theme="monokai"
        readOnly
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        showGutter={false}
        style={{ height: "100%", width: "100%" }}
        editorProps={{ $blockScrolling: true }}
      />
    </div>
  );
};

export default CodeViewer;
