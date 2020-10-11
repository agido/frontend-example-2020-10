import React from 'react';
import {MatchListWithConsumer, MatchListWithHooks} from './components/MatchList';
import {ProgramContext, ProgramState, ProgramDefaultState} from './ProgramContext';
import * as ProgramAPI from '../../api/program/API';
import {setInterval} from 'timers';

interface Props {}
type State = ProgramState & {
    useHooks: boolean;
};

class App extends React.Component<Props, State> {
    state = {
        ...ProgramDefaultState,
        useHooks: false
    };

    private getMatches = async () => {
        const matches = await ProgramAPI.getMatches();
        this.setState({
            matches
        });
    };

    private toggleUseHooks = () => {
        this.setState(prevState => ({
            useHooks: !prevState.useHooks
        }));
    };

    public render() {
        setInterval(this.getMatches, 60000);
        return (
            <ProgramContext.Provider value={{matches: this.state.matches, getMatches: this.getMatches}}>
                <button onClick={this.toggleUseHooks}>Toggle Consumer/Hooks</button>
                {this.state.useHooks ? <MatchListWithHooks /> : <MatchListWithConsumer />}
            </ProgramContext.Provider>
        );
    }
}

export default App;
