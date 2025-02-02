import { Component } from 'react';

interface State {
  throwError: boolean;
}

class ErrorButton extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { throwError: false };
  }

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Test Error');
    }

    return (
      <button className="error-button-center" onClick={this.handleClick}>
        Throw Error
      </button>
    );
  }
}

export default ErrorButton;
