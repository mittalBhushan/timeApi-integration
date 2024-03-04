import * as React from "react";
//import styles from "./Quiz.module.scss";
import type { IQuizProps } from "./IQuizProps";
// import { escape } from '@microsoft/sp-lodash-subset';
import { Welcome } from "./Screens/Welcome";
import { Questions } from "./Screens/Questions";
import { Results } from "./Screens/Results";

interface IQuizState {
  currentScreen: number;
}
export default class Quiz extends React.Component<IQuizProps, IQuizState> {
  constructor(props: IQuizProps) {
    super(props);
    this.state = {
      currentScreen: 0,
    };
  }

  private changeScreen = (screen: number) => {
    this.setState({ currentScreen: screen });
  };
  public render(): React.ReactElement<IQuizProps> {
    const { currentScreen } = this.state;
    return (
      <div>
        {currentScreen ? (
          currentScreen === 1 ? (
            <Questions onScreenChange={this.changeScreen} context={this.props.context} />
          ) : (
            <Results onScreenChange={this.changeScreen} />
          )
        ) : (
          <Welcome onScreenChange={this.changeScreen} />
        )}
      </div>

      // <section className={`${styles.quiz} ${hasTeamsContext ? styles.teams : ''}`}>
      //   <div className={styles.welcome}>
      //     <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
      //     <h2>Well done, {escape(userDisplayName)}!</h2>
      //     <div>{environmentMessage}</div>
      //     <div>Web part property value: <strong>{escape(description)}</strong></div>
      //   </div>
      //   <div>
      //     <h3>Welcome to SharePoint Framework!</h3>
      //     <p>
      //       The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
      //     </p>
      //     <h4>Learn more about SPFx development:</h4>
      //     <ul className={styles.links}>
      //       <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
      //       <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
      //     </ul>
      //   </div>
      // </section>
    );
  }
}
