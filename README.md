# url-join

Join all arguments together and mormalize the resulting URL.

## Installation

```sh
$ npm install --save @lvchengbin/url-join
```
## Usage

```js
const urlJoin = require( '@lvchengbin/url-join' );
const url = urlJoin( 'http://www.google.com', 'a', '/b/cd', '?foo=123', 'foo2=456', '#hash' );

console.log( url ); // Prints http://www.google.com/a/b/cd?foo=123&foo2=456#hash
```

### Special Features

 - Protocol-relative URL

     If the first argument starts with double slashes (//), the URL will be mormalized as a protocol-relative URL.

     ```js
     urlJoin( '//www.google.com', '/a/b' ); // //www.google.com/a/b
     ```

 - Removing trailing "&" automatically

     If there are useless "&" marks in arguments, they will be removed automatically

     ```js
     urlJoin( '/foo?x=1', '&y=2&', ); // /foo?x=1&y=2
     ```

 - Removing trailing "?" automatically

     If there isn't any search queries, the trailing "?" will be removed automatically, even thought it is passed explicitly.

     ```js
     urlJoin( '/foo/?' ); // /foo/
     ```

 - Inserting "&" automatically

     An "&" will be used to connect each part after a "?" appears in one arguments, until a "#" sign appears.

     ```js
     urlJoin( '?', 'x=1', 'y=2&z=3', 'a=4' ); // ?x=1&y=2&z=3&z=4
     ```
