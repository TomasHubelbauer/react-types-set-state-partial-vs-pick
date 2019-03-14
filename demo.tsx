import * as React from 'react';

type DemoProps = {};

type DemoState = {
  flag: boolean;
  trueFlag: Date;
  falseFlag: Date;
}

class Demo extends React.Component<DemoProps, DemoState> {
  public readonly state: DemoState = {
    flag: false,
    trueFlag: new Date(),
    falseFlag: new Date(),
  };

  public render() {
    return (
      <>
        <button onClick={this.onFlagButtonClick}>Flag</button>
        <br />
        Flag: {this.state.flag ? 'true' : 'false'}
        <br />
        <button onClick={this.onDemoButtonClick}>Demo</button>
        True flag: {this.state.trueFlag.toLocaleString()}
        <br />
        False flag: {this.state.trueFlag.toLocaleString()}
      </>
    );
  }

  private readonly onFlagButtonClick: React.MouseEventHandler<HTMLButtonElement> = _event => {
    this.setState(state => ({ flag: !state.flag }));
  };

  private readonly onDemoButtonClick: React.MouseEventHandler<HTMLButtonElement> = _event => {
    const withPick = this.setState;
    // Note the error: Type '{ trueFlag: Date; falseFlag?: undefined; } | { falseFlag: Date; trueFlag?: undefined; }' is not assignable to type 'DemoState | Pick<DemoState, "trueFlag" | "falseFlag">'.
    withPick(state => {
      if (state.flag) {
        return { trueFlag: new Date() };
      }

      return { falseFlag: new Date() };
    });

    const withPartial: (updater: (state: DemoState) => Partial<DemoState>) => void = this.setState as any;
    withPartial(state => {
      if (state.flag) {
        return { trueFlag: new Date() };
      }

      return { falseFlag: new Date() };
    });
  };
}
