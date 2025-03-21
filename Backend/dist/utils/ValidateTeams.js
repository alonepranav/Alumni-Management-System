"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const ValidateTeams = (teams) => {
    const validFormat = /^[a-zA-Z0-9.@]+$/;
    if (!validFormat.test(teams) || /\s/.test(teams))
        return false; // Explicit space check
    return constants_1.APP_ALLOWED_TEAMS.some(id => teams.endsWith(id));
};
exports.default = ValidateTeams;
