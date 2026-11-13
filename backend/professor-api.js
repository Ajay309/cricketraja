const axios = require('axios');
const { encryptPayload } = require('./crypto');
const { fetchOddsApiMatches, fetchOddsApiOdds } = require('./odds-api');

const BASE_URL = 'https://apis.professorji.in';
const SPORTS_BASE_URL = 'https://apis.professorji.in/api';

const SPORT_ID_MAP = {
    'cricket': 4,
    'soccer': 1,
    'tennis': 2
};

const SPORT_NAME_MAP = {
    4: 'cricket',
    1: 'soccer',
    2: 'tennis'
};

/**
 * Mappers for Sports API
 */

function mapSportsMatchToInternal(match, sportName) {
    const etid = SPORT_ID_MAP[sportName] || 4;
    const iplay = match.inPlay === true || match.inPlay === 'true';
    return {
        etid: etid,
        etId: etid,
        gmid: match.gameId,
        mid: String(match.gameId),
        etype: sportName.charAt(0).toUpperCase() + sportName.slice(1),
        ename: match.eventName,
        gname: match.eventName,
        status: iplay ? 'IN-PLAY' : 'UPCOMING',
        gtype: 'match',
        iscc: 0,
        iplay: iplay,
        stime: match.startTime || new Date().toISOString().replace('T', ' ').split('.')[0],
        bname: 'MATCH_ODDS'
    };
}

function mapSportsOddsToInternal(oddsData) {
    // Professor API odds data usually comes in a specific format
    // We need to transform it to the project's Market structure
    if (!oddsData || !oddsData.market) return [];

    return oddsData.market.map(m => ({
        mid: m.marketId || m.mid,
        mname: m.marketName || m.mname || 'Match Odds',
        status: m.status || 'OPEN',
        runners: (m.runners || []).map(r => ({
            rid: r.selectionId || r.rid,
            rname: r.runnerName || r.rname,
            b1: r.backPrice || r.b1 || 0,
            bs1: r.backSize || r.bs1 || 0,
            l1: r.layPrice || r.l1 || 0,
            ls1: r.laySize || r.ls1 || 0
        }))
    }));
}

/**
 * Mappers for Casino API
 */

function mapCasinoGameToInternal(game) {
    return {
        gmid: game.gameCode,
        gname: game.gameName,
        ename: game.gameCode,
        ctype: 'lc', // Default to Live Casino, logic could be more complex
        imgpath: game.gameCode + '.jpg', 
        status: 'OPEN',
        streamURL: game.streamURL
    };
}

/**
 * API Fetchers
 */

async function fetchProfessorMatches(sportName = 'cricket') {
    // ODDS_API_KEY set hai to The Odds API use hogi, warna purana Professor API
    if (process.env.ODDS_API_KEY) return fetchOddsApiMatches(sportName);
    try {
        const response = await axios.get(`${SPORTS_BASE_URL}/${sportName}/matches`);
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(m => mapSportsMatchToInternal(m, sportName));
        }
        return [];
    } catch (error) {
        console.error(`Error fetching Professor ${sportName} matches:`, error.message);
        return [];
    }
}

async function fetchProfessorOdds(sportName, gameId) {
    if (process.env.ODDS_API_KEY) return fetchOddsApiOdds(sportName, gameId);
    try {
        const response = await axios.get(`${SPORTS_BASE_URL}/${sportName}/odds`, {
            params: { gameId }
        });
        return mapSportsOddsToInternal(response.data);
    } catch (error) {
        console.error(`Error fetching Professor ${sportName} odds for ${gameId}:`, error.message);
        return null;
    }
}

async function fetchProfessorCasinoList() {
    try {
        const response = await axios.get(`${SPORTS_BASE_URL}/casino/list`);
        if (response.data && Array.isArray(response.data)) {
            return response.data.map(mapCasinoGameToInternal);
        }
        return [];
    } catch (error) {
        console.error('Error fetching Professor casino list:', error.message);
        return [];
    }
}

async function fetchProfessorCasinoOdds(gameCode) {
    try {
        const response = await axios.get(`${BASE_URL}/api/tunnel/casino/odds/${gameCode}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching Professor casino odds for ${gameCode}:`, error.message);
        return null;
    }
}

module.exports = {
    fetchProfessorMatches,
    fetchProfessorOdds,
    fetchProfessorCasinoList,
    fetchProfessorCasinoOdds,
    SPORT_ID_MAP,
    SPORT_NAME_MAP
};