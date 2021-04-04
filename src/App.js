import './App.css';
import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

import { Col, Row ,Card} from 'react-bootstrap';
import * as providers from "./contexts";
import { useAlgorithmState } from "./contexts";
import * as algorithms from "./algorithms";


import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";

import ArrayDisplay from "./components/array/array";
import BarArrayDisplay from "./components/array/barArray";
import StackQueueDisplay from "./components/stackQueue/stackQueue";
import GraphScreen from "./components/graph/graph";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      ></Drawer>
      <main className={classes.content}>
        <ArrayDisplay
          title={"Visited array"}
          titleVisible={false}
        ></ArrayDisplay>
        <BarArrayDisplay
          title={"Visited array"}
          height="200"
          titleVisible={true}
        ></BarArrayDisplay>
        <StackQueueDisplay
          title={"Visited array"}
          height="200"
          titleVisible={true}
        ></StackQueueDisplay>
        <providers.AdjListProvider>
          <providers.GraphStatusProvider>
            <providers.GraphProcessProvider>
              <GraphScreen></GraphScreen>
            </providers.GraphProcessProvider>
          </providers.GraphStatusProvider>
        </providers.AdjListProvider>
      </main>
    </div>
  );
}
