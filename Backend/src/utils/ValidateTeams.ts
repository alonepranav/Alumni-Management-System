import { APP_ALLOWED_TEAMS } from "../constants";

const ValidateTeams = (teams: string): boolean => {
    const validFormat = /^[a-zA-Z0-9.@]+$/;

    if (!validFormat.test(teams) || /\s/.test(teams)) return false; // Explicit space check

    return APP_ALLOWED_TEAMS.some(id => teams.endsWith(id));
};

export default ValidateTeams;
