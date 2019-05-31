'use strict';

function index() {
    const args = [ ...arguments ].filter( x => typeof x !== 'undefined' && x !== null );
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
    trim( args );

    let main = [];
    let search = [];
    let mark = '';
    let sharp = '';
    let endslash = '';

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

    trim( main );

    try {
        const last = main[ main.length - 1 ];
        if( last.charAt( last.length - 1 ) === '/' ) {
            endslash = '/';
        }
    } catch( e ){ endslash = ''; }


    /**
     * split the search part out
     */
    while( args.length ) {
        const arg = args.shift();
        const i = arg.indexOf( '#' );
        if( i > -1 ) {
            sharp = '#';
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
    main = main.join( '/' )
        .replace( /\/+/g, '/' )
        .replace( /\/+$/, '' );

    search = trim( search ).join( '&' )
        .replace( /\?/g, '' )
        .replace( /&+$/, '' )
        .replace( /&+/g, '&' )
        .replace( /^&+/g, '' );

    search.length && ( mark = '?' );

    const hash = args.join( '' );
    return `${protocol}${main}${endslash}${mark}${search}${sharp}${hash}`;
}

function trim( arr ) {
    arr[ 0 ] || arr.shift();
    arr[ arr.length - 1 ] || arr.pop();
    return arr;
}

module.exports = index;
