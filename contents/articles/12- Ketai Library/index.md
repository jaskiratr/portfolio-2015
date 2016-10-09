---
title: Ketai Library
tags: tag, another tag
excerpt: Collaborative Workflow and Documentation for Ketai Library
date: 01/01/2012
template: article.jade
---
![thumb1](main.png)

Ketai Library : Create moblie apps with Processing.
[http://ketai.org](http://ketai.org)

* * *

Workflow built with Nodejs. Now live on [Github](https://github.com/ketai/ketai.org)

- Github based workflow keeps the library reference updated. It converts Javadocs in [Ketai Source](https://github.com/ketai/ketai) to markdown files.
- The [website content](https://github.com/ketai/ketai.org) is also managed as markdown files.
- Upon any changes in Javadocs or website files, the server automatically renders fresh static HTML pages.
- The HTML content is automatically synced with another [Github Repo](https://github.com/ketai/ketai.github.io) hosted on [ketai.org](http://ketai.org)

* * *

Libraries used:
- [Node.js](https://nodejs.org/en/)
- [Chokidar](https://github.com/paulmillr/chokidar)
- [Javadocs to Markdown](https://github.com/delight-im/Javadoc-to-Markdown)
- [Woods](https://github.com/studiomoniker/woods)

Contributed to the [Rapid Android Development book](https://pragprog.com/book/dsproc/rapid-android-development), Authored by Daniel Sauter
