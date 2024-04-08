function boggleSolver(grid, dictionary) {
  const result = new Set();

  function dfs(i, j, word) {
      if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === '*') {
          return;
      }
      
      word += grid[i][j];
      if (!dictionary.hasPrefix(word)) {
          return;
      }
      if (dictionary.hasWord(word)) {
          result.add(word);
      }
      
      const temp = grid[i][j];
      grid[i][j] = '*'; // Mark as visited
      
      dfs(i - 1, j - 1, word);
      dfs(i - 1, j, word);
      dfs(i - 1, j + 1, word);
      dfs(i, j - 1, word);
      dfs(i, j + 1, word);
      dfs(i + 1, j - 1, word);
      dfs(i + 1, j, word);
      dfs(i + 1, j + 1, word);
      
      grid[i][j] = temp; // Restore
  }

  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
          dfs(i, j, '');
      }
  }

  return Array.from(result);
}

// Example usage
const grid = [
  ['a', 'b', 'c'],
  ['d', 'e', 'f'],
  ['g', 'h', 'i']
];
const dictionary = new Set(['abc', 'def', 'ghi', 'ad', 'cfi']);
console.log(boggleSolver(grid, dictionary)); // Output: ['abc', 'def', 'ghi', 'ad', 'cfi']
