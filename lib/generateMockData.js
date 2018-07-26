import jsf from 'json-schema-faker'
import fs from 'fs'
import {schema} from './mockDataSchema'
import chalk from 'chalk'
/*eslint-disable no-console*/
const json = JSON.stringify(jsf(schema));

fs.writeFile("./src/api/db.json", json, function(err){
    if(err){
        return console.log(chalk.red(err));
    }else{
        console.log(chalk.green("Mock data generated."))
    }
});