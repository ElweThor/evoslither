# 🐍 EvoSlither - Genetic Algorithm Bot for Slither.io

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.0.1.4-blue.svg)](src/evoslither.js)
[![Research Focus](https://img.shields.io/badge/Research-Genetic_Algorithms-green.svg)](docs/ALGORITHM.md)

**Watch artificial evolution in real-time!** EvoSlither is an intelligent bot that learns to play Slither.io through genetic algorithms, adapting and improving with each generation.

## 🧬 What is EvoSlither?

EvoSlither isn't just another bot - it's a **living laboratory** where you can observe natural selection in action. Each game session contributes to the bot's evolutionary journey, as it refines its strategies through mutation and selection.

### 🔍 Research Features:
- **Real-time DNA analysis** - Watch 8 genetic parameters evolve
- **Death cause analytics** - Understand why bots fail and adapt
- **Dynamic status panel** - Monitor evolution with auto-updating UI
- **Learning visualization** - See the bot develop survival strategies in the field

## 🚀 Quick Start

1. **Visit** [slither.io](http://slither.io)
2. **Enter** a nickname but wait to join game
3. **Open browser console** (`F12` → Console)
4. **Copy & paste** the code from [`src/evoslither.js`](src/evoslither.js)
5. **Run the code** making it ready to work: in console you'll see "injected" confirmation
6. **Close browser console** (`F12` again)
7. **Join the game**, the bot starts working: you'll see it "taking the helm" and roaming
8. **Press `E`** to enable/disable the bot: disable it, when you like to steer/speed-up by your own: press `E` again to kick it back in
9. **Press `V`** to toggle the real-time evolution dashboard on

## 🎮 Controls

| Key | Function |
|-----|----------|
| `E` | Toggle bot on/off |
| `C` | Console status report |
| `V` | Visual status panel (auto-refresh) |

NOTE: Console status report gives the very same info as the real-time monitor panel (for now). To use it, just press `C` while the bot is roaming (so, **not** in the browser's console), but you'll need to open the Console (`F12`) to see the results (the bot keeps going, while you look at the Console)

## 📊 What You'll See

The bot starts "naive" but learns quickly:
- **Generation 1**: Random movements, frequent deaths
- **Generation 10**: Basic survival instincts
- **Generation 50**: Strategic play emerging
- **Generation 100+**: Sophisticated hunting and evasion

## 🧪 The Science Behind It

EvoSlither uses a **genetic algorithm** with 8 evolvable parameters:
- **Safety distance** from enemies
- **Aggression levels** for hunting  
- **Fear responses** to threats
- **Center-seeking behavior**
- And more...

Each parameter evolves through **mutation and selection** - successful strategies survive, while poor ones die out.

## ⚠️ Important Notes

- **Educational Purpose**: This project focuses on algorithm research
- **Use Responsibly**: May violate Slither.io's Terms of Service
- **No Guarantees**: Bot performance varies based on learning progress
- **Not Affiliated**: Independent research project

## 🔗 Learn More

- [Genetic Algorithm Explanation](docs/ALGORITHM.md) - How the evolution works
- [Project Origins](docs/CREDITS.md) - Credits and attributions
- [Version History](Changelog.md) - What's new in each release

## 🛠️ Development

Contributions welcome! This project is perfect for:
- AI/ML students exploring genetic algorithms
- Developers interested in game AI
- Researchers studying emergent behavior

## 🧠 Development Notes

This project was created, starting from the original author's code (see [CREDITS](docs/CREDITS.md)), through a collaborative learning process between human developer and AI assistant, exploring genetic algorithms and game AI concepts. Invaluable assistance was given by Aria@DeepSeek (the AI).

## 📜 License

MIT License - see [LICENSE.md](LICENSE.md) for details.

---

**Ready to witness artificial evolution?** Copy the code and watch learning happen in real-time! 🚀

*"The most exciting phrase to hear in science, the one that heralds new discoveries, is not 'Eureka!' but 'That's funny...'"* - Isaac Asimov