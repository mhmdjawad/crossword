export default class Sentence {
    constructor(sentence) {
        this.sentence = sentence;
    }
    renderParagaph(paragraph) {
        paragraph=paragraph.trim();
        let sentences = paragraph.split("\n");
        for (let i in sentences) {
            sentences[i] = sentences[i].trim();
        }
        this.sentence = sentences.join(" ");
    }
    getWords() {
        // if(this.words)  return this.words;
        return this.words = this.sentence.split(" ");
    }
    getShuffledWords(){
        let unshuffled = this.getWords();
        let shuffled = unshuffled
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
        return shuffled;
    }
    getLetters() {
        if(this.letters) return this.letters;
        let letters = [];
        this.getWords().forEach(x => letters.push(...x.split('')));
        this.letters = letters;
        return this.letters;
    }
    getUniqueLetters(){
        if(this.uniqueLetters) return this.uniqueLetters;
    }
    getWordsOrdered(asc){
        if(asc){
            return this.getWords().sort( (x,y) => x.length > y.length && 1 || -1);
        }
        else{
            return this.getWords().sort( (x,y) => x.length < y.length && 1 || -1);
        }
    }
}
