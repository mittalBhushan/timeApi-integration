import * as React from "react";
// import styles from "./Resullts.module.scss";
import { IResultsProps } from "./Props";

import { PrimaryButton } from "@fluentui/react";
export const Results: React.FunctionComponent<IResultsProps> = (props: IResultsProps) => {
  // React.useEffect(() => {
  //   loadAvengers();
  // }, [filter]);
  return (
    <div>
      Welcome to results
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <PrimaryButton
          text="Start Again"
          onClick={() => {
            props.onScreenChange(0);
          }}
        />
      </div>
    </div>
  );
};
