import * as React from "react";
import styles from "./Welcome.module.scss";
import { IWelcomeProps } from "./Props";
import { PrimaryButton } from "@fluentui/react";

export const Welcome: React.FunctionComponent<IWelcomeProps> = (props: IWelcomeProps) => {
  // React.useEffect(() => {
  //   loadAvengers();
  // }, [filter]);

  return (
    <div className={styles.quiz}>
      Welcome to Time API Quiz
      <div className={styles.welcome}>
        <PrimaryButton
          text="Take Quiz"
          onClick={() => {
            props.onScreenChange(1);
          }}
        />
      </div>
    </div>
  );
};
