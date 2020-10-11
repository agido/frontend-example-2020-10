export interface Team {
    id: string;
    label: string;
}

export interface Match {
    id: string;
    begin: number;
    homeTeam: Team;
    awayTeam: Team;
    country: string;
    league: string;
    score?: [number, number];
}
