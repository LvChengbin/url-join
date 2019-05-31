(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.urlJoin = factory());
}(this, function () { 'use strict';

    function index() {
        var i$2 = arguments.length, argsArray = Array(i$2);
        while ( i$2-- ) argsArray[i$2] = arguments[i$2];

        var args = [].concat( argsArray );
        var protocol = '';
        var matches = args[ 0 ].match( /^[^:/]*:\/+/ );

        if( matches ) {
            protocol = matches[ 0 ];
            args[ 0 ] = args[ 0 ].substr( protocol.length );
        } else if( args[ 0 ].indexOf( '//' ) === 0 ) {
            // for protocol-relative URL
            protocol = '//';
            args[ 0 ] = args[ 0 ].substr( 2 );
        }

        /**
         * to remove the first empty slice
         * it might be created if the first argument matches a protocol format like "xxxx:////"
         */
        if( !args[ 0 ].length ) { args.shift(); }

        var main = [];

        /**
         * split the path part out
         */
        while( args.length ) {
            var arg = args.shift();
            var i = arg.indexOf( '?' );
            if( i > -1 ) {
                main.push( arg.substr( 0, i ) );
                args.unshift( arg.substr( i + 1 ) );
                break;
            }
            main.push( arg );
        }

        var search = [];

        var hasSharp = false;

        /**
         * split the search part out
         */
        while( args.length ) {
            var arg$1 = args.shift();
            var i$1 = arg$1.indexOf( '#' );
            if( i$1 > -1 ) {
                hasSharp = true;
                search.push( arg$1.substr( 0, i$1 ) );
                args.unshift( arg$1.substr( i$1 + 1 ) );
                break;
            }
            search.push( arg$1 );
        }

        /**
         * replace consecutive shashes with a single one.
         * remove ending slashes
         */
        if( protocol ) {
            main[ 0 ] = main[ 0 ].replace( /^\/+/, '' );
        }
        main = main.join( '/' ).replace( /\/+/g, '/' ).replace( /\/+$/, '' );

        search = search.join( '&' ).replace( /\?/g, '' ).replace( /&+/g, '&' );

        var hash = args.join( '' );

        return ("" + protocol + main + "?" + search + (hasSharp?'#':'') + hash);
    }

    return index;

}));
