export interface MusicTrack {
  id: number;
  title: string;
  genre: string;
  description: string;
  audioUrl: string;
  duration: string;
}

const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export const musicTracks: MusicTrack[] = [
  {
    id: 1,
    title: "Rug Pull King",
    genre: "Hip-Hop",
    description: "The SuperDoge scam and how investors got played",
    audioUrl: "https://tempfile.aiquickdraw.com/r/dedc15dcae3d4aa8b6a27e04084f9272.mp3",
    duration: formatDuration(114),
  },
  {
    id: 2,
    title: "Shadow COO",
    genre: "Rock",
    description: "Keith Shingleton's hidden role behind the curtain",
    audioUrl: "https://tempfile.aiquickdraw.com/r/1bf7382d981d41e6a2c1e9c5f2705318.mp3",
    duration: formatDuration(153.88),
  },
  {
    id: 3,
    title: "Bangkok Runner",
    genre: "Country",
    description: "Fleeing justice across borders to Thailand",
    audioUrl: "https://tempfile.aiquickdraw.com/r/e9afad38ced14dd680b836a0525731b3.mp3",
    duration: formatDuration(184.88),
  },
  {
    id: 4,
    title: "Deleted Domains",
    genre: "Electronic",
    description: "How digital evidence was systematically erased",
    audioUrl: "https://tempfile.aiquickdraw.com/r/12fd83a4db4942e1b3d441bb52494252.mp3",
    duration: formatDuration(162),
  },
  {
    id: 5,
    title: "The Whitepaper Blues",
    genre: "Jazz",
    description: "Smoke Exchange promises that went up in smoke",
    audioUrl: "https://tempfile.aiquickdraw.com/r/d90637f7c0d34e4aa275886f1b45cae5.mp3",
    duration: formatDuration(152.04),
  },
  {
    id: 6,
    title: "Charity Lies",
    genre: "Pop",
    description: "Fake donations and stolen goodwill",
    audioUrl: "https://tempfile.aiquickdraw.com/r/877077c31e8643e98a7ec98bf4f05676.mp3",
    duration: formatDuration(102.4),
  },
  {
    id: 7,
    title: "DopeCoin Dreams",
    genre: "Reggae",
    description: "The pump-and-dump scheme that took it all",
    audioUrl: "https://tempfile.aiquickdraw.com/r/03f21cd3bb4a42edb59a045b82a1bab2.mp3",
    duration: formatDuration(52.48),
  },
  {
    id: 8,
    title: "Web of Accomplices",
    genre: "Metal",
    description: "The inner circle that enabled the fraud",
    audioUrl: "https://tempfile.aiquickdraw.com/r/8f753d07046341588190e175ec7b31b7.mp3",
    duration: formatDuration(240),
  },
  {
    id: 9,
    title: "Anonymous Pitch",
    genre: "R&B",
    description: "The mysterious podcast appearance with hidden identity",
    audioUrl: "https://tempfile.aiquickdraw.com/r/7d56fb1e6f7741f6af4351ca5ceeb758.mp3",
    duration: formatDuration(190),
  },
  {
    id: 10,
    title: "Vanished Promises",
    genre: "Folk",
    description: "Abandoned projects and broken commitments",
    audioUrl: "https://tempfile.aiquickdraw.com/r/70312308bf4049318ced5e3c8f9d0918.mp3",
    duration: formatDuration(141.92),
  },
  {
    id: 11,
    title: "Burn the Ledger",
    genre: "Punk",
    description: "Destroying financial records to cover the trail",
    audioUrl: "https://tempfile.aiquickdraw.com/r/d31ddf2fa1ce4f41be3cb55986c34ce8.mp3",
    duration: formatDuration(172.16),
  },
  {
    id: 12,
    title: "Midnight Wallets",
    genre: "Blues",
    description: "Moving stolen funds under cover of darkness",
    audioUrl: "https://tempfile.aiquickdraw.com/r/6c9676e6700843bd9acec01542913fb0.mp3",
    duration: formatDuration(159.56),
  },
  {
    id: 13,
    title: "Paper Trail",
    genre: "Lo-Fi",
    description: "Following the breadcrumbs of deception",
    audioUrl: "https://tempfile.aiquickdraw.com/r/0b374a83879e449fa96b1ac2e2ae7a33.mp3",
    duration: formatDuration(99),
  },
  {
    id: 14,
    title: "Neon Scammer",
    genre: "Synthwave",
    description: "The flashy facade hiding criminal intent",
    audioUrl: "https://tempfile.aiquickdraw.com/r/f1cfe0da0ce5438d8cad08abff539478.mp3",
    duration: formatDuration(141),
  },
  {
    id: 15,
    title: "Token of Nothing",
    genre: "Ska",
    description: "Worthless tokens sold as digital gold",
    audioUrl: "https://tempfile.aiquickdraw.com/r/7508f72834f248ba8f9aedfa263b155e.mp3",
    duration: formatDuration(97),
  },
  {
    id: 16,
    title: "Cartel de Cripto",
    genre: "Latin",
    description: "Cross-border crypto fraud networks exposed",
    audioUrl: "https://tempfile.aiquickdraw.com/r/a3e7794664734f4d82cb69d75cdc7915.mp3",
    duration: formatDuration(207.04),
  },
  {
    id: 17,
    title: "Reap What You Sow",
    genre: "Gospel",
    description: "Justice will find those who deceive the faithful",
    audioUrl: "https://tempfile.aiquickdraw.com/r/33fd4c19fc2b4401bac71b48f6097435.mp3",
    duration: formatDuration(101),
  },
  {
    id: 18,
    title: "Exit Scam",
    genre: "Grunge",
    description: "The final cash-out before disappearing",
    audioUrl: "https://tempfile.aiquickdraw.com/r/ef805f174daf4ad983c31a7584c02476.mp3",
    duration: formatDuration(168.72),
  },
  {
    id: 19,
    title: "Diamond Hands Betrayed",
    genre: "Disco",
    description: "Loyal holders left with nothing but dust",
    audioUrl: "https://tempfile.aiquickdraw.com/r/c9ede89836b74a83a8f37797edcb5250.mp3",
    duration: formatDuration(138.08),
  },
  {
    id: 20,
    title: "The Verdict",
    genre: "Orchestral",
    description: "The reckoning approaches for all involved",
    audioUrl: "https://tempfile.aiquickdraw.com/r/b0fc34ff23014e9c8590fe46afd7c303.mp3",
    duration: formatDuration(165.76),
  },
];

export const allGenres = [...new Set(musicTracks.map((t) => t.genre))];
