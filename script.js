const terminalOutput = document.getElementById("terminal-output");
const terminalInput = document.getElementById("terminal-input");

const commands = {
  help: `
Available commands:
  - help: Show this help message
  - clear: Clear the terminal
  - about: Learn about me
  - contact: Contact information
  - skills: List my technical skills
  - social: Show my social media links
  - date: Show current date and time
  - joke: Tell a joke
  - echo [text]: Repeat the text
  - photo: Show a random photo
  - exit: Close the terminal (reloads the page)
  `,
  about: "CLIMPLE is a simple terminal project template for making portfolio websites. It's built with HTML, CSS, and JavaScript. Feel free to customize it for your own use! 🚀",
  contact: `
Contact me:
Email: <a href="mailto:supwithproject@gmail.com" target="_blank">supwithproject@gmail.com</a>
GitHub: <a href="https://github.com/silvermete0r" target="_blank">github.com/silvermete0r</a>
  `,
  skills: "Python, C++, JavaScript, HTML/CSS, Node.js, Flask, Git, Tailwind, Bootstrap, and more!",
  social: `
GitHub: <a href="https://github.com/silvermete0r" target="_blank">github.com/silvermete0r</a>
Twitter: <a href="https://twitter.com/grembim" target="_blank">twitter.com/grembim</a>
  `,
  date: new Date().toLocaleString(),
  photo: `<img src="https://random.imagecdn.app/200/200" alt="Random Photo" width="200" height="200">`,
  joke: get_random_joke(),
};

function executeCommand(input) {
  const command = input.trim();
  if (command === "clear") {
    // Clear the website cache and cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    caches.keys().then(function(names) {
      for (let name of names) caches.delete(name);
    });
    terminalOutput.innerHTML = "";
  } else if (command === "exit") {
    location.reload();
  } else if (command.startsWith("echo")) {
    appendOutput(command.replace("echo", ""));
  } else if (commands[command]) {
    appendOutput(commands[command]);
  } else {
    appendOutput(`Command not found: ${command}`);
  }
}

function get_random_joke() {
  const jokes = [
    "Why do programmers prefer dark mode? Because light attracts bugs.",
    "Why do Java developers wear glasses? Because they can't C#.",
    "Why astronauts use Linux? Because they can't open windows in space.",
    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25.",
    "Why fullstack developers are the best comedians? They always deliver a good performance.",
  ]
  return jokes[Math.floor(Math.random() * jokes.length)];
}

function appendOutput(content) {
  const paragraph = document.createElement("pre");
  paragraph.innerHTML = content;
  terminalOutput.appendChild(paragraph);
  terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll
}

function showWelcomeMessage() {
  const asciiArt = `
  ██████╗██╗     ██╗███╗   ███╗██████╗ ██╗     ███████╗
 ██╔════╝██║     ██║████╗ ████║██╔══██╗██║     ██╔════╝
 ██║     ██║     ██║██╔████╔██║██████╔╝██║     █████╗  
 ██║     ██║     ██║██║╚██╔╝██║██╔═══╝ ██║     ██╔══╝  
 ╚██████╗███████╗██║██║ ╚═╝ ██║██║     ███████╗███████╗
  ╚═════╝╚══════╝╚═╝╚═╝     ╚═╝╚═╝     ╚══════╝╚══════╝
Welcome to CLIMPLE Terminal Template! Type 'help' to start.
  `;
  appendOutput(`<pre class="ascii-art text-green-500">${asciiArt}</pre>`);
}

// Event listener for commands
terminalInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const input = terminalInput.value;
    appendOutput(`<span class="text-green-500">$</span> ${input}`);
    executeCommand(input);
    terminalInput.value = "";
  }
});

// Show ASCII welcome message on load
document.addEventListener("DOMContentLoaded", () => {
  showWelcomeMessage();
});