import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, RotateCcw, Award, CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';

// Game Types
type BoardState = (string | null)[];
type MatchCard = {
  id: number;
  logo: string;
  category: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const MARKETING_CARDS_DATA = [
  { logo: 'n8n', category: 'Automation Engine' },
  { logo: 'Make', category: 'Automation Engine' },
  { logo: 'Figma', category: 'Design & Creative' },
  { logo: 'Canva', category: 'Design & Creative' },
  { logo: 'GA4', category: 'SEO & Analytics' },
  { logo: 'SEMrush', category: 'SEO & Analytics' },
  { logo: 'HubSpot', category: 'Email & CRM' },
  { logo: 'Claude', category: 'AI Content / Copy' },
];

export default function MarketingGames() {
  const [activeTab, setActiveTab] = useState<'tictactoe' | 'match'>('tictactoe');

  return (
    <section id="games" className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/5 scroll-mt-20">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 border-b border-primary/20 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-primary uppercase block mb-2">
            PLAYGROUND &amp; CRITIQUES
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-[#E1E0CC]">
            GROWTH LABS
          </h2>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0 bg-[#101010] p-1 rounded-full border border-white/10">
          <button
            onClick={() => setActiveTab('tictactoe')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === 'tictactoe'
                ? 'bg-primary text-black font-extrabold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            CAMPAIGN TAC-TOE
          </button>
          <button
            onClick={() => setActiveTab('match')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
              activeTab === 'match'
                ? 'bg-primary text-black font-extrabold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            STACK MEMORY
          </button>
        </div>
      </div>

      <div className="bg-[#101010] rounded-[2.5rem] p-6 sm:p-10 border border-white/5 shadow-2xl overflow-hidden relative min-h-[500px] flex items-center justify-center">
        {/* Decorative Grid Lines to match Geometric Balance theme */}
        <div className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-[0.02] border-r border-white">
          <div className="border-l border-white h-full"></div>
          <div className="border-l border-white h-full"></div>
          <div className="border-l border-white h-full"></div>
          <div className="border-l border-white h-full"></div>
          <div className="border-l border-white h-full"></div>
        </div>

        <div className="w-full relative z-10 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {activeTab === 'tictactoe' ? (
              <motion.div
                key="tictactoe"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md flex flex-col items-center"
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#FAC775]" /> LEAD ACQUISITION CHALLENGE
                  </h3>
                  <p className="text-xs text-gray-400 max-w-sm">
                    Deploy your marketing budget wisely. Your goal is to secure 3 channels in a row before the competitor <strong>Burn Rate</strong> consumes the pipeline.
                  </p>
                </div>

                <TicTacToeGame />
              </motion.div>
            ) : (
              <motion.div
                key="match"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-4xl flex flex-col items-center"
              >
                <div className="text-center mb-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                    <Award className="w-5 h-5 text-[#FAC775]" /> STACK PAIRS SHOWDOWN
                  </h3>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">
                    Match the brand tools with their exact marketing discipline! Find the complementary pairs. Completing in minimum turns gives the CGO (Chief Growth Officer) rank.
                  </p>
                </div>

                <MemoryMatchGame />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   GAME 1: CAMPAIGN OPTIMIZER TIC-TAC-TOE
   ========================================================== */
function TicTacToeGame() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | null>(null); // 'User', 'AI', 'Draw'
  const [stats, setStats] = useState({ won: 0, lost: 0, draws: 0 });

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkWinner = (currentBoard: BoardState) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a]; // '📈' (User) or '📉' (AI)
      }
    }
    if (currentBoard.every(cell => cell !== null)) {
      return 'Draw';
    }
    return null;
  };

  // Turn logic
  const handleCellClick = (index: number) => {
    if (board[index] || winner || !isUserTurn) return;

    const newBoard = [...board];
    newBoard[index] = '📈'; // Leads
    setBoard(newBoard);

    const matchWin = checkWinner(newBoard);
    if (matchWin) {
      handleGameEnd(matchWin);
    } else {
      setIsUserTurn(false);
    }
  };

  // Simple AI with smart response
  useEffect(() => {
    if (isUserTurn || winner) return;

    const timer = setTimeout(() => {
      const emptyIndices = board.map((cell, idx) => cell === null ? idx : null).filter(val => val !== null) as number[];
      if (emptyIndices.length === 0) return;

      let aiMove: number;

      // 1. Try to win
      const winningMoveIndex = findBestMove('📉', board);
      // 2. Try to block user
      const blockingMoveIndex = findBestMove('📈', board);

      if (winningMoveIndex !== null) {
        aiMove = winningMoveIndex;
      } else if (blockingMoveIndex !== null) {
        aiMove = blockingMoveIndex;
      } else {
        // Preferred centers and corners
        const preferences = [4, 0, 2, 6, 8, 1, 3, 5, 7];
        const availablePref = preferences.filter(idx => emptyIndices.includes(idx));
        aiMove = availablePref.length > 0 ? availablePref[0] : emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }

      const newBoard = [...board];
      newBoard[aiMove] = '📉'; // Burn Rate
      setBoard(newBoard);

      const matchWin = checkWinner(newBoard);
      if (matchWin) {
        handleGameEnd(matchWin);
      } else {
        setIsUserTurn(true);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [isUserTurn, board, winner]);

  const findBestMove = (player: string, currBoard: BoardState): number | null => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      const vals = [currBoard[a], currBoard[b], currBoard[c]];
      const playerCount = vals.filter(v => v === player).length;
      const nullCount = vals.filter(v => v === null).length;
      if (playerCount === 2 && nullCount === 1) {
        if (currBoard[a] === null) return a;
        if (currBoard[b] === null) return b;
        if (currBoard[c] === null) return c;
      }
    }
    return null;
  };

  const handleGameEnd = (result: string) => {
    if (result === '📈') {
      setWinner('User');
      setStats(prev => ({ ...prev, won: prev.won + 1 }));
    } else if (result === '📉') {
      setWinner('AI');
      setStats(prev => ({ ...prev, lost: prev.lost + 1 }));
    } else {
      setWinner('Draw');
      setStats(prev => ({ ...prev, draws: prev.draws + 1 }));
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsUserTurn(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* HUD Bar */}
      <div className="flex justify-between items-center w-full bg-black/60 px-5 py-3 rounded-2xl border border-white/5 mb-6 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-gray-400">LEADS (YOU): <span className="text-primary font-bold">{stats.won}</span></span>
        </div>
        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-[#D85A30]">
          VS
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">BURN RATE (AI): <span className="text-red-500 font-bold">{stats.lost}</span></span>
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-[280px] sm:max-w-[320px] aspect-square mb-6">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleCellClick(idx)}
            className={`w-full h-full bg-[#1b1b1b] rounded-2xl border border-white/5 flex items-center justify-center transition-all duration-300 group hover:border-primary/40 select-none cursor-pointer overflow-hidden relative ${
              cell === '📈' ? 'bg-[#152e1e] border-green-500/30' : cell === '📉' ? 'bg-[#3b1515] border-red-500/30' : ''
            }`}
          >
            {/* Dynamic Inner Graphics */}
            {cell === '📈' && (
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="flex flex-col items-center text-green-400"
              >
                <span className="text-3xl sm:text-4xl">📈</span>
                <span className="text-[8px] font-mono tracking-widest uppercase mt-0.5 text-green-300 font-semibold">Leads</span>
              </motion.div>
            )}
            {cell === '📉' && (
              <motion.div
                initial={{ scale: 0, rotate: 20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="flex flex-col items-center text-red-400"
              >
                <span className="text-3xl sm:text-4xl">📉</span>
                <span className="text-[8px] font-mono tracking-widest uppercase mt-0.5 text-red-300 font-semibold">Burn</span>
              </motion.div>
            )}
            {!cell && !winner && (
              <span className="opacity-0 group-hover:opacity-40 transition-opacity font-mono text-xs text-primary">
                ACQUIRE
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Message and Controller */}
      <div className="w-full text-center">
        {!winner ? (
          <div className="text-xs font-mono text-gray-400 italic">
            {isUserTurn ? (
              <span className="text-[#FAC775] font-semibold animate-pulse">👉 Your turn: Capture a marketing channel!</span>
            ) : (
              <span>🤖 Competitor optimizing campaign spending...</span>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center bg-[#151515] p-5 rounded-2xl border border-white/5"
          >
            {winner === 'User' && (
              <div className="text-green-400 text-sm font-bold flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" /> EXCELLENT ROI! YOU WIN!
              </div>
            )}
            {winner === 'AI' && (
              <div className="text-red-400 text-sm font-bold flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" /> BUDGET EXHAUSTED! AI WON.
              </div>
            )}
            {winner === 'Draw' && (
              <div className="text-[#FAC775] text-sm font-bold flex items-center gap-2 mb-2">
                <RotateCcw className="w-4 h-4 text-[#FAC775]" /> EQUILIBRIUM REACHED.
              </div>
            )}

            <p className="text-xs text-gray-400 max-w-xs mb-4">
              {winner === 'User' && 'Your end-to-end automation campaigns scaled output and minimized CPA. Excellent pipeline development!'}
              {winner === 'AI' && 'Your ad burn rate was too high without automated nurturing workflows in place. Optimize and retry!'}
              {winner === 'Draw' && 'Perfect market optimization. Both leads and acquisition spending are in complete balance.'}
            </p>

            <button
              onClick={resetGame}
              className="bg-primary text-black flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs font-mono tracking-wider transition-all hover:bg-[#F1EFE8] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> RE-OPTIMIZE PLAN
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ==========================================================
   GAME 2: MARKETING MATCH THE CARDS (MEMORY CARD GAME)
   ========================================================== */
function MemoryMatchGame() {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selected, setSelected] = useState<number[]>([]); // holds indices of flipped cards
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [scoreMessage, setScoreMessage] = useState<string>('');

  const initializeGame = () => {
    // Generate actual matched deck. We have 8 values, let's duplicate them into 16 cards
    const deck: MatchCard[] = [];
    let idCounter = 1;

    MARKETING_CARDS_DATA.forEach(item => {
      // Card A: Logo Text
      deck.push({
        id: idCounter++,
        logo: item.logo,
        category: item.category,
        isFlipped: false,
        isMatched: false,
      });
      // Card B: Marketing Category Description
      deck.push({
        id: idCounter++,
        logo: item.logo,
        category: item.category,
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle the deck
    const shuffledDeck = deck
      .map(card => ({ card, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ card }) => card);

    setCards(shuffledDeck);
    setSelected([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (clickedIndex: number) => {
    if (selected.length === 2 || cards[clickedIndex].isFlipped || cards[clickedIndex].isMatched) return;

    const updated = [...cards];
    updated[clickedIndex].isFlipped = true;
    setCards(updated);

    const newSelected = [...selected, clickedIndex];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newSelected;

      // Match condition: cards must share the same logo / relationship!
      if (cards[first].logo === cards[second].logo && cards[first].id !== cards[second].id) {
        // Matched!
        setTimeout(() => {
          const matchedDeck = [...cards];
          matchedDeck[first].isMatched = true;
          matchedDeck[second].isMatched = true;
          setCards(matchedDeck);
          setSelected([]);

          // Check Win
          if (matchedDeck.every(c => c.isMatched)) {
            calculateRating();
          }
        }, 300);
      } else {
        // Not a match, flip back
        setTimeout(() => {
          const resetDeck = [...cards];
          resetDeck[first].isFlipped = false;
          resetDeck[second].isFlipped = false;
          setCards(resetDeck);
          setSelected([]);
        }, 1000);
      }
    }
  };

  const calculateRating = () => {
    setIsWon(true);
    if (moves <= 10) {
      setScoreMessage('👑 Chief Growth Officer (CGO) Level! Elite intelligence.');
    } else if (moves <= 14) {
      setScoreMessage('🎯 Growth Director Level! Smooth systems, highly efficient.');
    } else {
      setScoreMessage('📈 Marketing Associate Level! Keep sharpening your integration logic.');
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Stats Board */}
      <div className="flex justify-between items-center w-full max-w-2xl bg-black/60 px-5 py-3 rounded-2xl border border-white/5 mb-6 text-xs font-mono">
        <div>
          <span className="text-gray-400">TOTAL ANALYTICS CALLS (MOVES): </span>
          <span className="text-primary font-bold">{moves}</span>
        </div>
        <button
          onClick={initializeGame}
          className="text-primary hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-bold"
        >
          <RotateCcw className="w-3.5 h-3.5" /> RESET STACK
        </button>
      </div>

      {isWon ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl bg-[#151515] p-6 rounded-3xl border border-white/5 text-center flex flex-col items-center"
        >
          <Trophy className="w-12 h-12 text-[#FAC775] mb-3 animate-bounce" />
          <h4 className="text-green-400 font-extrabold text-lg mb-2 uppercase tracking-wide">
            Ecosystem Integrated Successfully!
          </h4>
          <p className="text-sm font-mono text-primary font-bold mb-3">{scoreMessage}</p>
          <p className="text-xs text-gray-400 max-w-sm mb-6">
            You successfully aligned technical tools like n8n and Google Analytics with their appropriate execution functions.
          </p>
          <button
            onClick={initializeGame}
            className="bg-primary text-black flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase font-mono tracking-wider transition-all hover:bg-[#F1EFE8] cursor-pointer"
          >
            Play Again
          </button>
        </motion.div>
      ) : (
        /* The Card Grid */
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 w-full max-w-3xl">
          {cards.map((card, idx) => {
            // Check if card display should show the logo or category
            // To differentiate matching cards, let's half-show logos and half-show categories
            const isWordCard = card.id % 2 === 0;

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className={`w-full aspect-square border text-center transition-all duration-300 relative rounded-2xl overflow-hidden cursor-pointer ${
                  card.isFlipped || card.isMatched
                    ? card.isMatched
                      ? 'bg-[#152e1e] border-green-500/40 text-green-300'
                      : 'bg-[#1b1b1b] border-primary/20 text-[#E1E0CC]'
                    : 'bg-[#0f0f0f] border-white/5 hover:border-white/10 text-gray-500'
                }`}
              >
                {card.isFlipped || card.isMatched ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 p-3 flex flex-col justify-center items-center gap-1.5"
                  >
                    {isWordCard ? (
                      <>
                        <span className="text-xs font-mono text-primary bg-black/40 px-2.5 py-1 rounded border border-white/5 uppercase select-none font-bold">
                          TOOL
                        </span>
                        <span className="text-xl font-extrabold tracking-tight text-white select-none">
                          {card.logo}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-[10px] font-mono font-medium text-[#D85A30] uppercase select-none tracking-widest">
                          FUNCTION
                        </span>
                        <span className="text-xs sm:text-xs text-center font-semibold text-gray-300 select-none leading-relaxed px-1">
                          {card.category}
                        </span>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center select-none text-xl sm:text-2xl font-black font-mono tracking-tight text-zinc-800 hover:text-primary/30 transition-all">
                    VK
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
