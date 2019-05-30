import resolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

export default [ {
    input : 'src/index.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } )
    ],
    output : [
        { file : 'dist/url-join.cjs.js', format : 'cjs' },
        { file : 'dist/url-join.js', format : 'umd', name : 'urlJoin' }
    ]
}, {
    input : 'src/index.js',
    plugins : [
        resolve( {
            module : true,
            jsnext : true
        } ),
        buble( {
            transforms : {
                dangerousForOf : true
            }
        } )
    ],
    output : [
        { file : 'dist/url-join.bc.js', format : 'umd', name : 'urlJoin' }
    ]
} ];
