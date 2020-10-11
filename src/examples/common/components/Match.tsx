import * as React from 'react';
import styled from 'styled-components';
import * as ProgramTypes from '../../../api/program/Types';
import * as DateFormat from '../../../utils/DateFormat';

export const MINUTE_SYMBOL = String.fromCharCode(8242);

interface Props {
    match: ProgramTypes.Match;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
`;

const Row = styled.div`
    display: flex;
`;

const Time = styled.div`
    margin-right: 10px;
`;

const Country = styled.div`
    margin-right: 10px;
    color: blue;
`;

const League = styled.div`
    margin-right: 10px;
    color: green;
`;

const Team = styled.div`
    margin-right: 10px;
`;

const Score = styled.div``;

const MatchTime: React.FC<Props> = ({match}) => {
    const now = Date.now();

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const matchDay = new Date(match.begin);
    const dayName = weekDays[matchDay.getDay()];

    if (match.begin < now) {
        return <Time>{`${DateFormat.milliSecondsToFullinutes(now - match.begin)}${MINUTE_SYMBOL}`}</Time>;
    } else {
        return <Time>{`${dayName} ${DateFormat.timestampToTime(match.begin)}`}</Time>;
    }
};

const Match: React.FC<Props> = ({match}) => {
    return (
        <Container>
            <Row>
                <MatchTime match={match} />
                {match.score && <Score>{match.score.join(':')}</Score>}
            </Row>
            <Row>
                <Team>{match.homeTeam.label}</Team>
                <Team>{match.awayTeam.label}</Team>
            </Row>
            <Row>
                <Country>{match.country}</Country>
            </Row>
            <Row>
                <League>{match.league}</League>
            </Row>
        </Container>
    );
};

export default Match;
