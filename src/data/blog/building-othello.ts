/**
 * Blog Post: Building an Othello Game with React
 * Author: Trung Nguyen
 * Date: November 1, 2024
 * 
 * A comprehensive guide to building a strategic board game using React and TypeScript.
 * This post covers game logic, state management, UI design, and performance optimization.
 */

export const buildingOthelloPost = {
  id: 'building-othello',
  title: 'Building an Othello Game with React',
  excerpt: 'A deep dive into creating a fully-featured Othello game using React and TypeScript, covering game logic, state management, and UI design.',
  date: '2024-11-01',
  tags: ['React', 'TypeScript', 'Game Development'],
  readTime: 8,
  content: `
# Building an Othello Game with React

Creating a strategic board game like Othello (also known as Reversi) is an excellent way to practice React concepts, state management, and algorithm design. In this post, I'll walk through the key decisions and implementation details from my recent Othello project.

## The Challenge

Othello is a classic strategy game where two players (Black and White) take turns placing discs on an 8×8 board. When a player places a disc, any opponent discs that are sandwiched between the new disc and another disc of the current player's color get flipped. The goal is to have the majority of discs on the board when no more moves are possible.

### Key Requirements
- **Valid move detection**: Identify all legal moves for the current player
- **Disc flipping logic**: Determine which discs to flip after each move
- **Game state management**: Track the board, current player, and game status
- **Undo/redo functionality**: Allow players to review and replay moves
- **Clean UI**: Intuitive interface with visual feedback

## Architecture Decisions

### Component Structure
I organized the game into modular, reusable components:

\`\`\`
GamePage/
  ├── Board/          # 8x8 grid display
  ├── Cell/           # Individual board square
  ├── Controls/       # New game, undo, redo buttons
  ├── ScoreBoard/     # Display current score
  └── MoveHistory/    # Show move sequence
\`\`\`

### State Management
Rather than using Redux or Context API for a single-page game, I kept state local with \`useState\` and \`useReducer\`:

\`\`\`typescript
interface GameState {
  board: Board;              // 8x8 array of disc states
  currentPlayer: Player;     // 'black' | 'white'
  validMoves: Position[];    // Legal moves for current player
  moveHistory: Move[];       // Complete game history
  gameStatus: GameStatus;    // 'playing' | 'finished'
}
\`\`\`

### Game Logic Engine
The core game logic lives in a separate \`gameEngine.ts\` module with pure functions:

\`\`\`typescript
// Check if a move is valid and return discs to flip
function validateMove(
  board: Board, 
  position: Position, 
  player: Player
): Position[] | null {
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];
  
  let totalFlips: Position[] = [];
  
  // Check all 8 directions for sandwiched opponent discs
  for (const [dx, dy] of directions) {
    const flips = checkDirection(board, position, player, dx, dy);
    totalFlips = [...totalFlips, ...flips];
  }
  
  return totalFlips.length > 0 ? totalFlips : null;
}
\`\`\`

This separation makes the logic testable and reusable across different UI implementations.

## Performance Optimizations

### 1. Memoization
Board cells re-render frequently, so I wrapped them in \`React.memo\`:

\`\`\`typescript
const Cell = React.memo<CellProps>(({ 
  position, 
  disc, 
  isValidMove, 
  onClick 
}) => {
  return (
    <div 
      className={\`cell \${isValidMove ? 'valid' : ''}\`}
      onClick={() => onClick(position)}
    >
      {disc && <Disc color={disc} />}
      {isValidMove && <ValidMoveIndicator />}
    </div>
  );
});
\`\`\`

### 2. Lazy Computation
Valid moves are expensive to calculate, so I only recompute when the board or player changes:

\`\`\`typescript
const validMoves = useMemo(
  () => calculateValidMoves(board, currentPlayer),
  [board, currentPlayer]
);
\`\`\`

### 3. CSS Animations
Disc flips use CSS transitions rather than JavaScript animations for 60fps performance:

\`\`\`css
.disc {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.disc.flipping {
  transform: rotateY(180deg);
}
\`\`\`

## Challenges and Lessons

### Challenge: Move Validation Edge Cases
The trickiest part was handling edge cases in move validation:
- Moves at board edges and corners
- Multiple directions flipping simultaneously
- No valid moves available (pass turn)

**Solution**: Comprehensive unit tests for every scenario ensured reliability.

### Challenge: Smooth Animations
Animating multiple disc flips simultaneously without jank required careful timing:

\`\`\`typescript
// Stagger flip animations for visual clarity
discsToFlip.forEach((position, index) => {
  setTimeout(() => {
    flipDisc(position);
  }, index * 50);
});
\`\`\`

### Challenge: Undo/Redo Implementation
Maintaining a history stack while keeping the UI responsive:

**Solution**: Store minimal state snapshots (board + player) rather than deep-cloning the entire game state.

## Key Takeaways

1. **Separate concerns**: Keep game logic pure and separate from React components
2. **Test thoroughly**: Board games have many edge cases—write tests first
3. **Optimize strategically**: Profile before optimizing; memoization helped most
4. **Progressive enhancement**: Start with core gameplay, add features iteratively

## Try It Yourself

The full game is playable on my portfolio site, and the source code is available on GitHub. Feel free to fork it and add features like:
- AI opponent with minimax algorithm
- Online multiplayer
- Different board sizes
- Move suggestions for beginners

Building this game taught me valuable lessons about state management, performance optimization, and user experience design. I hope this breakdown helps you tackle your own React game projects!

---

**Links:**
- [Play the Game](/play)
- [View Source Code](https://github.com/cozyGarage/Othello)
- [TypeScript Documentation](https://www.typescriptlang.org/)

*Have questions or suggestions? Connect with me on [LinkedIn](https://linkedin.com) or [GitHub](https://github.com/cozyGarage).*
`
};
