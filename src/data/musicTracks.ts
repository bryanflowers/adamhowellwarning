export interface MusicTrack {
  id: number;
  title: string;
  genre: string;
  description: string;
  audioUrl: string;
  duration: string;
}

// Placeholder data — audio URLs will be populated after Suno generation
export const musicTracks: MusicTrack[] = [
  {
    id: 1,
    title: "Rug Pull King",
    genre: "Hip-Hop",
    description: "The SuperDoge scam and how investors got played",
    audioUrl: "",
    duration: "3:24",
  },
  {
    id: 2,
    title: "Shadow COO",
    genre: "Rock",
    description: "Keith Shingleton's hidden role behind the curtain",
    audioUrl: "",
    duration: "3:45",
  },
  {
    id: 3,
    title: "Bangkok Runner",
    genre: "Country",
    description: "Fleeing justice across borders to Thailand",
    audioUrl: "",
    duration: "3:12",
  },
  {
    id: 4,
    title: "Deleted Domains",
    genre: "Electronic",
    description: "How digital evidence was systematically erased",
    audioUrl: "",
    duration: "4:01",
  },
  {
    id: 5,
    title: "The Whitepaper Blues",
    genre: "Jazz",
    description: "Smoke Exchange promises that went up in smoke",
    audioUrl: "",
    duration: "3:55",
  },
  {
    id: 6,
    title: "Charity Lies",
    genre: "Pop",
    description: "Fake donations and stolen goodwill",
    audioUrl: "",
    duration: "3:18",
  },
  {
    id: 7,
    title: "DopeCoin Dreams",
    genre: "Reggae",
    description: "The pump-and-dump scheme that took it all",
    audioUrl: "",
    duration: "3:40",
  },
  {
    id: 8,
    title: "Web of Accomplices",
    genre: "Metal",
    description: "The inner circle that enabled the fraud",
    audioUrl: "",
    duration: "4:15",
  },
  {
    id: 9,
    title: "Anonymous Pitch",
    genre: "R&B",
    description: "The mysterious podcast appearance with hidden identity",
    audioUrl: "",
    duration: "3:30",
  },
  {
    id: 10,
    title: "Vanished Promises",
    genre: "Folk",
    description: "Abandoned projects and broken commitments",
    audioUrl: "",
    duration: "3:22",
  },
  {
    id: 11,
    title: "Burn the Ledger",
    genre: "Punk",
    description: "Destroying financial records to cover the trail",
    audioUrl: "",
    duration: "2:48",
  },
  {
    id: 12,
    title: "Midnight Wallets",
    genre: "Blues",
    description: "Moving stolen funds under cover of darkness",
    audioUrl: "",
    duration: "4:05",
  },
  {
    id: 13,
    title: "Paper Trail",
    genre: "Lo-Fi",
    description: "Following the breadcrumbs of deception",
    audioUrl: "",
    duration: "3:15",
  },
  {
    id: 14,
    title: "Neon Scammer",
    genre: "Synthwave",
    description: "The flashy facade hiding criminal intent",
    audioUrl: "",
    duration: "3:50",
  },
  {
    id: 15,
    title: "Token of Nothing",
    genre: "Ska",
    description: "Worthless tokens sold as digital gold",
    audioUrl: "",
    duration: "3:08",
  },
  {
    id: 16,
    title: "Cartel de Cripto",
    genre: "Latin",
    description: "Cross-border crypto fraud networks exposed",
    audioUrl: "",
    duration: "3:35",
  },
  {
    id: 17,
    title: "Reap What You Sow",
    genre: "Gospel",
    description: "Justice will find those who deceive the faithful",
    audioUrl: "",
    duration: "4:20",
  },
  {
    id: 18,
    title: "Exit Scam",
    genre: "Grunge",
    description: "The final cash-out before disappearing",
    audioUrl: "",
    duration: "3:42",
  },
  {
    id: 19,
    title: "Diamond Hands Betrayed",
    genre: "Disco",
    description: "Loyal holders left with nothing but dust",
    audioUrl: "",
    duration: "3:58",
  },
  {
    id: 20,
    title: "The Verdict",
    genre: "Orchestral",
    description: "The reckoning approaches for all involved",
    audioUrl: "",
    duration: "5:10",
  },
];

export const allGenres = [...new Set(musicTracks.map((t) => t.genre))];
