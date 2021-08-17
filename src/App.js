import logo from './logo.png';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
//import './Popout.js';

interface Props {
    title: string;                          // The title of the popout window
    closeWindow: () => void;                // Callback to close the popout
}

interface State {
    externalWindow: Window | null;          // The popout window
    containerElement: HTMLElement | null;   // The root element of the popout window
}

class Popout extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            externalWindow: null,
            containerElement: null
        };
    }

    // When we create this component, open a new window
    componentDidMount() {
        const features = 'width=800, height=500, left=300, top=200';
        const externalWindow = window.open('', '', features);

        let containerElement = null;
        if (externalWindow) {
            containerElement = externalWindow.document.createElement('div');
            externalWindow.document.body.appendChild(containerElement);

            // Copy the app's styles into the new window
            const stylesheets = Array.from('./App.css');
            stylesheets.forEach(stylesheet => {
                const css = (stylesheet = CSSStyleSheet);

                if (stylesheet.href) {
                    const newStyleElement = document.createElement('link');
                    newStyleElement.rel = 'stylesheet';
                    newStyleElement.href = stylesheet.href;
                    externalWindow.document.head.appendChild(newStyleElement);
                } else if (css && css.cssRules && css.cssRules.length > 0) {
                    const newStyleElement = document.createElement('style');
                    Array.from(css.cssRules).forEach(rule => {
                        newStyleElement.appendChild(document.createTextNode(rule.cssText));
                    });
                    externalWindow.document.head.appendChild(newStyleElement);
                };
            });

            externalWindow.document.title = this.props.title;

            // Make sure the window closes when the component unloads
            externalWindow.addEventListener('beforeunload', () => {
                this.props.closeWindow();
            });
        };

        this.setState({
            externalWindow: externalWindow,
            containerElement: containerElement
        });
    };

    // Make sure the window closes when the component unmounts
    componentWillUnmount() {
        if (this.state.externalWindow) {
            this.state.externalWindow.close();
        };
    };

    render() {
        if (!this.state.containerElement) {
            return null;
        };

        // Render this component's children into the root element of the popout window
        return ReactDOM.createPortal(this.props.children, this.state.containerElement);
    };
};

export default class App extends Popout {
  constructor() {
      super();
      this.state = {
          showPopout: false
      };
  };

  // This sets the above state variable
  setPopoutOpen(open: boolean) {
      this.setState({
          showPopout: open
      });
  };

  // When this component is unloaded, make sure we close the popout
  componentDidMount() {
      window.addEventListener('beforeunload', () => {
          this.setPopoutOpen(false);
      });
  };

  // This returns the HTML for the popout, or null if the popout isn't visible
  getPopout() {
      if (!this.state.showPopout) {
          return null;
      }

      return (
          <Popout title='Hello world!' closeWindow={() => this.setPopoutOpen(false)}>
              <div><p>Hello again!</p></div>
          </Popout>
      );
  };

  // Render the popout and a button to show / hide it
  render() {
      return (
          <div classname="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p></p>
              {this.getPopout()}
              <button onClick={() => this.setPopoutOpen(!this.state.showPopout)}>
                  Hello world!
              </button>
            </header>
          </div>
      );
  };
};

//function App() extends NewPopout { //functions can't extend
//  render (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <button>
//          Hello world!
//        </button>
//      </header>
//    </div>
//  );
//}

//export default App;
