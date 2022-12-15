console.log()

const randomSymbol = () => {
  const symbols = `~\`!@#$%^&*()_-+={[}]|\:;"'<,>.?/`;
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const generatePassword = (words) => {
  const swaps = {
    a: ['a', '@'],
    o: ['o', '0'],
    s: ['s', '$', '5'],
    i: ['i', '1', '!'],
    t: ['t', '7'],
    e: ['e', '3'],
    g: ['g', '6', '9'],
    b: ['b', '8']
  };

  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }

  let password = '';
  for (const word of words) {
    password += word + randomSymbol();
  }

  password = password.toLowerCase().split('');

  for (let i = 0; i < password.length; i++) {
    const char = password[i];
    if (char in swaps && Math.random() < 0.8) {
      const currSwaps = swaps[char];
      password[i] = currSwaps[Math.floor(Math.random() * currSwaps.length)];
    }
    const isUpper = Math.random() < 0.5;
    password[i] = isUpper && 'abcdefghijklmnopqrstuvwxyz'.includes(password[i]) ? password[i].toUpperCase() : password[i];
  }
  return password.slice(0, -1).join('')
}

// console.log(generatePassword([
//   'Jai',
//   'Minecraft',
//   'Soccer'
// ]));

const generateButton = document.getElementById('generateButton');
generateButton.addEventListener('click', () => {
  const input = document.getElementById('words').value.trim().replace(/[\;\n\s]/g, ',').split(',');
  console.log(input);
  document.getElementById('password').innerText = generatePassword(input);
});