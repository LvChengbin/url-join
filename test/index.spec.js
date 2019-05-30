import join from '../src/';

describe( 'urlJoin', () => {
   it( 'should work for simple case', () => {
        expect( join( 'http://www.google.com/', 'foo/bar', '?test=123' ) ).toEqual( 'http://www.google.com/foo/bar?test=123' ); 
   } ); 

    it( 'should be able to join protocol-relative URL', () => {
        expect( join( '//www.google.com/', 'foo/bar', '?test=123' ) ).toEqual( '//www.google.com/foo/bar?test=123' ); 

    } );

    it( 'should be able to join protocol', () => {
        
        expect( join( 'http://', 'www.google.com/', 'foo/bar', '?test=123' ) ).toEqual( 'http://www.google.com/foo/bar?test=123' ); 
    } );

    it( 'should remove the starting slashes while joining with protocol', () => {
        
        expect( join( 'http://', '/www.google.com/', 'foo/bar', '?test=123' ) ).toEqual( 'http://www.google.com/foo/bar?test=123' ); 
    } );

    it( 'should remove extra slashes', () => {
        expect( join( 'http://', 'www.google.com///', '//foo/bar', '?test=123' ) ).toEqual( 'http://www.google.com/foo/bar?test=123' ); 
    } );

    it( 'should be able to join search strings', () => {
        expect( join( 'http://www.google.com/', '/foo/bar', '?test=123', 'test1=234' ) ).toEqual( 'http://www.google.com/foo/bar?test=123&test1=234' ); 
        
    } );

    it( 'should not remove slashes in search string', () => {

        expect( join( 'http://', 'www.google.com///', '//foo/bar', '?test=123///' ) ).toEqual( 'http://www.google.com/foo/bar?test=123///' ); 
    } );
} );
