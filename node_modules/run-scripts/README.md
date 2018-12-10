#  [![Build Status](https://secure.travis-ci.org/fahad19/run-scripts.png?branch=master)](http://travis-ci.org/fahad19/run-scripts)

> Run multiple npm scripts sequentially in one go.


## Install

```sh
$ npm install -g run-scripts
```

## Usage

In your `package.json` file, you may already have pre-defined scripts:

```json
{
  "scripts": {
    "command1": "echo 1",
    "command2": "echo 2",
    "command3": "echo 3"
  }
}
```

Now instead of:

```sh
$ npm run command1 && npm run command2 && npm run command3
```

You can just run:

```sh
$ run-scripts command1 command2 command3
```

If you wish not to install the module globally, you can do this:

```sh
$ npm install --save-dev run-scripts
$ ./node_modules/.bin/run-scripts command1 command2 command3
```

## License

MIT © [Fahad Ibnay Heylaal](http://fahad19.com)
