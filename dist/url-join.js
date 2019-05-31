(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.urlJoin = factory());
}(this, function () { 'use strict';

    function index() {
        const args = [ ...arguments ];
        let protocol = '';
        const matches = args[ 0 ].match( /^[^:/]*:\/+/ );

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
        if( !args[ 0 ].length ) args.shift();

        let main = [];

        /**
         * split the path part out
         */
        while( args.length ) {
            const arg = args.shift();
            const i = arg.indexOf( '?' );
            if( i > -1 ) {
                main.push( arg.substr( 0, i ) );
                args.unshift( arg.substr( i + 1 ) );
                break;
            }
            main.push( arg );
        }

        let search = [];

        let hasSharp = false;

        /**
         * split the search part out
         */
        while( args.length ) {
            const arg = args.shift();
            const i = arg.indexOf( '#' );
            if( i > -1 ) {
                hasSharp = true;
                search.push( arg.substr( 0, i ) );
                args.unshift( arg.substr( i + 1 ) );
                break;
            }
            search.push( arg );
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

        const hash = args.join( '' );

        return `${protocol}${main}?${search}${hasSharp?'#':''}${hash}`;
    }

    return index;

}));
