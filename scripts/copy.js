const path = require('path');
const fs = require('fs');

const browserPath = '../dist/angular-universal-test/browser';
const docsPath = '../docs';
const browserDir = path.join(__dirname, browserPath);
const docsDir = path.join(__dirname, docsPath);

/**
 * return the stat for path
 * @param pathname {string} pathname
 * @return {Promise<fs.Stats | fs.ErrnoException | null>}
 */
function getStat(pathname) {
  return new Promise((resolve, reject) => {
    try {
      fs.stat(pathname, (err, stat) => {
        if (err) {
          reject(err);
        } else {
          resolve(stat);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * read directory
 * @param pathname {string} pathname of directory
 * @return {Promise<string[] | fs.ErrnoException | null>}
 */
function readDir(pathname) {
  return new Promise(((resolve, reject) => {
    fs.readdir(pathname, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  }));
}

/**
 * create directory
 * @param pathname {string} pathname of directory
 * @return {Promise<void | fs.ErrnoException | null>}
 */
function createDir(pathname) {
  return new Promise((resolve, reject) => {
    fs.mkdir(pathname, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * copy file
 * @param pathname {string} pathname of file
 * @param target {string} target file
 * @return {Promise<void | fs.ErrnoException | null>}
 */
function copyFile(pathname, target) {
  return new Promise((resolve, reject) => {
    fs.copyFile(pathname, target, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function copy(pathname, target) {
  const stat = await getStat(pathname);

  if (stat.isDirectory()) {
    await createDir(target);

    let index = 0;
    const contents = await readDir(pathname);

    while (index < contents.length) {
      await copy(path.join(pathname, contents[index]), path.join(target, contents[index]));

      index++;
    }
  } else {
    await copyFile(pathname, target);
  }
}

copy(browserDir, docsDir)
  .catch(e => console.error(e));
