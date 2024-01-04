interface Scores {
	s_15: number;
	s_30: number;
	s_45: number;
	s_60: number;
	m_15: number;
	m_30: number;
	m_45: number;
	m_60: number;
	l_15: number;
	l_30: number;
	l_45: number;
	l_60: number;
}

type ScoreRecord = {
	alias: string;
	id: string;
	scores: Scores;
};