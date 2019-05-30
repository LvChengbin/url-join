(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    module.exports = function() {
        var args = arguments;
        var protocolPart = '';
        var matches = args[ 0 ].match( /^[^:/]*:\/+/ );
        if( matches ) {
            protocolPart = matches[ 0 ];
            args[ 0 ] = args[ 0 ].substr( protocolPart.length );
        }

        var pathPart = [];
        var searchPart = [];

        while( args.length ) {
            var arg = args.shift();
            var i = arg.indexOf( '?' );
            if( i > -1 ) {
                pathPart.push( arg.substr( 0, i ) );
                arg.unshift( arg.substr( i + 1 ) );
                break;
            }
            pathPart.push( arg );
        }

        return ("" + protocolPart + (pathPart.join( '/' ).replace( /\/+/g, '/' )) + "?" + (searchPart.join( '&' ).replace( /\?/g, '' ).replace( /&/g, '&' )));
    };

}));
