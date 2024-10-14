const config = require('./config');
const pkgjson = require('./package.json');

var args = process.argv.slice(2);

if (args[0] == 'run') {
    const script = pkgjson.scripts[args[1]]?.split(' ').pop();
    if (script?.includes('/scripts/')) {
        // console.log(`run ${script}?`)
        // require'd script gets process.argv of pkg process
        require(script);
        // could maybe output the script to tempdir and exec from there?
    } else {
        console.log("Error: unknown cmd");
    }
} else {
    require('./app');
}