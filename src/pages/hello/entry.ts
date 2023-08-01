console.info("entry.ts: Hello from entry.ts!");

console.info("entry.ts: Applying ./styles.scss");
import "./styles.scss?apply"; // Apply the page's style sheet

import getHelloWorld from "Scripts/hello_world";

function type(what: string, where: HTMLElement) {
  where.textContent = where.textContent ?? "";

  if (what.length > 0) {
    where.textContent += what[0];
    setTimeout(() => type(what.substring(1), where), 250);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const hello = document.getElementById("hello");
  if (hello == null) throw new TypeError("#hello element not found");

  console.info('entry.ts: Inserting "Hello, World!"');
  type(getHelloWorld(), hello);
});
