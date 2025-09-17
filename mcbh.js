const patterns = {
	"base": "stripe_bottom",
	"chief": "stripe_top",
	"pale dexter": "stripe_left",
	"pale sinister": "stripe_right",
	"fess": "stripe_middle",
	"pale": "stripe_center",
	"bend": "stripe_downright",
	"bend sinister": "stripe_downleft",
	"saltire": "cross",
	"paly": "small_stripes",
	"cross": "straight_cross",
	"per bend": "diagonal_right",
	"per bend sinister": "diagonal_left",
	"per bend inverted": "diagonal_up_right",
	"per bend sinister inverted": "diagonal_up_left",
	"per pale": "half_vertical",
	"per pale inverted": "half_vertical_right",
	"per fess": "half_horizontal",
	"per fess inverted": "half_horizontal_bottom",
	"base dexter canton": "square_bottom_left",
	"base sinister canton": "square_bottom_right",
	"chief dexter canton": "square_top_left",
	"chief sinister canton": "square_top_right",
	"chevron": "triangle_bottom",
	"inverted chevron": "triangle_top",
	"base indented": "triangles_bottom",
	"chief indented": "triangles_top",
	"roundel": "circle",
	"lozenge": "rhombus",
	"bordure": "border",
	"bordure indented": "curly_border",
	"field masoned": "bricks",
	"creeper charge": "creeper",
	"skull charge": "skull",
	"flower charge": "flower",
	"thing": "mojang",
	"globe": "globe",
	"snout": "piglin",
	"flow": "flow",
	"guster": "guster",
	"gradient": "gradient",
	"base gradient": "gradient_up"
}
const colors = [
	"white",
	"light gray",
	"gray",
	"black",
	"brown",
	"red",
	"orange",
	"yellow",
	"lime",
	"green",
	"cyan",
	"light blue",
	"blue",
	"purple",
	"magenta",
	"pink"
]
function lookupSubmit() {
	let patLookup = document.getElementById('lookup').value;
	let output = document.getElementById('lookupResult');
	if (patLookup in patterns) {
		output.innerHTML = "Asset ID: " + patterns[patLookup];
	}
	else {
		output.innerHTML = "Invalid pattern.";
	}
}
var genCommand = "/give @p ";
let patternList = document.getElementById('patternList');
function setBase() {
	let baseCol = document.getElementById('baseColor').value;
	let errs = document.getElementById('errHandleBase');
	console.log(baseCol);
	console.log(colors);
	console.log(colors.includes(baseCol));
	if (colors.includes(baseCol)) {
		genCommand += baseCol.replace(" ","_") + "_banner[banner_patterns=[";
		patternList.innerHTML += "Base color: " + baseCol + "<br/>";
	}
	else {
		errs.innerHTML = "Invalid color.";
	}
	document.getElementById('baseColor').value = "";
}
function addPattern() {
	let pattern = document.getElementById('patName').value;
	let color = document.getElementById('patColor').value;
	let errs = document.getElementById('errHandlePattern');
	if (pattern in patterns && colors.includes(color)) {
		document.getElementById('errHandlePattern').value = "";
		newPat = '{pattern:"' + patterns[pattern] + '",color:"' + color.replace(" ","_") + '"},';
		genCommand += newPat;
		patternList.innerHTML += pattern + ': ' + color + "<br/>";
		errs.innerHTML = "";
	} else {
		errs.innerHTML = "Invalid pattern/color.";
	}
	document.getElementById('patName').value = "";
	document.getElementById('patColor').value = "";
}
function finishCommand() {
	console.log(patternList);
	genCommand += "]]";
	let final = document.getElementById('generatedCommand');
	final.innerHTML = "Here is your command:<br/><code>" + genCommand + "</code>";
	if (genCommand.length > 256) {
		final.innerHTML += "<br/>&#x25c6 This command's too long to run in chat. Use a command block to execute.";
	}
}
function genTable() {
	var table = document.getElementById('patternTable');
	for ([pattern,assetId] of Object.entries(patterns)) {
		table.innerHTML += "<tr><td>" + pattern + "</td><td>" + assetId + "</td></tr>";
	}
}
// Comment out this function after testing
/* function test() {
	let test = document.getElementById('generatedCommand');
	test.innerHTML = "Test:<br/><code>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789</code>";
} */