# netify

Watch over for internet connection and notify you of its status.
This tool is create by [netcell](https://github.com/netcell) and [thanhdeptrai](https://github.com/thanhdeptrai).

![Netify, keep it alive](http://i.imgur.com/AdhmcL7.jpg)

This simple tool is written using [Node.js](https://nodejs.org), tested on Windows 10 and Mac OSX El Capitan, but should works with most versions of Windows and Mac OSX that support notification.

The tool checks with `ping` command of the system and notifies when you lose internet connection, when you get it back and when the connection quality is low.

**Support translation:** English and Vietnamese. Translations are welcome. Please look into `language.js` file for more information and create a PR if you want to contribute a translation.

Feel free to follow me on twitter [@netcell](https://twitter.com/netcell) and check out [my blog](http://anhnt.ninja)!

## Installation

```
npm install -g netify
```

## Usage

```
netify
```

**Available options:**
- `--host|-h`: by default `netify` pings `goole.com`, you can change the destination host using this option, eg. 
```
netify -h=github.com
```
- `--threshold|-t`: by default when `ttl` is over `1000`, `netify` will notify you that the connection is weak, you can change the threshold using this option, the value is in `ms`, eg. 
```
netify -t=300
```
- `--silent|-s`: disable notification, not really useful but [thanhdeptrai](https://github.com/thanhdeptrai) insisted.
- `--lang`: by default `netify` use English translation, you can change it using this option, eg. 
```
netify --lang=vi
```
- You also can use the language code directly, eg. 
```
netify --vi
```

**Supported languages and codes**
- `en` : English 
- `vi` : Vietnamese

### License ###

This content is released under the (http://opensource.org/licenses/MIT) MIT License.

