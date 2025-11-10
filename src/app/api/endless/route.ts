import { NextResponse } from 'next/server';

// Battle scene type
interface BattleScene {
  enemyName: string;
  successMessage: string;
  failMessage: string;
}

// Enemy names list
const enemies = [
  'Slime', 'Goblin', 'Skeleton Warrior', 'Wild Wolf', 'Giant Spider',
  'Ogre', 'Shadow Assassin', 'Fire Elemental', 'Frost Giant', 'Dark Knight',
  'Demon Lord', 'Ancient Dragon', 'Void Walker', 'Titan Beast', 'Chaos King',
  'Cerberus', 'Necromancer', 'Vampire Count', 'Thunder God', 'Abyss Demon'
];

// Battle success messages
const successMessages = [
  'You slayed', 'You defeated', 'You conquered', 'You eliminated',
  'You vanquished', 'You destroyed', 'You crushed', 'You terminated'
];

// Battle failure messages
const failMessages = [
  'You were defeated...', 'You fell in battle...', 'You were overwhelmed...',
  'You met your match...', 'Your journey ends here...'
];

/**
 * Get random element from array
 */
function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function GET() {
  try {
    // Return random battle scene
    const scene: BattleScene = {
      enemyName: getRandomElement(enemies),
      successMessage: getRandomElement(successMessages),
      failMessage: getRandomElement(failMessages),
    };

    return NextResponse.json(scene, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error generating battle scene:', error);
    return NextResponse.json(
      { error: 'Battle system error' },
      { status: 500 }
    );
  }
}
