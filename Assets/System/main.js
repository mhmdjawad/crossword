import "../Libraries/ES6/jquery-3.6.js";
import '../Libraries/Bootstrap/js/bootstrap.min.js';
import '../Libraries/JQuery/jquery-ui.min-1.13-ui-darkness.js';
import Generator from '../CW/Generator.js';
window.Generator = Generator;
let g = new Generator("canvas_container",5,5);
window.g = g;
g.sentence.renderParagaph(`
CROSSWORD
GENERATOR
CREATED
BY
MHMD
JAWAD
`);
// g.sentence.renderParagaph("hello world");
g.generateMaps();
g.drawMaps();