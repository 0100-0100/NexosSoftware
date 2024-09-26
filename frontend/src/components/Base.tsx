import React, { Component, ReactNode } from 'react';

// Define the props and state types
interface BaseComponentProps {
  title: string;
}

interface BaseComponentState {
  isLoading: boolean;
}

export class BaseComponent extends Component<BaseComponentProps, BaseComponentState> {
  constructor(props: BaseComponentProps) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    // Simulate data fetching
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  renderContent(): ReactNode {
    return <div>Content goes here...</div>;
  }

  render() {
    const { title } = this.props;
    const { isLoading } = this.state;

    return (
      <div>
        <h1>{title}</h1>
        {isLoading ? <p>Loading...</p> : this.renderContent()}
      </div>
    );
  }
}
