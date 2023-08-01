# Website Template

This repository contains a template for quickly making a simple website. The
template already contains a small website that you can and are expected to
modify.

You are free to completely modify this template and license your website however
you want. You may want to remove the current `LICENSE` file and add your own.

## Running

You can run a development server with `npm run dev`.

You can compile production and development builds with `npm run build:prod` and
`npm run build:dev` respectively. The compiled website will be located in the
`dist/` directory.

## How does it work?

### Pages

Each page has a separate directory in `src/pages/`.

You can access a page by its name with an `.html` extension.  
As an example, a page in `src/pages/wow/` will produce the file `wow.html` in
`dist/`.

The page in `src/pages/index/` will be typically served by default when none is
specified in the URL, although that depends on your server.

### Scripts

Scripts in `src/scripts/` can be referred to by using the `Scripts/` prefix.  
As an example, the script `src/scripts/test.ts` can be imported from other
scripts as `Scripts/test`.

You are free to create subdirectories in `src/scripts/`, except inside
`src/scripts/global/`.

#### Page scripts

Each page may have an `entry.ts` script in its directory. That script will be
automatically run in that page.

#### Global scripts

Scripts in `src/scripts/global/` are automatically included in every page, and
run before any other scripts.

Currently you can not create directories under `src/scripts/global/`.

### Styles

The directory `src/styles/` may contain Sass style sheets. You can refer to that
directory by the `Styles/` prefix.

The example global script `styles.ts` automatically applies the example
`global.scss` sheet to every page.

#### Importing

When importing style sheets, you must append one of these queries:

- **`?apply`**: Applies the style sheet to the current document.  
  Example usage:

  ```ts
  import "Styles/sheet.scss?apply";
  ```

- **`?string`**: Imports the style sheet as a string.  
  Example usage:

  ```ts
  // The name "sheet" is arbitrary.
  import sheet from "Styles/sheet.scss?string";

  console.log(sheet);
  ```

- **`?sheet`**: Imports the style sheet as a `CSSStyleSheet` object.  
  Example usage:

  ```ts
  // The name "sheet" is arbitrary.
  import sheet from "Styles/sheet.scss?sheet";

  for (const rule of sheet.cssRules) console.log(rule);
  ```

You should not delete `src/scss.d.ts`. It tells TypeScript the type of each
style sheet import.

Do not link styles with `<link>` tags. If you must add a style sheet to a
specific page, import it in the page's `entry.ts`.
