export default class {
  private static _instance = new this();
  public utterer = new SpeechSynthesisUtterance();
  public synth = speechSynthesis;

  private constructor() {}

  public static get instance() {
    return this._instance;
  }

  public speak() {
    this.synth.speak(this.utterer);
  }
}
