# generator-webtile

A Yeoman generator for Web Tiles for the Microsoft Band.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-webtile using [npm](https://www.npmjs.com/) (as we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
> npm install -g yo
> npm install -g generator-webtile
```

## Use

Generate a Web Tile project from an existing Web Tile (created by the [Microsoft Band Web Tile Builder](https://developer.microsoftband.com/WebTile/)):

```bash
> mkdir my-web-tile
> cd my-web-tile
> yo webtile <path to .webtile>
```

Generate a new Web Tile project:

```bash
> mkdir my-web-tile
> cd my-web-tile
> yo webtile
```

The generator will generate everything needed to build a Web Tile.

```bash
> gulp --url <URL to data source>
```

## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

MIT © [Phillip Hoff]()
