import join from '../src/';

describe( 'urlJoin', () => {
    it( 'should work for simple case', () => {
        expect( join( 'http://www.google.com/', 'foo/bar', '?test=123' ) ).toEqual( 'http://www.google.com/foo/bar?test=123' ); 
   } ); 

    it( 'should be able to join protocol-relative URL', () => {
        expect( join( '//www.google.com/', 'foo/bar', '?test=123' ) ).toEqual( '//www.google.com/foo/bar?test=123' ); 

        expect( join( '//', '/www.google.com/', 'foo/bar', '?test=123' ) ).toEqual( '//www.google.com/foo/bar?test=123' ); 

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

    it( 'should support absolute path', () => {
        expect( join( '/foo/bar', '?test=123///' ) ).toEqual( '/foo/bar?test=123///' ); 

        expect( join( '', '/test', 'foo' ) ).toEqual( '/test/foo' ); 
    } );

    it( 'should work properly with multiple slashes', () => {
        expect( join( '/', '/', '/', '/', '/test', 'foo' ) ).toEqual( '/test/foo' ); 
        expect( join( '/', '//', '/', '/', '/test', 'foo' ) ).toEqual( '/test/foo' ); 
    } );

    it( 'should support anchors in URLs', () => {
        expect( join( 'http://', 'www.google.com///', '//foo/bar', '?test=123///#x', 'y' ) ).toEqual( 'http://www.google.com/foo/bar?test=123///#xy' ); 

        expect( join( 'http://', 'www.google.com///', '//foo/bar', '?test=123///x', '#y' ) ).toEqual( 'http://www.google.com/foo/bar?test=123///x#y' ); 
    } );

    it( 'should merge a path with colon properly', () => {
        expect( join( '/users/:userId', '/cars/:carId' ) ).toEqual( '/users/:userId/cars/:carId' ); 

        expect( join( '/users/', ':userId', '/cars/:carId' ) ).toEqual( '/users/:userId/cars/:carId' ); 
    } );

    it( 'should keep a single ending slash if it exists in arguments', () => {
       expect( join( 'http://example.com/', 'api/products/?offset=200' ) ).toEqual( 'http://example.com/api/products/?offset=200' ); 
    } );

    it( 'should work properly with port number', () => {
        expect( join( 'http://me.ly.com:3002', '/', '/demo/scrollbar' ) ).toEqual( 'http://me.ly.com:3002/demo/scrollbar' ); 

        expect( join( '127.0.0.1:5500' , 'data', 'myfile1.csv' ) ).toEqual( '127.0.0.1:5500/data/myfile1.csv' );
    } );

    it( 'should ignore undefined part', () => {
       expect( join( '/a', undefined, 'b' ) ).toEqual( '/a/b' ); 
    } );

    it( 'should remove the trailing "?"', () => {
        expect( join( '/foo/', '?' ) ).toEqual( '/foo/' );
        expect( join( '/foo/', '??????' ) ).toEqual( '/foo/' );
        expect( join( '/foo/', '??????', 'x' ) ).toEqual( '/foo/?x' );
    } );

    it( 'should remove the useless "&"s', () => {
        expect( join( '/foo/', '?x=1', 'y=2&' ) ).toEqual( '/foo/?x=1&y=2' );
        expect( join( '?&', 'x=1', 'y=2' ) ).toEqual( '?x=1&y=2' );
    } );

    it( 'should normalize url with "./"', () => {
        expect( join( 'a', '.', 'b' ) ).toEqual( 'a/b' );
        expect( join( 'a/./b' ) ).toEqual( 'a/b' );
    } );

    it( 'should normalize url with "../"', () => {
        expect( join( '/a', '..', 'b' ) ).toEqual( '/b' );
        expect( join( '/a/b', '../c' ) ).toEqual( '/a/c' );
    } );

} );
