/*/
/// WordMatrix
/// Version: 2.0
/// Written by: Sam Mulqueen <sammulqueen.nz@gmail.com>
/*/

function WordMatrix($VALUE$, unsafe){
    function Matrix(search, save){
        if(search && typeof search == 'string' && !save){
            var path,
                seperator = new RegExp('[\.\ ]+'),
                strip_chars = new RegExp('[^A-Za-z0-9_\.\ \$]+');

            if(!unsafe){
                search = search.split(strip_chars).join('');
                path = search.split(seperator);
            }else{
                path = search.split(seperator);
            }
            
            var step, 
                cursor = Matrix;
            while(path.length){
                step = path.shift();
                if(step === '') continue;
                if(['undefined', 'function'].indexOf(typeof cursor[step])<0){
                    cursor[step] = WordMatrix(cursor[step], unsafe);
                }
                if(!cursor[step]){
                    cursor[step] = WordMatrix(undefined, unsafe);
                }
                cursor = cursor[step];
            }
            return cursor;
        }else if(save){
            $VALUE$ = search;
        }else{
            return $VALUE$;
        }
    };
    return Matrix;
}

var module;
if(typeof module == 'object'){
    module.exports = WordMatrix;
}


/*/
/// Usage Example:

/// Create a new WordMatrix with the string `Alpha` stored at the root node
var Alpha = WordMatrix('Alpha');

/// Log the value stored at the root
console.log(Alpha()); // outputs> Alpha

/// * No arguments are passed to the WordMatrix to show you want to GET the value at that node. *

/// Set the value stored at the root node to the string `Snoopy`
Alpha('Snoopy', true);

/// * The second value is true to show you are choosing to SET the value. *

/// Log to check if it's changed
console.log(Alpha()); // outputs> Snoopy

/// Navigate to the path Alpha.has.the.name by using the search string `has the name`
/// Then set the value there to the string `Alpha` at that node.
Alpha('has the name')('Alpha', true);

/// * Passing just a string to the WordMatrix function shows you are navigating to a child node *

/// The method above creates the new nodes along the path of the input string, and returns the last node in the path.
/// Then by calling it and passing true after the value, you can set the value there to something.

/// So now you can access it using a few different ways...
/// To show an example of this check out the following code: 

Alpha('says')(function(message){
  console.log(message);
}, true);

/// This stores a function at the node `Alpha.says` which logs a message
/// You can now use the following ways to log some messages

Alpha.says()('Dot notation');
Alpha['says']()('Square brackets notation');
Alpha('says')()('WordMatrix search notation');

/// Notice the () in each example, that is where you GET the value of the node at `Alphi.says`, which in this case is a function that logs a message.

Alpha('says')()('My name is ' + Alpha.has.the.name()); // outputs> My name is Alpha

/// Only characters allowed in variable names in javascript are allowed by default
/// All other characters are stripped from the search strings
Alpha('YELLS!!!')('something', true);

Alpha.YELLS(); //> 'something'

/// To use more characters pass a true value to the second argument of the constructor
/// For example:

var an_object = {'because object keys can have characters like this!#@$^&': "so pass true as second argument to allow the WordMatrix keys to have more characters"};
var $BLING$ = WordMatrix(an_object, true);

/// * Passing true as the second argument when creating a WordMatrix shows you want to allow more characters *

/// Now you can do this

$BLING$('$$$ MONEY B@BY')(3.50, true); // Pass true here to set the value 

/// You can now get it using:
console.log("Can I get: $" + $BLING$['$$$'].MONEY['B@BY']() );

/// This mode is called unsafe mode.
/// When using the default mode however, you can be sure that you will always be able to use dot notation when accessing a node in the WordMatrix, and you won't ever need to use ['key'] notation.

/*/