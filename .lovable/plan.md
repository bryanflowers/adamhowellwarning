

# Update Music Tracks with Generated Audio URLs

## What happened
All 50 songs were successfully generated via Suno AI -- every track has a completed audio URL stored in the database. However, the frontend data file (`src/data/musicTracks.ts`) was never updated with the URLs for tracks 21-50. Those 30 tracks still have empty `audioUrl: ""` strings, making them appear as "Generating..." and unplayable.

## What needs to change

**Single file update**: `src/data/musicTracks.ts`

Update tracks 21-50 with their audio URLs and actual durations from the database:

| # | Title | Audio URL | Duration (sec) |
|---|-------|-----------|-----------------|
| 21 | Phantom Wallet | `...1b3bc0cc...mp3` | 154.92 |
| 22 | Burner Phones | `...231067e9...mp3` | 174.96 |
| 23 | Fake Audits | `...8529a643...mp3` | 71.28 |
| 24 | Offshore Ghosts | `...88a35a8d...mp3` | 106.64 |
| 25 | Screenshot Confessions | `...060fcdffd...mp3` | 188.88 |
| 26 | Liquidity Drain | `...494046a4...mp3` | 240 |
| 27 | Double Life | `...8d000f35...mp3` | 212.96 |
| 28 | Telegram Lies | `...be15481a...mp3` | 234.12 |
| 29 | The Whistleblower | `...9af93c00...mp3` | 132.68 |
| 30 | Counterfeit Charity | `...fbb387dd...mp3` | 172.88 |
| 31 | Blockchain Burial | `...8b25b5ef...mp3` | 180.76 |
| 32 | Ponzi Sunrise | `...afce7a7f...mp3` | 101.2 |
| 33 | Influencer Bait | `...8cb7697c...mp3` | 86.68 |
| 34 | Court Date | `...37de0eda...mp3` | 99.8 |
| 35 | Proxy Warfare | `...75889927...mp3` | 206.96 |
| 36 | Gaslit Investors | `...9666d96d...mp3` | 178.76 |
| 37 | DMCA Silencer | `...e90d41c1...mp3` | 104 |
| 38 | Passport Shuffle | `...519e7123...mp3` | 100.48 |
| 39 | Dead Token Walking | `...8bd1eba6...mp3` | 156.84 |
| 40 | The Enablers | `...b8de8317...mp3` | 120 |
| 41 | Airdrop Mirage | `...c83257cc...mp3` | 240 |
| 42 | Warrant Incoming | `...483e0594...mp3` | 234.88 |
| 43 | Smart Contract Trap | `...0380cbf9...mp3` | 191 |
| 44 | Victim Voices | `...0ee9ff9c...mp3` | 167 |
| 45 | Rug Pulled Twice | `...2df9c519...mp3` | 159 |
| 46 | The Laundromat | `...267e340b...mp3` | 180.4 |
| 47 | False Prophet | `...7b3a4b57...mp3` | 152 (actual: 171) |
| 48 | Coded Confession | `...224a26e2...mp3` | 197 |
| 49 | Meltdown Monday | `...d0d03f0b...mp3` | 152.8 |
| 50 | Justice Will Find You | `...267a69a8...mp3` | 149.8 |

## Result
All 50 tracks will be immediately playable. The "Generating..." labels will disappear and "Play All" will include all tracks.

## Technical details
- Each track entry gets its `audioUrl` populated with the full `https://tempfile.aiquickdraw.com/r/...mp3` URL from the database
- Each track's `formatDuration()` call gets updated to the actual duration returned by Suno (some differ from the placeholder estimates)
- No other files, database changes, or backend work needed

